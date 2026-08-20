import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[1200] bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 shadow-[0_0_12px_rgba(56, 189, 248,0.6)]"
            style={{ scaleX }}
        />
    );
};

export default ScrollProgressBar;
