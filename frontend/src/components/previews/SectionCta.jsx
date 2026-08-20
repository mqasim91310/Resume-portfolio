import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Consistent "View More / Explore / Learn More" link used at the bottom of
// every homepage preview section, so each one has a clear, uniform way to
// drill into its dedicated page.
const SectionCta = ({ to, label = 'View More', className = 'mt-8 flex justify-center' }) => (
    <motion.div whileHover={{ x: 4 }} className={className}>
        <Link
            to={to}
            className="group inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-[0_8px_28px_rgba(37,99,235,0.35)] cursor-hover"
        >
            {label}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
    </motion.div>
);

export default SectionCta;
