import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, BookOpen, Code, Lightbulb, GraduationCap, Clock, ArrowRight } from 'lucide-react';
import { semesterData, semesterYears } from '../data/semesters';

const Journey = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const timelineVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    let itemCounter = -1;
    const nextItemVariants = (isLeftAligned) => ({
        hidden: { opacity: 0, x: isLeftAligned ? -50 : 50, y: 20 },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    });

    const yearVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, type: 'spring', stiffness: 150, damping: 15 }
        }
    };

    const semesterById = Object.fromEntries(semesterData.map((s) => [s.id, s]));

    return (
        <section id="journey" ref={containerRef} className="journey-section section-padding relative py-20 overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl">

                <motion.h1
                    className="section-title text-center mb-4 font-bold text-3xl sm:text-4xl text-white"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    My CS Journey
                </motion.h1>
                <p className="text-center text-sky-100/60 text-sm mb-16 max-w-xl mx-auto">
                    Spring 2024 to Fall 2027 — eight semesters of a BSCS degree, every subject paired with something I actually built.
                </p>

                <motion.div
                    className="journey-timeline relative"
                    variants={timelineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.05 }}
                >
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[4px] bg-blue-500/10 -translate-x-1/2 rounded-full" />

                    <motion.div
                        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-blue-500 via-blue-500 to-blue-700 -translate-x-1/2 rounded-full origin-top shadow-[0_0_15px_rgba(56, 189, 248,0.5)] z-10"
                        style={{ scaleY }}
                    />

                    {semesterYears.map((year) => (
                        <React.Fragment key={year.label}>
                            <div className="relative my-8 flex md:justify-center">
                                <motion.div
                                    variants={yearVariants}
                                    className={`timeline-year z-20 text-white font-bold text-sm px-5 py-2 rounded-full shadow-lg border ml-10 md:ml-0 ${
                                        year.label.includes('Upcoming')
                                            ? 'bg-gradient-to-r from-blue-700/80 to-blue-800/80 border-sky-400/20 border-dashed'
                                            : 'bg-gradient-to-r from-blue-600 to-blue-600 border-sky-400/20'
                                    }`}
                                >
                                    {year.label}
                                </motion.div>
                            </div>

                            {year.semesters.map((semId) => {
                                const sem = semesterById[semId];
                                const isLeftAligned = (itemCounter + 1) % 2 === 0;
                                itemCounter += 1;
                                return (
                                    <motion.div
                                        key={sem.id}
                                        id={`semester-${sem.id}`}
                                        variants={nextItemVariants(isLeftAligned)}
                                        className={`timeline-item w-full mb-12 flex flex-col md:flex-row items-start relative pl-12 md:pl-0 scroll-mt-28 ${isLeftAligned ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 top-6 border-4 border-black z-20 ${
                                            sem.isUpcoming ? 'bg-sky-400/50 shadow-[0_0_10px_rgba(56, 189, 248,0.4)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(56, 189, 248,0.8)]'
                                        }`} />

                                        <div className={`w-full md:w-[calc(50%-32px)] ${isLeftAligned ? 'md:ml-auto md:pr-4' : 'md:mr-auto md:pl-4'}`}>
                                            <motion.div
                                                onClick={() => navigate(`/semester/${sem.id}`)}
                                                whileHover={{ y: -4 }}
                                                className={`timeline-card glass-card p-5 sm:p-6 rounded-2xl border bg-white/[0.01] backdrop-blur-md transition-all duration-300 cursor-pointer text-left ${
                                                    sem.isCurrent
                                                        ? 'border-sky-400/50 hover:border-sky-400/70 shadow-[0_0_24px_rgba(56, 189, 248,0.18)]'
                                                        : sem.isUpcoming
                                                        ? 'border-blue-500/15 border-dashed hover:border-blue-500/35'
                                                        : 'border-blue-500/15 hover:border-blue-500/30'
                                                }`}
                                            >
                                                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2 flex-wrap">
                                                    {sem.isUpcoming
                                                        ? <GraduationCap size={18} className="text-sky-300/60" />
                                                        : <BookOpen size={18} className="text-sky-400" />}
                                                    Semester {sem.id}: {sem.title}
                                                    {sem.isCurrent && (
                                                        <span className="text-[10px] font-semibold uppercase tracking-wide bg-gradient-to-r from-blue-500 to-blue-500 text-white px-2.5 py-1 rounded-full">
                                                            Current
                                                        </span>
                                                    )}
                                                    {sem.isUpcoming && (
                                                        <span className="text-[10px] font-semibold uppercase tracking-wide bg-white/10 text-sky-100/70 px-2.5 py-1 rounded-full flex items-center gap-1">
                                                            <Clock size={10} /> Upcoming
                                                        </span>
                                                    )}
                                                </h3>
                                                <div className="space-y-2 text-xs sm:text-sm text-sky-100/70">
                                                    <p className="flex items-center gap-2"><Calendar size={14} className="text-sky-400/60" /> <strong>Duration:</strong> {sem.duration}</p>
                                                    <p><strong>Key Subjects:</strong> {sem.subjects}</p>
                                                    <p className="flex items-start gap-1"><Code size={14} className="text-sky-400/60 mt-1 shrink-0" /> <span><strong>Projects:</strong> {sem.projectsSummary}</span></p>
                                                    <p className="border-t border-blue-500/10 pt-2 mt-2 italic text-sky-200/50"><Lightbulb size={12} className="inline mr-1 text-sky-400/80" /> {sem.note}</p>
                                                </div>
                                                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 hover:text-sky-200 transition-colors">
                                                    View Full Details <ArrowRight size={13} />
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </React.Fragment>
                    ))}

                </motion.div>
            </div>
        </section>
    );
};

export default Journey;
