import React, { useState, useEffect } from 'react'; // MODIFICATION: Added useEffect
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
    // MODIFICATION: Reduced z-index to -20 and lowered opacity of gradients (e.g., /40 -> /20)
    <div className="absolute inset-0 -z-20 overflow-hidden bg-gray-900">
        <motion.div
            className="absolute h-[50rem] w-[50rem] bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-pink-500/20"
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
    // MODIFICATION: New state for dynamic loading messages
    const [loadingMessage, setLoadingMessage] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // MODIFICATION: Dummy loading steps
    const loadingSteps = [
        "Warming up the scanners...",
        "Checking SSL/TLS configuration...",
        "Analyzing HTTP security headers...",
        "Auditing for insecure scripts...",
        "Compiling vulnerability report...",
        "Almost there, finalizing results..."
    ];

    // MODIFICATION: Effect to cycle through dummy loading messages every 2 seconds
    useEffect(() => {
        let interval;
        if (isLoading) {
            let stepIndex = 0;
            // Set the first message immediately
            setLoadingMessage(loadingSteps[stepIndex]);

            interval = setInterval(() => {
                stepIndex = (stepIndex + 1) % loadingSteps.length;
                setLoadingMessage(loadingSteps[stepIndex]);
            }, 2000); // Update every 2 seconds
        }
        // Cleanup function to clear the interval when loading is finished
        return () => clearInterval(interval);
    }, [isLoading]);


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
            setResults(data || []); // Ensure data is an array
            setScanMessage(message || "Scan complete.");
        } catch (err) {
            console.error("❌ Scan error:", err.response?.data || err.message);
            setScanMessage("Error during scan: " + (err.response?.data?.error || err.message));
        } finally {
            setIsLoading(false);
            // setUrl(''); // You might want to keep the URL in the input
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
            <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden font-sans text-white">
                <AnimatedGradientBackground />
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex flex-col items-center gap-4 text-center"
                        >
                            <CircularProgress color="inherit" />
                            <p className="text-lg text-gray-300">Initiating Scan on <span className="font-semibold text-white">{url}</span></p>
                            {/* MODIFICATION: Display the dynamic loading message */}
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={loadingMessage}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-md text-gray-400"
                                >
                                    {loadingMessage}
                                </motion.p>
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="w-full max-w-4xl flex flex-col items-center" // Increased max-width for results
                        >
                            {/* --- Headline --- */}
                            <motion.h1
                                variants={titleVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-center"
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
                                className="text-lg text-gray-300 mb-8 max-w-xl text-center"
                            >
                                Uncover vulnerabilities in SSL, HTTP headers, and script security before attackers do.
                            </motion.p>

                            {/* --- Input Form --- */}
                            <motion.form
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5, duration: 0.5 }}
                                onSubmit={handleScan}
                                className="w-full max-w-2xl flex" // Central form
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
                            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl">
                                <FeatureCard icon={<ShieldOutlinedIcon className="text-indigo-400" />} title="SSL Analysis" delay={1.8} />
                                <FeatureCard icon={<HttpOutlinedIcon className="text-indigo-400" />} title="Header Checks" delay={1.9} />
                                <FeatureCard icon={<VpnKeyOutlinedIcon className="text-indigo-400" />} title="Script Auditing" delay={2.0} />
                            </div>

                            {/* MODIFICATION: Scan results in a horizontal, scrollable card layout */}
                            {scanMessage && (
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center text-gray-300">
                                    {scanMessage}
                                </motion.p>
                            )}
                            {results && results.length > 0 && (
                                <div className="w-full max-w-4xl mt-8">
                                    <h2 className="text-2xl font-bold mb-4 text-left">Vulnerabilities Found</h2>
                                    <div className="flex gap-4 overflow-x-auto pb-4">
                                        {results.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                className="bg-white/5 p-4 rounded-lg border border-white/20 flex-shrink-0 w-[320px]" // Card styling
                                            >
                                                <p className="text-indigo-300 font-semibold flex items-center gap-2">
                                                    ⚠️ {item.alert}
                                                </p>
                                                <p className="text-gray-200 text-sm mt-2 font-mono bg-black/20 px-2 py-1 rounded">
                                                    Risk: <span className="font-bold">{item.risk}</span>
                                                </p>
                                                <p className="text-gray-300 text-sm mt-3">
                                                    <strong>Explanation:</strong> {item.explanation}
                                                </p>
                                            </motion.div>
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