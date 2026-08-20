import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Wrap any card in <TiltCard> to get a subtle 3D tilt-toward-cursor effect
// plus a light-sweep glare, without touching the card's own markup/classes.
const TiltCard = ({ children, className = '', maxTilt = 10, glare = true }) => {
    const ref = useRef(null);

    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
    const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), springConfig);
    const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), springConfig);
    const glareX = useTransform(x, [0, 1], ['0%', '100%']);
    const glareY = useTransform(y, [0, 1], ['0%', '100%']);
    const glareBackground = useTransform(
        [glareX, glareY],
        ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.14), transparent 45%)`
    );

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 800 }}
            className={`relative cursor-hover group/tilt ${className}`}
        >
            {children}
            {glare && (
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-300"
                    style={{ background: glareBackground }}
                />
            )}
        </motion.div>
    );
};

export default TiltCard;
