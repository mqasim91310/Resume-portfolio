import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Wrap any link/button in <MagneticButton> for a subtle cursor-attraction
// effect — the element eases toward the pointer within a small radius.
const MagneticButton = ({ children, as: Component = motion.a, strength = 0.35, className = '', ...props }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        x.set(relX * strength);
        y.set(relY * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <Component
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={`cursor-hover ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};

export default MagneticButton;
