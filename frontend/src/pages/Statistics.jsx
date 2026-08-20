import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';

const StatCard = ({ title, targetValue, suffix = '' }) => {
    return (
        <motion.div
            className="stat-card glass-card p-6 sm:p-8 rounded-2xl border border-blue-500/15 bg-white/[0.01] backdrop-blur-md text-center flex flex-col justify-center items-center gap-2 cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{
                scale: 1.04,
                borderColor: "rgba(56, 189, 248, 0.4)",
                boxShadow: "0 15px 35px rgba(56, 189, 248, 0.25)"
            }}
            whileTap={{ scale: 0.98 }}
        >
            <h3 className="counter text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-500 to-blue-700 tracking-tight">
                <AnimatedCounter to={targetValue} suffix={suffix} duration={2} roundMode="ceil" />
            </h3>
            <p className="text-sky-100/70 text-xs sm:text-sm font-medium tracking-wide uppercase mt-1">
                {title}
            </p>
        </motion.div>
    );
};

const Statistics = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
    };

    return (
        <section id="statistics" className="statistics-section section-padding py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl">

                <motion.h2
                    className="section-title text-center mb-16 font-bold text-3xl sm:text-4xl text-white"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    My Journey in Numbers
                </motion.h2>

                <motion.div
                    className="stats-grid grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <StatCard title="Years Journey" targetValue={4} suffix="+" />
                    <StatCard title="Semesters" targetValue={8} />
                    <StatCard title="Projects Completed" targetValue={15} suffix="+" />
                    <StatCard title="Technologies Learned" targetValue={15} suffix="+" />
                    <StatCard title="Certificates Earned" targetValue={12} suffix="+" />
                    <StatCard title="Coding Hours" targetValue={5000} suffix="+" />
                </motion.div>

            </div>
        </section>
    );
};

export default Statistics;