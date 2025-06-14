import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router'
import HomePage from './pages/home'
import { useState } from 'react'
import { useEffect } from 'react'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import ProtectedRoute from './components/ProtectedRoute'
import Input from './pages/input'

function App() {
  const VITE_CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_aGFwcHktY2xhbS03Ni5jbGVyay5hY2NvdW50cy5kZXYk"

  if (!VITE_CLERK_PUBLISHABLE_KEY) {
    throw new Error('VITE_CLERK_PUBLISHABLE_KEY is not defined')
  }

  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const [user, setUser] = useState(null);

  const decodeJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      const decodedUser = decodeJwt(storedToken);
      if (decodedUser && decodedUser.exp * 1000 > Date.now()) {
        setToken(storedToken);
        setUser(decodedUser);
      } else {
        localStorage.removeItem('jwtToken');
        setToken(null);
        setUser(null);
      }
    }
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/home")
    }
  }, [location.pathname])

  return (
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/input" element={<Input />} />
        {/* Protected routes */}
        <Route
          path="/home"
          element={
            // <ProtectedRoute>
            <HomePage />

          }
        />

        {/* Default redirect */}


        {/* Fallback for unknown routes */}
      </Routes>

  )
}
export default App
