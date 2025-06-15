import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, CheckCircle, Zap } from 'lucide-react'; // Added Zap for new element
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import UpcomingFeatures from './UpcomingFeatures.jsx';
import FeaturesSection from '../components/Features.jsx';
import Footer from '@/components/footer.jsx';
import Navbar from '@/components/navbar.jsx';
import Scan from './scan.jsx';
import { useNavigate } from 'react-router';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } // Removed 'as const'
};

const listVariants = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            }
        }
    },
    item: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        },
        hover: {
            scale: 1.03,
            y: -3,
            transition: { duration: 0.2, type: "spring", stiffness: 300, damping: 15 } // Removed 'as const'
        }
    }
};

const analysisItems = [
    { id: 1, text: "Security Misconfigurations", icon: CheckCircle },
    { id: 2, text: "Potential Data Leaks", icon: CheckCircle },
    { id: 3, text: "Outdated Software Detection", icon: CheckCircle },
    { id: 4, text: "AI-Powered Threat Assessment", icon: CheckCircle },
];

const Home = () => {
    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const handleAnalyze = () => {
        if (!url.trim()) {
            toast({
                title: "URL Required",
                description: "Please enter a website URL to analyze.",
                variant: "destructive",
            });
            return;
        }
        // Basic URL validation (can be improved)
        try {
            new URL(url); // Check if it's a valid URL structure
            console.log(`Analyzing URL: ${url}`);
            toast({
                title: "Analysis Started",
                description: `Scanning ${url} for security vulnerabilities...`,
            });
            // Here you would typically trigger the backend analysis
        } catch (error) {
            toast({
                title: "Invalid URL",
                description: "Please enter a valid website URL (e.g., https://example.com).",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <Navbar />
            <section className="min-h-screen flex flex-col items-center justify-center bg-background pt-20 relative overflow-hidden">

                <div className="absolute inset-0 opacity-5">
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full filter blur-3xl animate-pulse-glow animate-float-slow"
                        animate={{ y: ["0px", "-15px", "0px", "8px", "0px"], rotate: [0, 8, 0, -5, 0], scale: [1, 1.05, 1, 1.03, 1] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent rounded-full filter blur-3xl animate-pulse-glow animation-delay-2000 animate-float-medium"
                        animate={{ y: ["0px", "12px", "0px", "-8px", "0px"], rotate: [0, -7, 0, 4, 0], x: ["0px", "5px", "-5px", "0px"] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                    {/* New decorative element */}
                    <motion.div
                        className="absolute top-1/3 right-[15%] w-24 h-24 text-secondary opacity-50"
                        animate={{
                            y: ["-20px", "20px"],
                            rotate: [0, 180, 360],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "linear"
                        }}
                    >
                        <Zap className="w-full h-full" strokeWidth={1} />
                    </motion.div>
                    <motion.div
                        className="absolute bottom-[15%] left-[10%] w-32 h-32 bg-primary/50 rounded-xl filter blur-2xl"
                        animate={{
                            y: ["10px", "-10px", "10px"],
                            x: ["-5px", "5px", "-5px"],
                            rotate: [0, 20, -10, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                </div>

                <motion.div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.h1
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        className="text-5xl mt-10 sm:text-6xl lg:text-7xl font-bold text-foreground mb-6"
                    >
                        Uncover Web Vulnerabilities <br className="hidden sm:block" />
                        with{' '}
                        <motion.span
                            className="text-primary"
                            animate={{
                                textShadow: [
                                    "0 0 2px hsl(var(--primary-foreground))",
                                    "0 0 8px hsl(var(--primary))",
                                    "0 0 12px hsl(var(--primary))",
                                    "0 0 8px hsl(var(--primary))",
                                    "0 0 2px hsl(var(--primary-foreground))",
                                ],
                                opacity: [0.8, 1, 0.8],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut",
                            }}
                        >
                            AI-Powered
                        </motion.span>
                        {' '}Insight
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }} // Removed 'as const'
                        className="text-xl mt-2 sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
                    >
                        Paste your website URL to get an instant, comprehensive security analysis.
                        We check for common pitfalls, data leaks, and more, powered by Gemini AI.
                    </motion.p>
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.4, ease: [0.22, 1, 0.36, 1] }} // Removed 'as const'
                        className="flex flex-col sm:flex-row items-center justify-center max-w-xl mx-auto space-y-4 sm:space-y-0 sm:space-x-4"
                    >

                    </motion.div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/input')}
                        className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                        Get Started
                    </motion.button>
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.8 }}
                        className="mt-12 text-center"
                    >
                        <motion.h3
                            className="text-xl font-semibold text-foreground mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                        >
                            Instant Analysis Covers:
                        </motion.h3>
                        <motion.ul
                            className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 space-y-3 sm:space-y-0 text-muted-foreground max-w-3xl mx-auto"
                            variants={listVariants.container}
                            initial="hidden"
                            animate="visible"
                        >
                            {analysisItems.map((item) => (
                                <motion.li
                                    key={item.id}
                                    variants={listVariants.item}
                                    whileHover="hover"
                                    className="flex items-center text-sm sm:text-base p-2"
                                >
                                    <item.icon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                                    {item.text}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </motion.div>
                <FeaturesSection />
            </section>
            <UpcomingFeatures />
            <Footer />
        </>
    );
};

export default Home