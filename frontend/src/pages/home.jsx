import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "sonner"
import UpcomingFeatures from './UpcomingFeatures.jsx';
import Navbar from '@/components/navbar.jsx';
import Footer from '@/components/footer.jsx';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const listVariants = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Delay between each child animation
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
            transition: { duration: 0.2, type: "spring", stiffness: 300, damping: 15 }
        }
    }
};

const analysisItems = [
    { id: 1, text: "Security Misconfigurations", icon: CheckCircle },
    { id: 2, text: "Potential Data Leaks", icon: CheckCircle },
    { id: 3, text: "Outdated Software Detection", icon: CheckCircle },
    { id: 4, text: "AI-Powered Threat Assessment", icon: CheckCircle },
];

const HomePage = () => {
    const [url, setUrl] = useState('');


    const handleAnalyze = () => {
        if (!url.trim()) {
            toast({
                title: "URL Required",
                description: "Please enter a website URL to analyze.",
                status: "warning",
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
                status: "error",
            });
        }
    };

    return (
        <>
            <Navbar />
            <section className="min-h-screen flex flex-col items-center justify-center bg-background pt-20 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-5">
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full filter blur-3xl animate-pulse-glow animate-float-slow"
                        animate={{ y: ["0px", "-10px", "0px", "5px", "0px"], rotate: [0, 5, 0, -3, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent rounded-full filter blur-3xl animate-pulse-glow animation-delay-2000 animate-float-medium"
                        animate={{ y: ["0px", "10px", "0px", "-5px", "0px"], rotate: [0, -5, 0, 3, 0] }}
                        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.h1
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6"
                    >
                        Uncover Web Vulnerabilities <br className="hidden sm:block" />
                        with <span className="text-primary">AI-Powered</span> Insight
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
                    >
                        Paste your website URL to get an instant, comprehensive security analysis.
                        We check for common pitfalls, data leaks, and more, powered by Gemini AI.
                    </motion.p>
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row items-center justify-center max-w-xl mx-auto space-y-4 sm:space-y-0 sm:space-x-4"
                    >
                        <motion.div
                            className="relative flex-grow w-full sm:w-auto"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="url"
                                placeholder="Enter your website URL (e.g., https://example.com)"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="pl-10 pr-4 py-3 h-14 text-lg w-full bg-card border-border focus:ring-primary focus:border-primary"
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                onClick={handleAnalyze}
                                size="lg"
                                className="h-14 text-lg w-full sm:w-auto bg-primary hover:bg-accent transition-all duration-300 group"
                            >
                                Analyze Security
                                <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    </motion.div>
                    <motion.p
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="text-xs text-muted-foreground max-w-2xl mx-auto mt-4 animate-float-slow"
                    >
                        Example: https://lovable.dev
                    </motion.p>

                    <motion.div
                        variants={fadeInUp} // This variant animates the whole block
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.8 }} // Delay for this entire block to appear
                        className="mt-12 text-center"
                    >
                        <h3 className="text-xl font-semibold text-foreground mb-4">Instant Analysis Covers:</h3>
                        <motion.ul
                            className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 space-y-3 sm:space-y-0 text-muted-foreground max-w-3xl mx-auto"
                            variants={listVariants.container} // Variants for the UL to manage staggering
                            initial="hidden" // Initial state for the UL
                            animate="visible" // Animate to visible, which will trigger staggerChildren
                        >
                            {analysisItems.map((item) => (
                                <motion.li
                                    key={item.id}
                                    variants={listVariants.item} // Variants for each LI
                                    // `initial` and `animate` states are inherited from parent `motion.ul` unless overridden
                                    whileHover="hover" // Apply hover animation
                                    className="flex items-center text-sm sm:text-base p-2" // Added small padding for hover interaction space
                                >
                                    <item.icon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                                    {item.text}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>

                {/* Add the UpcomingFeatures component here, outside the main container of HeroSection for full width effect if desired */}
                <UpcomingFeatures />
            </section>
            <Footer/>
        </>
    );
};

export default HomePage;