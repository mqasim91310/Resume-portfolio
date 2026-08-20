import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

/**
 * Counts up from `from` to `to` once the element scrolls into view.
 * Supports both integers ("15+") and one-decimal floats ("2.5+").
 * Replaces the three near-duplicate implementations that previously
 * lived in Home.jsx, About.jsx, and Statistics.jsx.
 */
const AnimatedCounter = ({ from = null, to, suffix = '', duration = 1.5, roundMode = 'floor' }) => {
    const numericTo = parseFloat(to);
    const startValue = from !== null ? from : numericTo; // Start from target if no 'from' specified to avoid 0 flash
    const count = useMotionValue(startValue);
    const isFloat = !Number.isInteger(numericTo);
    const round = roundMode === 'ceil' ? Math.ceil : Math.floor;

    const display = useTransform(count, (latest) => {
        if (isNaN(numericTo)) return to;
        return isFloat ? latest.toFixed(1) + suffix : round(latest) + suffix;
    });

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView && !isNaN(numericTo)) {
            const controls = animate(count, numericTo, { duration, ease: 'easeOut' });
            return controls.stop;
        }
    }, [isInView, numericTo, count, duration]);

    return <motion.span ref={ref}>{isNaN(numericTo) ? to : display}</motion.span>;
};

export default AnimatedCounter;
