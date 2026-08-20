import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, BookOpen, GraduationCap, Clock, ExternalLink, Cpu, Sparkles, Trophy, Puzzle, Lightbulb } from 'lucide-react';
import { Github } from '../components/BrandIcons';
import ProjectBanner from '../components/ProjectBanner';
import { semesterData, getSemester } from '../data/semesters';
import { getProjectsForSemester } from '../data/projects';

const SemesterDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const semester = getSemester(id);
    const projects = semester ? getProjectsForSemester(semester.id) : [];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    if (!semester) {
        return (
            <section className="section-padding">
                <div className="container text-center">
                    <h2 className="section-title">Semester not found</h2>
                    <Link to="/journey" className="btn primary-btn inline-flex items-center gap-2 mt-6">
                        <ArrowLeft size={16} /> Back to Journey
                    </Link>
                </div>
            </section>
        );
    }

    const prevId = semester.id > 1 ? semester.id - 1 : null;
    const nextId = semester.id < semesterData.length ? semester.id + 1 : null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <section className="section-padding relative">
            <div className="container max-w-5xl mx-auto px-4">

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                    <Link to="/journey" className="inline-flex items-center gap-2 text-sm text-sky-200/70 hover:text-sky-200 mb-6 transition-colors">
                        <ArrowLeft size={15} /> Back to full journey
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <div className="flex justify-center mb-4">
                        {semester.isUpcoming ? (
                            <GraduationCap size={38} className="text-sky-300/60" />
                        ) : (
                            <BookOpen size={38} className="text-sky-400" />
                        )}
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Semester {semester.id}: {semester.title}
                    </h1>
                    <div className="flex items-center justify-center gap-2 flex-wrap mt-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-white/[0.03] px-4 py-1.5 text-sm text-sky-100/80">
                            <Calendar size={14} className="text-sky-400" /> {semester.duration}
                        </span>
                        {semester.isCurrent && (
                            <span className="text-xs font-semibold uppercase tracking-wide bg-gradient-to-r from-blue-500 to-blue-500 text-white px-3 py-1.5 rounded-full">
                                Current Semester
                            </span>
                        )}
                        {semester.isUpcoming && (
                            <span className="text-xs font-semibold uppercase tracking-wide bg-white/10 text-sky-100/70 px-3 py-1.5 rounded-full flex items-center gap-1">
                                <Clock size={12} /> Upcoming
                            </span>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card rounded-2xl border border-blue-500/15 p-6 sm:p-8 mb-14"
                >
                    <h2 className="text-lg font-semibold text-white mb-2">Key Subjects</h2>
                    <p className="text-sky-100/70 text-sm sm:text-base mb-6">{semester.subjects}</p>

                    <h2 className="text-lg font-semibold text-white mb-2">What I Built</h2>
                    <p className="text-sky-100/70 text-sm sm:text-base mb-6">{semester.projectsSummary}</p>

                    <p className="border-t border-blue-500/10 pt-4 italic text-sky-200/50 text-sm">
                        {semester.note}
                    </p>
                </motion.div>

                {(semester.technologies || semester.skillsGained || semester.achievements || semester.challenges) && (
                    <motion.div
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-10"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {semester.technologies && (
                            <motion.div variants={itemVariants} className="glass-card rounded-2xl border border-blue-500/15 p-6">
                                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
                                    <Cpu size={18} className="text-sky-400" /> Technologies Learned
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {semester.technologies.map((t) => (
                                        <span key={t} className="tech-badge">{t}</span>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {semester.skillsGained && (
                            <motion.div variants={itemVariants} className="glass-card rounded-2xl border border-blue-500/15 p-6">
                                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
                                    <Sparkles size={18} className="text-sky-400" /> Skills Gained
                                </h3>
                                <ul className="space-y-1.5 text-sm text-sky-100/70">
                                    {semester.skillsGained.map((s) => (
                                        <li key={s} className="flex gap-2"><span className="text-sky-400">•</span>{s}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {semester.achievements && (
                            <motion.div variants={itemVariants} className="glass-card rounded-2xl border border-blue-500/15 p-6">
                                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
                                    <Trophy size={18} className="text-sky-400" /> Achievements
                                </h3>
                                <ul className="space-y-1.5 text-sm text-sky-100/70">
                                    {semester.achievements.map((a) => (
                                        <li key={a} className="flex gap-2"><span className="text-sky-400">•</span>{a}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {semester.challenges && (
                            <motion.div variants={itemVariants} className="glass-card rounded-2xl border border-blue-500/15 p-6">
                                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
                                    <Puzzle size={18} className="text-sky-400" /> Challenges
                                </h3>
                                <p className="text-sm leading-relaxed text-sky-100/70">{semester.challenges}</p>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {semester.learningOutcomes && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        className="glass-card rounded-2xl border border-blue-500/15 p-6 sm:p-8 mb-14"
                    >
                        <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
                            <Lightbulb size={18} className="text-sky-400" /> Learning Outcomes
                        </h3>
                        <ul className="space-y-1.5 text-sm text-sky-100/70">
                            {semester.learningOutcomes.map((o) => (
                                <li key={o} className="flex gap-2"><span className="text-sky-400">•</span>{o}</li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {projects.length > 0 && (
                    <>
                        <motion.h2
                            className="section-title"
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Projects from this Semester
                        </motion.h2>

                        <motion.div
                            className="projects-grid"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {projects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    className={`project-card glass-card ${semester.isUpcoming ? 'upcoming-card' : ''}`}
                                    variants={itemVariants}
                                >
                                    <div className="relative">
                                        <ProjectBanner icon={project.icon} gradient={project.gradient} />
                                        {semester.isUpcoming && (
                                            <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-sm text-[11px] font-semibold text-sky-100 px-2.5 py-1 border border-white/10">
                                                <Clock size={11} /> In Progress
                                            </span>
                                        )}
                                    </div>
                                    <h3>{project.title}</h3>
                                    <p className="project-description">{project.description}</p>
                                    <p><strong>Technologies:</strong> {project.technologies}</p>
                                    {project.role && <p><strong>Role:</strong> {project.role}</p>}
                                    {project.features && <p><strong>Features:</strong> {project.features}</p>}
                                    {!semester.isUpcoming && (
                                        <div className="project-buttons">
                                            <motion.a
                                                href={project.github || 'https://github.com/mqasim91310'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn small-btn"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Github size={18} /> GitHub
                                            </motion.a>
                                            <motion.a
                                                href="#"
                                                className="btn small-btn"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <ExternalLink size={18} /> Details
                                            </motion.a>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                )}

                <div className="flex items-center justify-between mt-16 gap-4">
                    {prevId ? (
                        <motion.button
                            onClick={() => navigate(`/semester/${prevId}`)}
                            whileHover={{ scale: 1.03, x: -3 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white/[0.03] px-5 py-2.5 text-sm text-sky-100/80 hover:border-blue-500/50 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={16} /> Semester {prevId}
                        </motion.button>
                    ) : <div />}

                    {nextId ? (
                        <motion.button
                            onClick={() => navigate(`/semester/${nextId}`)}
                            whileHover={{ scale: 1.03, x: 3 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white/[0.03] px-5 py-2.5 text-sm text-sky-100/80 hover:border-blue-500/50 hover:text-white transition-colors ml-auto"
                        >
                            Semester {nextId} <ArrowRight size={16} />
                        </motion.button>
                    ) : <div />}
                </div>

            </div>
        </section>
    );
};

export default SemesterDetail;
