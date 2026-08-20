import React from 'react';
import { motion } from 'framer-motion';
import ProjectBanner from '../ProjectBanner';
import TiltCard from '../TiltCard';
import SectionCta from './SectionCta';
import { projectData } from '../../data/projects';

const featured = projectData.filter((p) => p.featured).slice(0, 3);

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProjectsPreview = () => (
    <section id="projects" className="section-padding relative">
        <div className="container">
            <motion.h2
                className="section-title text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Featured Projects
            </motion.h2>
            <p className="mx-auto -mt-6 mb-10 max-w-xl text-center text-sm text-sky-100/60">
                A snapshot of {projectData.length}+ builds spanning web, mobile, and systems programming.
            </p>

            <motion.div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.12 }}
            >
                {featured.map((project) => (
                    <motion.div key={project.title} variants={itemVariants}>
                        <TiltCard className="project-card glass-card featured-project h-full">
                            <div className="project-card-visual">
                                <ProjectBanner icon={project.icon} gradient={project.gradient} featured />
                            </div>
                            <div className="project-card-body">
                                <h3>{project.title}</h3>
                                <p className="project-description line-clamp-3">{project.description}</p>
                                <div className="tech-badge-row">
                                    {project.technologies
                                        .split(',')
                                        .slice(0, 3)
                                        .map((t) => (
                                            <span key={t} className="tech-badge">{t.trim()}</span>
                                        ))}
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>
                ))}
            </motion.div>

            <SectionCta to="/projects" label="View All Projects" />
        </div>
    </section>
);

export default ProjectsPreview;
