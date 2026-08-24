import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

/**
 * Counts up from `from` to `to` once the element scrolls into view.
 * Supports both integers ("15+") and one-decimal floats ("2.5+").
 * Replaces the three near-duplicate implementations that previously
 * lived in Home.jsx, About.jsx, and Statistics.jsx.
 */
const AnimatedCounter = ({ from = 0, to, suffix = '', duration = 1.5, roundMode = 'floor' }) => {
    const numericTo = parseFloat(to);
    const startValue = Number.isFinite(from) ? from : 0;
    const count = useMotionValue(startValue);
    const isFloat = !Number.isInteger(numericTo);
    const round = roundMode === 'ceil' ? Math.ceil : Math.floor;

    const display = useTransform(count, (latest) => {
        if (Number.isNaN(numericTo)) return to;
        return isFloat ? `${latest.toFixed(1)}${suffix}` : `${round(latest)}${suffix}`;
    });

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView && !Number.isNaN(numericTo)) {
            count.set(startValue);
            const controls = animate(count, numericTo, { duration, ease: 'easeOut' });
            return controls.stop;
        }
    }, [isInView, numericTo, count, duration, startValue]);

    return <motion.span ref={ref}>{Number.isNaN(numericTo) ? to : display}</motion.span>;
};

export default AnimatedCounter;
