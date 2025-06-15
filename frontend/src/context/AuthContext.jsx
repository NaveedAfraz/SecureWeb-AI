import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in

  useEffect(() => {
    // Check auth status when app loads
    axios.get('http://localhost:5000/api/auth/check', {
      withCredentials: true,
    }).then(res => {
      setUser(res.data.user); // user is authenticated
    }).catch(() => {
      setUser(null); // user is not authenticated
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
