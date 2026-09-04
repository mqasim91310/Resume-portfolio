import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Clock } from 'lucide-react';
import { Github } from '../components/BrandIcons';
import ProjectBanner from '../components/ProjectBanner';
import TiltCard from '../components/TiltCard';
import { projectData, upcomingProjects } from '../data/projects';
import { useProjects } from '../hooks/useProjects';

const filters = ['all', 'web', 'flutter', 'cpp', 'java', 'game', 'dsa', 'database', 'os', 'assembly', 'hardware', 'design', 'university'];

const ProjectCard = ({ project }) => {
    const [expanded, setExpanded] = useState(false);
    const techs = project.technologies.split(',').map((t) => t.trim());
    const liveHref = project.demo || project.github || 'https://github.com/mqasim91310';

    return (
        <TiltCard className={`project-card glass-card ${project.featured ? 'featured-project' : ''}`}>
            <div className="project-card-visual">
                <ProjectBanner icon={project.icon} gradient={project.gradient} featured={project.featured} image={project.image} title={project.title} />
                <div className="project-card-overlay" />
                <div className="project-card-chip-row">
                    <span className="project-card-chip">{project.featured ? 'Featured' : 'Case Study'}</span>
                    {project.semester && <span className="project-card-chip subtle">Sem {project.semester}</span>}
                </div>
            </div>

            <div className="project-card-body">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="tech-badge-row">
                    {techs.map((t) => (
                        <span key={t} className="tech-badge">{t}</span>
                    ))}
                </div>

                {(() => {
                    const hasCaseStudy = Boolean(
                        project.problem || project.solution || project.techHighlights ||
                        project.contribution || project.challenges || project.outcome
                    );
                    const featureList = project.features
                        ? project.features.split(',').map((f) => f.trim()).filter(Boolean)
                        : [];

                    if (!project.role && featureList.length === 0 && !hasCaseStudy) return null;

                    return (
                        <>
                            <button
                                type="button"
                                className="project-details-toggle"
                                aria-expanded={expanded}
                                onClick={() => setExpanded((v) => !v)}
                            >
                                {expanded ? 'Hide details' : hasCaseStudy ? 'View full case study' : 'Role & key features'} <ChevronDown size={14} />
                            </button>

                            <AnimatePresence initial={false}>
                                {expanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        className="overflow-hidden text-left"
                                    >
                                        <div className="space-y-2.5">
                                            {project.role && <p><strong>Role:</strong> {project.role}</p>}
                                            {featureList.length > 0 && (
                                                <>
                                                    <p className="!mb-1"><strong>Key features:</strong></p>
                                                    <ul className="!mb-2.5 space-y-1 px-5 text-[0.9em] list-disc marker:text-sky-400/70">
                                                        {featureList.map((f) => (
                                                            <li key={f}>{f}</li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}
                                            {project.problem && <p><strong>The problem:</strong> {project.problem}</p>}
                                            {project.solution && <p><strong>The approach:</strong> {project.solution}</p>}
                                            {project.techHighlights && <p><strong>Technical highlights:</strong> {project.techHighlights}</p>}
                                            {project.contribution && <p><strong>My contribution:</strong> {project.contribution}</p>}
                                            {project.challenges && <p><strong>Challenges:</strong> {project.challenges}</p>}
                                            {project.outcome && <p><strong>Outcome:</strong> {project.outcome}</p>}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    );
                })()}

                <div className="project-buttons">
                    <motion.a
                        href={project.github || 'https://github.com/mqasim91310'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card-link"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <Github size={16} /> GitHub
                    </motion.a>
                    <motion.a
                        href={liveHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card-link secondary"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <ArrowRight size={16} /> Live Demo
                    </motion.a>
                </div>
            </div>
        </TiltCard>
    );
};

const Projects = () => {
    const [filter, setFilter] = useState('all');
    const projects = useProjects(projectData);

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => (project.category || '').includes(filter));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, rotate: -2 },
        visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <section id="projects" className="projects-section section-padding">
            <div className="container">
                <motion.h1
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Featured Projects
                </motion.h1>
                <p className="text-center text-sky-100/60 text-sm -mt-6 mb-8 max-w-xl mx-auto">
                    {projects.length}+ projects spanning C++, Java, mobile, web, hardware and design.
                </p>

                <div className="project-filters">
                    {filters.map(cat => (
                        <motion.button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </motion.button>
                    ))}
                </div>

                <motion.div
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {filteredProjects.map((project) => (
                        <motion.div key={project._id || project.title} variants={itemVariants}>
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* UPCOMING PROJECTS */}
                <motion.h2
                    className="section-title mt-20"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Upcoming Projects
                </motion.h2>
                <p className="text-center text-sky-100/60 text-sm -mt-6 mb-8 max-w-xl mx-auto">
                    What I'm building next, currently in progress or planned.
                </p>

                <motion.div
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {upcomingProjects.map((project, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <TiltCard className="project-card glass-card upcoming-card">
                                <div className="project-card-visual">
                                    <ProjectBanner icon={project.icon} gradient={project.gradient} title={project.title} />
                                    <div className="project-card-overlay" />
                                    <div className="project-card-chip-row">
                                        <span className="project-card-chip subtle">
                                            <Clock size={11} /> In Progress
                                        </span>
                                    </div>
                                </div>
                                <div className="project-card-body">
                                    <h3>{project.title}</h3>
                                    <p className="project-description">{project.description}</p>
                                    <p className="pb-5"><strong>Planned Stack:</strong> {project.technologies}</p>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
