import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Paintbrush, Database, Code, Bug, Tablet, Sparkles, MessageCircle } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const Services = () => {
    const serviceData = [
        {
            icon: <Smartphone size={48} />,
            title: 'Flutter Development',
            description: 'Building high-performance, cross-platform mobile applications with Flutter for a seamless user experience on both iOS and Android.'
        },
        {
            icon: <Paintbrush size={48} />,
            title: 'UI/UX Design',
            description: 'Crafting intuitive, aesthetically pleasing, and user-centric interfaces that enhance engagement and ensure a delightful user journey.'
        },
        {
            icon: <Database size={48} />,
            title: 'Firebase Integration',
            description: 'Integrating robust backend services with Google Firebase for scalable, real-time data synchronization, authentication, and cloud functions.'
        },
        {
            icon: <Code size={48} />,
            title: 'REST API Integration',
            description: 'Connecting applications with external services through efficient, secure, and well-documented RESTful APIs for data exchange and functionality.'
        },
        {
            icon: <Bug size={48} />,
            title: 'Bug Fixing & Optimization',
            description: 'Identifying, diagnosing, and resolving software defects to ensure smooth, reliable, and optimized application performance and stability.'
        },
        {
            icon: <Tablet size={48} />,
            title: 'Responsive Applications',
            description: 'Developing applications that adapt flawlessly and provide an optimal viewing experience across a wide range of devices and screen sizes.'
        },
        {
            icon: <Sparkles size={48} />,
            title: 'Modern Animations',
            description: 'Adding captivating, smooth, and performance-optimized animations to enhance the visual appeal and interactivity of user interfaces.'
        },
        {
            icon: <MessageCircle size={48} />,
            title: 'Technical Consultation',
            description: 'Providing expert guidance and strategic insights on software development, architecture best practices, and technology stack choices to achieve project goals.'
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <section id="services" className="services-section section-padding">
            <div className="container">
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    My Services
                </motion.h2>
                <motion.div 
                    className="services-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {serviceData.map((service, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <TiltCard className="service-card glass-card" maxTilt={8}>
                                <motion.div
                                    className="service-icon"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: (index % 4) * 0.2 }}
                                >
                                    {service.icon}
                                </motion.div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
