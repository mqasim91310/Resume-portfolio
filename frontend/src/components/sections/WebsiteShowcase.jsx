import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, MapPin, Search, Home, Building2, Phone, Star } from 'lucide-react';
import TiltCard from '../TiltCard';

const properties = [
    { title: 'Marina Heights', loc: 'DHA Phase 6', price: 'PKR 8.5M', tag: 'Featured', rating: '4.9' },
    { title: 'Skyline Residency', loc: 'Bahria Town', price: 'PKR 6.2M', tag: 'New', rating: '4.8' },
    { title: 'Green Valley', loc: 'Gulberg III', price: 'PKR 4.8M', tag: 'Hot', rating: '4.7' },
    { title: 'Royal Enclave', loc: 'Model Town', price: 'PKR 12M', tag: 'Premium', rating: '5.0' },
    { title: 'Urban Lofts', loc: 'Johar Town', price: 'PKR 5.1M', tag: 'Sold Out', rating: '4.6' },
];

const BrowserMock = ({ scrollY }) => {
    const innerY = useTransform(scrollY, [0, 1], ['0%', '-42%']);

    return (
        <div className="browser-mock relative mx-auto w-full max-w-[520px]">
            <div
                className="absolute inset-0 -z-10 rounded-3xl blur-3xl opacity-50"
                style={{ background: 'rgba(56, 189, 248, 0.35)' }}
            />
            <div className="browser-frame rounded-2xl border border-white/10 bg-[#0a0f1a] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]">
                <div className="browser-chrome flex items-center gap-3 border-b border-white/8 px-4 py-3">
                    <div className="flex gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-blue-500/90" />
                        <span className="h-3 w-3 rounded-full bg-amber-400/90" />
                        <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
                    </div>
                    <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="truncate text-[11px] text-sky-100/70">alkabir-developers.vercel.app</span>
                    </div>
                </div>

                <div className="browser-viewport relative h-[340px] overflow-hidden sm:h-[380px]">
                    <motion.div className="browser-scroll-content absolute inset-x-0 top-0" style={{ y: innerY }}>
                        {/* Nav */}
                        <div className="flex items-center justify-between border-b border-white/8 bg-[#0f1729] px-5 py-3">
                            <div className="flex items-center gap-2">
                                <Building2 size={16} className="text-sky-400" />
                                <span className="text-sm font-bold text-white">Al Kabir Developers</span>
                            </div>
                            <div className="hidden items-center gap-4 text-[11px] text-sky-100/60 sm:flex">
                                <span>Properties</span>
                                <span>About</span>
                                <span>Contact</span>
                            </div>
                            <span className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1 text-[10px] font-semibold text-white">
                                Book Visit
                            </span>
                        </div>

                        {/* Hero */}
                        <div className="relative bg-gradient-to-br from-blue-950/80 via-[#16213a] to-black px-5 py-8">
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-sky-400">Real Estate Platform</p>
                            <h4 className="mb-2 max-w-[280px] text-xl font-bold leading-tight text-white">
                                Find your dream property in Lahore
                            </h4>
                            <p className="mb-4 max-w-[260px] text-[11px] leading-relaxed text-sky-100/60">
                                Full-stack replica with live listings, admin dashboard, and smart search filters.
                            </p>
                            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                                <Search size={12} className="text-sky-300/70" />
                                <span className="text-[11px] text-sky-100/50">Search by location, price, type…</span>
                            </div>
                        </div>

                        {/* Stats strip */}
                        <div className="grid grid-cols-3 gap-2 border-b border-white/8 bg-black/30 px-5 py-4">
                            {[
                                { val: '120+', lbl: 'Listings' },
                                { val: '4.8★', lbl: 'Rating' },
                                { val: '2.5K', lbl: 'Users' },
                            ].map((s) => (
                                <div key={s.lbl} className="rounded-xl border border-blue-500/15 bg-white/[0.03] px-2 py-2 text-center">
                                    <p className="text-sm font-bold text-sky-300">{s.val}</p>
                                    <p className="text-[9px] text-sky-100/50">{s.lbl}</p>
                                </div>
                            ))}
                        </div>

                        {/* Property cards */}
                        <div className="space-y-2.5 bg-[#0a0f1a] px-5 py-4">
                            <p className="text-xs font-semibold text-white">Featured Properties</p>
                            {properties.map((p) => (
                                <div
                                    key={p.title}
                                    className="flex items-center justify-between rounded-xl border border-blue-500/12 bg-gradient-to-r from-blue-950/30 to-transparent px-3.5 py-3"
                                >
                                    <div className="min-w-0">
                                        <div className="mb-0.5 flex items-center gap-1.5">
                                            <p className="truncate text-[12px] font-semibold text-white">{p.title}</p>
                                            <span className="shrink-0 rounded-full bg-blue-500/20 px-1.5 py-0.5 text-[8px] font-bold uppercase text-sky-300">
                                                {p.tag}
                                            </span>
                                        </div>
                                        <p className="flex items-center gap-1 text-[10px] text-sky-100/50">
                                            <MapPin size={9} /> {p.loc}
                                        </p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <p className="text-[11px] font-bold text-sky-300">{p.price}</p>
                                        <p className="flex items-center justify-end gap-0.5 text-[9px] text-amber-300/80">
                                            <Star size={8} className="fill-amber-300/80" /> {p.rating}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer strip */}
                        <div className="flex items-center justify-between border-t border-white/8 bg-[#0f1729] px-5 py-4">
                            <div className="flex items-center gap-2 text-[10px] text-sky-100/50">
                                <Home size={11} /> <Phone size={11} /> Contact Agent
                            </div>
                            <span className="text-[10px] font-medium text-sky-300">View All →</span>
                        </div>
                    </motion.div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0f1a] to-transparent" />
                </div>
            </div>
        </div>
    );
};

const WebsiteShowcase = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 28 });
    const y = useTransform(scrollYProgress, [0, 1], [60, -40]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.85]);

    return (
        <section id="web-work" ref={ref} className="section-padding relative z-10 overflow-hidden">
            <div className="container">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <motion.div
                        style={{ opacity }}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center lg:text-left"
                    >
                        <span className="mb-3 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-300">
                            Web Development
                        </span>
                        <h2 className="section-title mb-4 text-left">
                            Full-Stack Web Apps That Feel Production-Ready
                        </h2>
                        <p className="mb-6 max-w-lg text-sm leading-relaxed text-sky-100/65 sm:text-base lg:mx-0 mx-auto">
                            From real estate platforms to admin dashboards — responsive React frontends
                            paired with Node.js backends, built with the polish of a live product.
                        </p>

                        <ul className="mb-8 space-y-3 text-left lg:mx-0 mx-auto max-w-md">
                            {[
                                'Al Kabir Developers — full-stack real estate replica',
                                'React + Node.js + MySQL with admin dashboard',
                                'Responsive UI, search filters, and user registration',
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm text-sky-100/75">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <motion.a
                            href="https://github.com/mqasim91310"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn primary-btn inline-flex items-center gap-2"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            View Source Code <ArrowRight size={16} />
                        </motion.a>
                    </motion.div>

                    <motion.div style={{ y }} className="relative">
                        <TiltCard maxTilt={5} className="rounded-2xl">
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <BrowserMock scrollY={smoothProgress} />
                            </motion.div>
                        </TiltCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WebsiteShowcase;
