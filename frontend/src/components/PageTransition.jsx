import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Wraps <Outlet/> so every route change gets a consistent fade+rise
// transition instead of an abrupt content swap.
const PageTransition = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
                <Outlet />
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
