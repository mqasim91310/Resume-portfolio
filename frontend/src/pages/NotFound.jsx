import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => (
    <section className="section-padding relative z-10">
        <div className="container text-center py-24">
            <motion.h1
                className="section-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                404 — Page Not Found
            </motion.h1>
            <p className="text-sky-100/60 mb-8 max-w-md mx-auto">
                That page doesn&apos;t exist, or the link is out of date. Let&apos;s get you back on track.
            </p>
            <Link to="/" className="btn primary-btn inline-flex items-center gap-2">
                Back to Home
            </Link>
        </div>
    </section>
);

export default NotFound;
