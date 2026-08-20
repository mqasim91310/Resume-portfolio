import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronDown,
    Code2,
    Smartphone,
    GraduationCap,
    Gamepad2,
    Mail,
    ArrowRight,
    MapPin,
} from 'lucide-react';
import { Github, Linkedin } from '../components/BrandIcons';
import { CURRENT_SEMESTER } from '../data/semesters';
import MagneticButton from '../components/MagneticButton';
import AnimatedCounter from '../components/AnimatedCounter';
import ProfileAvatar from '../components/ProfileAvatar';
import WebsiteShowcase from '../components/sections/WebsiteShowcase';
import MobileShowcase from '../components/sections/MobileShowcase';

// The homepage is a landing page, not a mirror of every dedicated page.
// Each section below renders only a short, scannable preview with a
// "View More" CTA to its full page — see components/previews/.
import AboutPreview from '../components/previews/AboutPreview';
import ProjectsPreview from '../components/previews/ProjectsPreview';
import SkillsPreview from '../components/previews/SkillsPreview';
import ServicesPreview from '../components/previews/ServicesPreview';
import CertificatesPreview from '../components/previews/CertificatesPreview';

const Home = () => {
    const navigate = useNavigate();
    const [typingText, setTypingText] = useState('');
    const phrases = [
        'Flutter Developer',
        'MERN Stack Developer',
        'Mobile App Developer',
        'Problem Solver',
    ];

    useEffect(() => {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeoutId;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            setTypingText(currentPhrase.substring(0, charIndex));

            if (!isDeleting) {
                charIndex++;
                if (charIndex > currentPhrase.length) {
                    isDeleting = true;
                    timeoutId = setTimeout(type, 1500);
                } else {
                    timeoutId = setTimeout(type, 100);
                }
            } else {
                charIndex--;
                if (charIndex < 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    timeoutId = setTimeout(type, 500);
                } else {
                    timeoutId = setTimeout(type, 50);
                }
            }
        };

        timeoutId = setTimeout(type, 500);
        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const highlights = [
        {
            icon: Code2,
            title: 'Full-Stack Web',
            desc: 'Building end-to-end web apps with modern JavaScript, React and backend fundamentals.',
        },
        {
            icon: Smartphone,
            title: 'Flutter & Mobile',
            desc: 'Crafting cross-platform mobile apps with Flutter, focused on clean UI and smooth UX.',
        },
        {
            icon: Gamepad2,
            title: 'DSA & Games',
            desc: 'DSA-driven C++ systems and interactive games built with strong algorithmic foundations.',
        },
        {
            icon: GraduationCap,
            title: 'CS Fundamentals',
            desc: 'Solid grounding in Java, C++, x86/8086 Assembly, and low-level programming concepts.',
        },
    ];

    const quickStats = [
        { value: '6th', label: 'Semester, BSCS', hasAnim: false },
        { value: '2027', label: 'Expected Graduation', hasAnim: false },
        { value: '15', label: 'Projects Built', hasAnim: true, suffix: '+' },
        { value: '4', label: 'Languages & Tools', hasAnim: true, suffix: '+' },
    ];

    const semesterChips = Array.from({ length: 8 }, (_, i) => i + 1);

    const socials = [
        { icon: Github, href: 'https://github.com/mqasim91310', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammad-qasim-6725242a7', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:mqasim91310@gmail.com', label: 'Email' },
    ];

    return (
        <>
            {/* HERO */}
            <section id="home" className="hero-section hero-split">
                <div className="hero-glow hero-glow-one" />
                <div className="hero-glow hero-glow-two" />
                <div className="hero-shape hero-shape-ring" aria-hidden="true" />
                <div className="hero-shape hero-shape-square" aria-hidden="true" />
                <div className="hero-shape hero-shape-diamond" aria-hidden="true" />
                <div className="hero-shape hero-shape-dot" aria-hidden="true" />
                <div className="container hero-split-grid relative z-10">
                    <motion.div
                        className="hero-content"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="hero-badge"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            </span>
                            Available for internships &amp; freelance work
                            <span className="hidden text-sky-400/50 sm:inline">·</span>
                            <span className="hidden text-sky-300/90 sm:inline">Flutter • MERN • UI systems</span>
                        </motion.div>

                        <motion.div variants={itemVariants} className="hero-profile-shell lg:hidden">
                            <div className="relative">
                                <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/40 blur-2xl" />
                                <ProfileAvatar size="sm" />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="hero-heading-group">
                            <h1>
                                Hello, I'm <span className="student-name">Muhammad Qasim</span>
                            </h1>
                            <p className="subtitle">
                                <span className="typing-effect">{typingText}</span>
                                <span className="animate-pulse text-sky-400">|</span>
                            </p>
                        </motion.div>

                        <motion.p variants={itemVariants} className="intro-text">
                            A motivated BS Computer Science student at Riphah International University with
                            hands-on experience building full-stack web applications, mobile apps, DSA-driven
                            C++ systems, and interactive games. Welcome to my journey through code, curiosity,
                            and the occasional stretch goal.
                        </motion.p>

                        <motion.div variants={itemVariants} className="hero-meta">
                            <span className="hero-meta-pill">
                                <MapPin size={15} className="text-sky-400" />
                                Lahore, Pakistan
                            </span>
                            <span className="hidden sm:inline-flex hero-meta-pill">Riphah International University</span>
                        </motion.div>

                        <motion.div variants={itemVariants} className="hero-buttons">
                            <MagneticButton
                                href="/Muhammad-Qasim-CV.pdf"
                                download="Muhammad-Qasim-CV.pdf"
                                className="btn secondary-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Download CV
                            </MagneticButton>
                            <MagneticButton
                                href="/contact"
                                className="btn secondary-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Me
                            </MagneticButton>
                            <MagneticButton
                                href="#projects"
                                className="btn primary-btn justify-center text-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Projects <ArrowRight size={16} />
                            </MagneticButton>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-3 flex justify-center lg:justify-start">
                            <a
                                href="/journey"
                                className="inline-flex items-center gap-2.5 text-xs font-medium text-sky-300/70 transition-colors hover:text-white cursor-hover"
                            >
                                Explore my full semester journey <ArrowRight size={12} />
                            </a>
                        </motion.div>

                        <motion.div variants={itemVariants} className="hero-socials">
                            {socials.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="hero-social-link"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-preview hidden lg:flex"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="hero-preview-inner">
                            <ProfileAvatar size="lg" />
                            <div className="hero-preview-stats">
                                <div className="hero-preview-stat">
                                    <span className="hero-preview-stat-val">15+</span>
                                    <span className="hero-preview-stat-lbl">Projects</span>
                                </div>
                                <div className="hero-preview-stat">
                                    <span className="hero-preview-stat-val">6th</span>
                                    <span className="hero-preview-stat-lbl">Semester</span>
                                </div>
                                <div className="hero-preview-stat">
                                    <span className="hero-preview-stat-val">2027</span>
                                    <span className="hero-preview-stat-lbl">Graduation</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="scroll-indicator"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                    <ChevronDown size={30} />
                </motion.div>
            </section>

            {/* QUICK STATS */}
            <section className="relative z-10 px-5 pb-4">
                <div className="container">
                    <motion.div
                        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        {quickStats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-blue-500/15 bg-white/[0.03] px-4 py-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/[0.06]"
                            >
                                <div className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-3xl font-bold text-transparent">
                                    {stat.hasAnim ? (
                                        <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                                    ) : (
                                        stat.value
                                    )}
                                </div>
                                <p className="mt-1 text-sm text-sky-100/70">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SEMESTER CHIPS */}
            <section className="relative z-10 px-5 pb-4">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">My Semester Journey</h3>
                        <p className="mb-8 text-sm text-sky-100/60">Tap a semester to see what I studied &amp; built</p>
                        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                            {semesterChips.map((n) => {
                                const isCurrent = n === CURRENT_SEMESTER;
                                const isUpcoming = n > CURRENT_SEMESTER;
                                return (
                                    <motion.button
                                        key={n}
                                        onClick={() => navigate(`/semester/${n}`)}
                                        whileHover={{ scale: 1.08, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative rounded-full px-5 py-2.5 text-sm font-semibold backdrop-blur-sm transition-colors duration-300 ${isCurrent
                                            ? 'border border-sky-400/60 bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-[0_0_20px_rgba(56, 189, 248,0.45)]'
                                            : isUpcoming
                                                ? 'border border-dashed border-white/15 bg-white/[0.02] text-sky-100/40'
                                                : 'border border-blue-500/20 bg-white/[0.03] text-sky-100/80 hover:border-blue-500/50 hover:text-white'
                                            }`}
                                    >
                                        Semester {n}
                                        {isCurrent && (
                                            <span className="absolute -top-2 -right-2 h-3 w-3 animate-ping rounded-full bg-sky-400" />
                                        )}
                                        {isCurrent && (
                                            <span className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-blue-500" />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                        <a
                            href="/journey"
                            className="inline-flex items-center gap-2 text-base leading-loose font-medium text-sky-300/80 transition-colors hover:text-white cursor-hover"
                        >
                            View the full journey timeline <ArrowRight size={14} />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* WHAT I DO (Side-by-Side View) */}
            <section className="section-padding relative z-10">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        {/* Title Left Side */}
                        <motion.div
                            className="flex flex-col justify-center lg:col-span-4"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="section-title text-left mb-6">
                                What I Do
                            </h2>
                            <p className="text-sky-100/60 text-left text-base max-w-md">
                                Transforming problems into elegant digital solutions through modern software architecture.
                            </p>
                        </motion.div>

                        {/* Info / Cards Right Side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:col-span-8">
                            {highlights.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.title}
                                        className="group rounded-2xl border border-blue-500/15 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_10px_40px_rgba(56, 189, 248,0.15)]"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                    >
                                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 text-sky-300 transition-colors duration-300 group-hover:text-sky-200">
                                            <Icon size={22} />
                                        </div>
                                        <h3 className="mb-1.5 text-base font-semibold text-white">{item.title}</h3>
                                        <p className="text-sm leading-relaxed text-sky-100/60">{item.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA / CONTACT PREVIEW */}
            <section id="contact" className="relative z-10 py-20">
                <div className="container">
                    <motion.div
                        className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950/40 via-black/40 to-blue-950/30 p-10 backdrop-blur-sm sm:p-14"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            {/* Heading Side */}
                            <div className="text-center lg:text-left">
                                <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl leading-tight">
                                    Let's build something<br />out of this world
                                </h2>
                            </div>

                            {/* Info Side */}
                            <div className="flex flex-col items-center lg:items-right">
                                <p className="text-sky-100/70 max-w-lg text-center lg:text-centre leading-relaxed">
                                    Actively seeking a Software Engineering internship to apply academic knowledge
                                    in a real-world engineering environment. Have an idea, a role, or just want to
                                    talk tech? My inbox is always open.
                                </p>
                                <motion.a
                                    href="/contact"
                                    className="btn primary-btn relative mt-6 inline-flex items-center gap-2 mx-auto lg:mx-0"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Get In Touch <ArrowRight size={16} />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ABOUT PREVIEW */}
            <AboutPreview />

            {/* WEB APP SHOWCASE */}
            <WebsiteShowcase />

            {/* MOBILE APP SHOWCASE */}
            <MobileShowcase />

            {/* PROJECTS PREVIEW */}
            <ProjectsPreview />

            {/* SKILLS PREVIEW */}
            <SkillsPreview />

            {/* SERVICES PREVIEW */}
            <ServicesPreview />

            {/* CERTIFICATES PREVIEW */}
            <CertificatesPreview />
        </>
    );
};

export default Home; 