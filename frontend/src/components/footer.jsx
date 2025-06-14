import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="bg-background border-t border-border py-12"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 
                        flex flex-col sm:flex-row justify-between items-center text-center sm:text-left 
                        space-y-6 sm:space-y-0"> {/* Added space-y for vertical spacing on small screens */}

                {/* Logo and Brand Name */}
                <div className="flex flex-col items-center sm:items-start">
                    <Shield size={36} className="text-primary mb-2" />
                    <p className="text-xl font-semibold text-foreground">SecureWeb AI</p>
                </div>

                {/* Navigation Links */}
                {/* Using flex-wrap and gap to handle responsiveness of links */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
                    <a href="#features" className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">Features</a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">Privacy Policy</a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">Terms of Service</a>
                </div>

                {/* Copyright and Tagline */}
                <div className="flex flex-col items-center sm:items-end">
                    <p className="text-sm text-muted-foreground whitespace-nowrap">
                        &copy; {new Date().getFullYear()} SecureWeb AI. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 whitespace-nowrap">
                        Built with love & AI by Lovable.
                    </p>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;