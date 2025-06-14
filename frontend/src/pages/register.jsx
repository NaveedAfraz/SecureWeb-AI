// frontend/src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '@/components/navbar';

const API_URL = import.meta.env.VITE_API_URL;

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await axios.post(`${API_URL}/api/register`, {
                method: 'POST',

                body: JSON.stringify({ username, password }),
            }, {
                withCredentials: true
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || 'Registration successful! Redirecting to login...');

                const loginResponse = await fetch(`${API_URL}/api/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                const loginData = await loginResponse.json();

                if (loginResponse.ok) {
                    onLoginSuccess(loginData.token, loginData.username);
                } else {
                    setError(loginData.message || 'Login failed after registration. Please log in manually.');
                    navigate('/login');
                }

            } else {
                setError(data.message || 'Registration failed.');
            }
        } catch (err) {
            console.error('Sign-up error:', err);
            setError('Network error or server unavailable.');
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh)] bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
                <motion.div
                    className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Sign Up</h2>
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
                                placeholder="Choose a username"
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
                                placeholder="Choose a strong password"
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-red-600 text-sm text-center font-medium mt-2">
                                {error}
                            </p>
                        )}
                        {message && (
                            <p className="text-green-600 text-sm text-center font-medium mt-2">
                                {message}
                            </p>
                        )}
                        <motion.button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Sign Up
                        </motion.button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="font-semibold text-indigo-600 hover:underline">
                            Login here
                        </a>
                    </p>
                </motion.div>
            </div>
        </>
    );
};

export default RegisterPage;