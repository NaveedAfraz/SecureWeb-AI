
import { Shield, BrainCircuit, Zap, LockKeyhole, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <LockKeyhole className="h-12 w-12 text-primary mb-4" />,
        title: 'Comprehensive Scan',
        description: 'Detects a wide range of vulnerabilities, from insecure password storage to misconfigured headers.',
    },
    {
        icon: <BrainCircuit className="h-12 w-12 text-primary mb-4" />,
        title: 'Gemini AI Analysis',
        description: 'Leverages advanced AI to provide deeper insights and contextual understanding of potential threats.',
    },
    {
        icon: <Zap className="h-12 w-12 text-primary mb-4" />,
        title: 'Zapier Integration',
        description: 'Automate your security workflows by connecting our analysis results to your favorite apps via Zapier.',
    },
    {
        icon: <FileText className="h-12 w-12 text-primary mb-4" />,
        title: 'Actionable Reports',
        description: 'Receive clear, easy-to-understand reports with prioritized recommendations to fix issues quickly.',
    },
];

const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    })
};

const FeaturesSection = () => {
    return (
        <section id="features" className="py-20 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="text-4xl font-bold text-center text-foreground mb-4">
                        Why Choose <span className="text-primary">SecureWeb AI</span>?
                    </h2>
                    <p className="text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
                        Our platform provides cutting-edge tools and insights to keep your web applications secure and resilient against threats.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            custom={index}
                            variants={cardVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, amount: 0.2 }}
                            className="bg-background p-8 rounded-xl shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col items-center text-center group" // Added 'group' class
                        >
                            <motion.div
                                className="inline-block" // Added for transform-origin if needed, and to isolate motion
                                whileHover={{ scale: 1.15, rotate: 5 }} // Icon animation on card hover
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="text-2xl font-semibold text-foreground mb-3 mt-2">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;