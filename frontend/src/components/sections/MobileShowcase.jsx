import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Coffee, Star, Bell, Search, Home as HomeIcon, User, Wifi, Battery, Signal, ArrowRight } from 'lucide-react';
import { Github } from '../BrandIcons';
import TiltCard from '../TiltCard';

const app = {
    id: 'brew-bless',
    name: 'Brew & Bless',
    tag: 'Coffee Shop App',
    icon: Coffee,
    gradient: 'from-blue-500 via-blue-600 to-orange-500',
    glow: 'rgba(255,90,120,0.45)',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/mqasim91310',
    screen: {
        title: 'Good morning ☕',
        items: [
            { label: 'Caramel Macchiato', sub: 'Medium · Oat milk', price: '$4.50' },
            { label: 'Cold Brew', sub: 'Large · Extra ice', price: '$3.80' },
            { label: 'Blueberry Muffin', sub: 'Bakery', price: '$2.90' },
        ],
    },
};

const PhoneMock = () => {
    const Icon = app.icon;
    return (
        <div className="relative mx-auto w-[260px] sm:w-[280px]">
            <div
                className="absolute inset-0 -z-10 rounded-[3rem] blur-3xl opacity-60"
                style={{ background: app.glow }}
            />
            <div className="relative rounded-[2.6rem] border-[6px] border-white/10 bg-[#0b0f1a] p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" />
                <div className={`relative overflow-hidden rounded-[2.1rem] bg-gradient-to-br ${app.gradient} aspect-[9/19]`}>
                    <div className="flex items-center justify-between px-5 pt-4 text-[10px] font-medium text-white/90">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                            <Signal size={11} />
                            <Wifi size={11} />
                            <Battery size={13} />
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between px-5">
                        <div>
                            <p className="text-[11px] text-white/70">{app.tag}</p>
                            <h4 className="text-base font-bold text-white">{app.screen.title}</h4>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                            <Bell size={15} className="text-white" />
                        </div>
                    </div>

                    <div className="mx-5 mt-4 flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 backdrop-blur-sm">
                        <Search size={13} className="text-white/80" />
                        <span className="text-[11px] text-white/70">Search</span>
                    </div>

                    <div className="mt-4 space-y-2.5 px-5">
                        {app.screen.items.map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.15 * i }}
                                className="flex items-center justify-between rounded-2xl bg-black/25 px-3.5 py-3 backdrop-blur-sm"
                            >
                                <div>
                                    <p className="text-[12px] font-semibold text-white">{item.label}</p>
                                    <p className="text-[10px] text-white/60">{item.sub}</p>
                                </div>
                                <span className="text-[11px] font-bold text-white">{item.price}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="absolute inset-x-3 bottom-3 flex items-center justify-around rounded-full bg-black/30 py-2.5 backdrop-blur-md">
                        {[HomeIcon, Icon, Star, User].map((I, i) => (
                            <I key={i} size={15} className={i === 1 ? 'text-white' : 'text-white/50'} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MobileShowcase = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section id="mobile-work" ref={ref} className="section-padding relative z-10 overflow-hidden">
            <div className="container">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <motion.div
                        style={{ y }}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="order-2 lg:order-1 flex justify-center"
                    >
                        <TiltCard maxTilt={6} className="rounded-[2.6rem]">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <PhoneMock />
                            </motion.div>
                        </TiltCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="order-1 lg:order-2 text-center lg:text-left"
                    >
                        <span className="mb-3 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-300">
                            Mobile Development
                        </span>
                        <h2 className="section-title mb-4 text-left">
                            Flutter Apps, Built for Real Devices
                        </h2>
                        <p className="mb-6 max-w-lg text-sm leading-relaxed text-sky-100/65 sm:text-base lg:mx-0 mx-auto">
                            Cross-platform mobile experiences crafted with Flutter — clean UI, smooth
                            interactions, and production-ready architecture from a single codebase.
                        </p>

                        <div className="mb-6 lg:mx-0 mx-auto max-w-md">
                            <h3 className="mb-1 text-lg font-semibold text-white">{app.name}</h3>
                            <p className="mb-4 text-xs text-sky-100/50">{app.tag}</p>
                            <div className="mb-6 flex flex-wrap items-center justify-center gap-1.5 lg:justify-start">
                                {app.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-full border border-blue-500/20 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium text-sky-200/80"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <motion.a
                            href={app.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn primary-btn inline-flex items-center gap-2"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Github size={16} /> View Source <ArrowRight size={16} />
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MobileShowcase;
