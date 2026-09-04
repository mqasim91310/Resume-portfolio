import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from '../components/TiltCard';
import { serviceData as staticServiceData } from '../data/services';
import { useServices } from '../hooks/useServices';

const Services = () => {
    const serviceData = useServices(staticServiceData);

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
                <motion.h1 
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    My Services
                </motion.h1>
                <motion.div 
                    className="services-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {serviceData.map((service, index) => {
                        const Icon = service.iconKey;
                        return (
                        <motion.div key={service.title} variants={itemVariants}>
                            <TiltCard className="service-card glass-card" maxTilt={8}>
                                <motion.div
                                    className="service-icon"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: (index % 4) * 0.2 }}
                                >
                                    <Icon size={48} />
                                </motion.div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                {Array.isArray(service.bullets) && service.bullets.length > 0 && (
                                    <ul className="mt-3 space-y-1.5 text-left">
                                        {service.bullets.map((point) => (
                                            <li
                                                key={point}
                                                className="flex items-start gap-2 text-xs leading-relaxed text-sky-100/65 sm:text-sm"
                                            >
                                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400/70" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </TiltCard>
                        </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
