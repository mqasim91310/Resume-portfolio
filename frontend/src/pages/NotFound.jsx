import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, FolderKanban } from 'lucide-react';

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
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/" className="btn primary-btn inline-flex items-center gap-2">
                    <Home size={18} /> Back to Home
                </Link>
                <Link to="/projects" className="btn secondary-btn inline-flex items-center gap-2">
                    <FolderKanban size={18} /> View Projects
                </Link>
            </div>
        </div>
    </section>
);

export default NotFound;
