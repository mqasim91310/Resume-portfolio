import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileAvatar from '../ProfileAvatar';
import AnimatedCounter from '../AnimatedCounter';
import SectionCta from './SectionCta';
import { useStatistics } from '../../hooks/useStatistics';
import { useAbout } from '../../hooks/useAbout';

const AboutPreview = () => {
    const liveStats = useStatistics({ years: '2.5', projects: '15', certificates: '10' });
    const about = useAbout({ profileImage: undefined });
    const stats = [
        { value: liveStats.years, label: 'Years Experience', suffix: '+' },
        { value: liveStats.projects, label: 'Projects Completed', suffix: '+' },
        { value: liveStats.certificates, label: 'Certificates', suffix: '+' },
    ];

    return (
    <section id="about" className="section-padding relative overflow-hidden">
        <div className="container">
            <motion.h2
                className="section-title text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                About Me
            </motion.h2>

            <motion.div
                className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex justify-center lg:col-span-4">
                    <div className="relative">
                        <div className="absolute inset-0 -z-10 rounded-3xl bg-blue-500/10 blur-2xl" />
                        <ProfileAvatar size="md" src={about.profileImage} />
                    </div>
                </div>

                <div className="glass-card rounded-3xl border border-blue-500/15 bg-white/[0.01] p-6 sm:p-8 lg:col-span-8">
                    <p className="text-sm leading-relaxed text-sky-100/80 sm:text-base">
                        Motivated <strong className="text-white">BS Computer Science student</strong> at Riphah
                        International University (6th semester), building full-stack web apps, Flutter mobile apps,
                        and DSA-driven C++ systems &mdash; and actively seeking a Software Engineering internship.
                    </p>

                    <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-blue-500/10 bg-white/[0.02] p-3 text-center backdrop-blur-sm sm:p-4"
                            >
                                <h3 className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                                    <AnimatedCounter to={stat.value} suffix={stat.suffix} duration={1.8} />
                                </h3>
                                <p className="mt-1 text-[10px] uppercase tracking-wider text-sky-100/60 sm:text-xs">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                    <Link
                        to="/statistics"
                        className="group mt-3 inline-flex items-center gap-1 text-xs font-medium text-sky-300/70 transition-colors hover:text-white cursor-hover"
                    >
                        View the full journey in numbers
                        <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </motion.div>

            <SectionCta to="/about" label="Learn More About Me" />
        </div>
    </section>
    );
};

export default AboutPreview;
