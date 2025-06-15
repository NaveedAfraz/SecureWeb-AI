
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import HttpOutlinedIcon from '@mui/icons-material/HttpOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Navbar from '@/components/navbar';
import { useLocation } from 'react-router-dom';
import Footer from '@/components/footer';
import axios from 'axios';

// Animated background component
const AnimatedGradientBackground = () => (
    <div className="absolute inset-0 -z-20 overflow-hidden bg-gray-900">
        <motion.div
            className="absolute h-[50rem] w-[50rem] bg-gradient-to-r from-indigo-500/40 via-purple-500/30 to-pink-500/40"
            style={{ borderRadius: '50%' }}
            animate={{
                x: ['-20%', '20%', '-20%'],
                y: ['-20%', '20%', '-20%'],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration: 30,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
            }}
        />
    </div>
);

// Feature card component
const FeatureCard = ({ icon, title, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
        className="p-4 bg-white/5 rounded-lg border border-white/10 flex items-center gap-3"
    >
        {icon}
        <span className="text-gray-300">{title}</span>
    </motion.div>
);


const Scan = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [scanMessage, setScanMessage] = useState("");

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


    const handleScan = async (e) => {
        e.preventDefault();
        if (!url) return;
        setIsLoading(true);
        setResults([]);
        setScanMessage('');

        try {
            const token = localStorage.getItem("jwtToken");

            const response = await axios.post(`${API_URL}/api/zap/report`,
                { url },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );

            const { message, data } = response.data;
            setResults(data); // array of vulnerabilities
            setScanMessage(message || "Scan complete.");
        } catch (err) {
            console.error("❌ Scan error:", err.response?.data || err.message);
            alert("Error during scan: " + (err.response?.data?.error || err.message));
        } finally {
            setIsLoading(false);
            setUrl('');
        }
    };


    const title = "Guard Your Digital Fortress";

    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const letterVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <Navbar />
            <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans text-white mt-17">
                <AnimatedGradientBackground />
                <AnimatePresence>
                    {isLoading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <CircularProgress color="inherit" />
                            <p className="text-lg text-gray-300">Initiating Scan on <span className="font-semibold text-white">{url}</span>...</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="w-full flex flex-col items-center text-center px-4"
                        >
                            {/* --- Headline --- */}
                            <div className="w-full max-w-2xl">
                                <motion.h1
                                    variants={titleVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
                                >
                                    {title.split("").map((char, index) => (
                                        <motion.span key={index} variants={letterVariant}>
                                            {char}
                                        </motion.span>
                                    ))}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2, duration: 0.5 }}
                                    className="text-lg text-gray-300 mb-8 max-w-xl mx-auto"
                                >
                                    Uncover vulnerabilities in SSL, HTTP headers, and script security before attackers do.
                                </motion.p>
                            </div>

                            {/* --- Input Form --- */}
                            <motion.form
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5, duration: 0.5 }}
                                onSubmit={handleScan}
                                className="w-full max-w-2xl flex"
                            >
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://your-website.com"
                                    className="flex-grow p-4 bg-white/10 text-white rounded-l-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="p-4 bg-indigo-600 rounded-r-md flex items-center justify-center"
                                >
                                    <ArrowForwardIcon />
                                </motion.button>
                            </motion.form>

                            {/* --- Feature Highlights --- */}
                            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                                <FeatureCard icon={<ShieldOutlinedIcon className="text-indigo-400" />} title="SSL Analysis" delay={1.8} />
                                <FeatureCard icon={<HttpOutlinedIcon className="text-indigo-400" />} title="Header Checks" delay={1.9} />
                                <FeatureCard icon={<VpnKeyOutlinedIcon className="text-indigo-400" />} title="Script Auditing" delay={2.0} />
                            </div>

                            {/* --- Scan Results Display --- */}
                            {results.length > 0 && (
                                <div className="w-full max-w-2xl z-1000 mx-auto mt-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                                        {results.map((item, index) => (
                                            <div
                                                key={index}
                                                className="bg-white/5 p-6 rounded-lg border border-white/20 w-[300px] h-[400px] flex flex-col text-left overflow-hidden"
                                            >
                                                <div className="flex-shrink-0">
                                                    <p className="text-indigo-300 font-semibold text-lg truncate" title={item.alert}>⚠️ {item.alert}</p>
                                                    <p className="text-gray-200 text-sm mt-1">Risk: {item.risk}</p>
                                                </div>
                                                <div className="mt-4">
                                                    <p className="text-gray-300 text-sm">
                                                        <strong>Explanation:</strong>
                                                        <span className="block mt-1">{item.explanation}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Footer />
        </>
    );
};

export default Scan;