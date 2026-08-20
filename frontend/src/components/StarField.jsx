import React, { useMemo, useRef, useEffect } from 'react';

// A fixed, full-viewport starfield used behind every page to give the site
// a "floating in deep space" feeling. Stars twinkle via CSS; the nebula
// glows and star layers drift gently with the cursor for subtle parallax
// depth — most of the cost is a single rAF loop, no canvas needed.
const StarField = () => {
    const smallStars = useMemo(() => generateStars(90, { min: 1, max: 2 }), []);
    const mediumStars = useMemo(() => generateStars(35, { min: 2, max: 3 }), []);
    const bigStars = useMemo(() => generateStars(14, { min: 3, max: 4 }), []);

    const nebulaRef = useRef(null);
    const farStarsRef = useRef(null);
    const nearStarsRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return; // skip parallax on touch
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // respect user preference

        let targetX = 0;
        let targetY = 0;
        let curX = 0;
        let curY = 0;
        let raf;

        const handleMove = (e) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
            targetY = (e.clientY / window.innerHeight - 0.5) * 2;
        };

        const tick = () => {
            curX += (targetX - curX) * 0.04;
            curY += (targetY - curY) * 0.04;

            if (nebulaRef.current) nebulaRef.current.style.transform = `translate(${curX * 22}px, ${curY * 22}px)`;
            if (farStarsRef.current) farStarsRef.current.style.transform = `translate(${curX * 10}px, ${curY * 10}px)`;
            if (nearStarsRef.current) nearStarsRef.current.style.transform = `translate(${curX * 26}px, ${curY * 26}px)`;

            raf = requestAnimationFrame(tick);
        };

        window.addEventListener('mousemove', handleMove, { passive: true });
        raf = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0A0F1F] pointer-events-none">
            {/* Deep space blue nebula glows — drifts most with the cursor */}
            <div ref={nebulaRef} className="absolute inset-0 will-change-transform">
                <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[110px]" />
                <div className="absolute top-1/3 -right-24 h-[380px] w-[380px] rounded-full bg-blue-700/20 blur-[120px]" />
                <div className="absolute bottom-0 left-1/4 h-[460px] w-[460px] rounded-full bg-blue-900/25 blur-[130px]" />
            </div>

            {/* Far star layer — barely moves, gives depth */}
            <div ref={farStarsRef} className="absolute inset-0 will-change-transform">
                {smallStars.map((s) => (
                    <span key={s.id} className="star" style={s.style} />
                ))}
            </div>

            {/* Near star layer — moves more, sits "closer" to the viewer */}
            <div ref={nearStarsRef} className="absolute inset-0 will-change-transform">
                {mediumStars.map((s) => (
                    <span key={s.id} className="star star-glow" style={s.style} />
                ))}
                {bigStars.map((s) => (
                    <span key={s.id} className="star star-glow star-blue" style={s.style} />
                ))}
            </div>

            {/* Shooting stars */}
            <span className="shooting-star" style={{ top: '12%', left: '5%', animationDelay: '0s' }} />
            <span className="shooting-star" style={{ top: '38%', left: '55%', animationDelay: '4s' }} />
            <span className="shooting-star" style={{ top: '68%', left: '20%', animationDelay: '8s' }} />

            {/* Soft vignette so content stays readable */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>
    );
};

function generateStars(count, sizeRange) {
    return Array.from({ length: count }, (_, i) => {
        const size = (Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min).toFixed(1);
        return {
            id: `${sizeRange.min}-${i}`,
            style: {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${(Math.random() * 3 + 2).toFixed(2)}s`,
                animationDelay: `${(Math.random() * 5).toFixed(2)}s`,
            },
        };
    });
}

export default StarField;
