import React from 'react';
import { motion } from 'framer-motion';
import SectionCta from './SectionCta';
import { serviceData as staticServiceData } from '../../data/services';
import { useServices } from '../../hooks/useServices';

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ServicesPreview = () => {
    const services = useServices(staticServiceData).slice(0, 4);

    return (
    <section id="services" className="section-padding relative">
        <div className="container">
            <motion.h2
                className="section-title text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                What I Offer
            </motion.h2>
            <p className="mx-auto -mt-6 mb-10 max-w-xl text-center text-sm text-sky-100/60">
                Services I bring to freelance work, internships, and collaborative projects.
            </p>

            <motion.div
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.1 }}
            >
                {services.map(({ iconKey: Icon, title, description }) => (
                    <motion.div
                        key={title}
                        variants={itemVariants}
                        whileHover={{ y: -6 }}
                        className="group rounded-2xl border border-blue-500/15 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_10px_40px_rgba(56,189,248,0.15)]"
                    >
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 text-sky-300 transition-colors duration-300 group-hover:text-sky-200">
                            <Icon size={24} />
                        </div>
                        <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>
                        <p className="text-xs leading-relaxed text-sky-100/60">{description}</p>
                    </motion.div>
                ))}
            </motion.div>

            <SectionCta to="/services" label="View All Services" />
        </div>
    </section>
    );
};

export default ServicesPreview;
