import React, { useEffect, useRef, useState } from 'react';

// A soft glowing dot that follows the pointer with spring-like lag, plus a
// larger trailing ring that reveals a "magnetic" pull state when hovering
// anything clickable. Disabled automatically on touch devices.
const CursorGlow = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [enabled, setEnabled] = useState(false);
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isTouch || prefersReducedMotion) return;
        setEnabled(true);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let dotX = mouseX;
        let dotY = mouseY;
        let ringX = mouseX;
        let ringY = mouseY;
        let raf;

        const handleMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleOver = (e) => {
            const interactive = e.target.closest('a, button, input, textarea, [role="button"], .cursor-hover');
            setHovering(!!interactive);
        };

        const tick = () => {
            dotX += (mouseX - dotX) * 0.35;
            dotY += (mouseY - dotY) * 0.35;
            ringX += (mouseX - ringX) * 0.14;
            ringY += (mouseY - ringY) * 0.14;

            if (dotRef.current) dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
            if (ringRef.current) ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

            raf = requestAnimationFrame(tick);
        };

        window.addEventListener('mousemove', handleMove, { passive: true });
        window.addEventListener('mouseover', handleOver, { passive: true });
        raf = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseover', handleOver);
            cancelAnimationFrame(raf);
        };
    }, []);

    if (!enabled) return null;

    return (
        <>
            <div
                ref={ringRef}
                className={`cursor-ring ${hovering ? 'cursor-ring-hover' : ''}`}
                aria-hidden="true"
            />
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
        </>
    );
};

export default CursorGlow;
