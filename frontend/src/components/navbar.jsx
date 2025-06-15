import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [userId, setUserId] = useState(() => {
        return localStorage.getItem("token") || null;
    });
    console.log(userId);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserId(null);
        navigate('/login');
    };

    useEffect(() => {
        const id = localStorage.getItem("userId");
        if (id) setUserId(id);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-sm"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <a href="/" className="flex items-center space-x-2 text-primary hover:text-accent transition-colors">
                            <Shield size={32} />
                            <span className="text-2xl font-bold text-foreground">SecureWeb AI</span>
                        </a>

                        {location.pathname === "/input" ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/home')}
                                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                Home
                            </motion.button>
                        ) : (
                            <div className="flex items-center space-x-6">
                                <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
                                    Features
                                </a>

                                {userId ? (
                                    <>
                                                                              <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleLogout}
                                            className="bg-red-500 px-4 py-2 text-white rounded-md font-semibold hover:bg-red-600"
                                        >
                                            Logout
                                        </motion.button>
                                    </>
                                ) : (
                                    <>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate('/login')}
                                            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                                        >
                                            Login
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate('/register')}
                                            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                                        >
                                            Signup
                                        </motion.button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </motion.nav>
        </>
    );
};

export default Navbar;
