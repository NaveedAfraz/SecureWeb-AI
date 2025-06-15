import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './context/AuthContext';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  </BrowserRouter>
)
