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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center mb-6">
          <Shield size={36} className="text-primary mb-2" />
          <p className="text-xl font-semibold text-foreground">SecureWeb AI</p>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SecureWeb AI. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Built with love & AI by Lovable.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;