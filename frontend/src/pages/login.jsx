// frontend/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import axios from 'axios';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3006";
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);

        try {
            const response = await axios.post(`${API_URL}/api/login`, {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            }, {
                withCredentials: true,
            });

            if (response.status === 200) {
                // localStorage.setItem('jwtToken', data.token);
                //setToken(data.token);
                //setUser(decodeJwt(data.token)); // Set user from decoded token
                navigate('/home'); // Redirect on success
                return { success: true };
            }
            else {
                return { success: false, message: response.data.message || 'Login failed.' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error or server unavailable.' };
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setToken(null);
        setUser(null);
        navigate('/login'); // Redirect to login page
    };



    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <>

            <Navbar />
            <div className="flex items-center justify-center h-[100vh] overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
                <motion.div
                    className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-red-600 text-sm text-center font-medium mt-2">
                                {error}
                            </p>
                        )}
                        <motion.button // Apply motion to the button as well
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            whileHover={{ scale: 1.02 }} // Slightly scale up on hover
                            whileTap={{ scale: 0.98 }} // Slightly scale down on tap
                        >
                            Sign In
                        </motion.button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-200"> {/* Changed text color for better contrast */}
                        Test User: <span className="font-semibold text-white">testuser</span> | Password: <span className="font-semibold text-white">password123</span>
                    </p>
                </motion.div>
            </div>
        </>
    );
};

export default LoginPage;