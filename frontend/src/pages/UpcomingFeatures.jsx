import { motion } from 'framer-motion';
import { Lightbulb, Rocket, BarChartBig } from 'lucide-react';

const upcomingFeaturesList = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary mb-3" />,
    title: 'AI-Driven Remediation Suggestions',
    description: 'Get smart, actionable advice on how to fix identified vulnerabilities directly within your reports.',
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary mb-3" />,
    title: 'Continuous Monitoring & Alerts',
    description: 'Set up automated scans and receive real-time alerts for new threats on your configured websites.',
  },
  {
    icon: <BarChartBig className="h-8 w-8 text-primary mb-3" />,
    title: 'Advanced Dashboard Analytics',
    description: 'Visualize your security posture over time with enhanced charts and trend analysis.',
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: (i) => ({ // Removed ': number' type annotation
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // Kept as array, assuming framer-motion handles it
    },
  }),
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(var(--primary-rgb), 0.1)", 
    transition: { duration: 0.3, ease: "easeOut" } // Kept as string
  }
};


const UpcomingFeatures = () => {
  return (
    <motion.div
      className="py-16 bg-card/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl font-bold text-center text-foreground mb-3"
        >
          What's <span className="text-primary">Coming Soon</span>?
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-center text-muted-foreground mb-12 max-w-xl mx-auto"
        >
          We're constantly innovating to bring you the most advanced security tools.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingFeaturesList.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-background p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              {feature.icon}
              <h4 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UpcomingFeatures;
