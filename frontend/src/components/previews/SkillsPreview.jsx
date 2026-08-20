import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Globe, Smartphone, Gamepad2, Database, GitBranch, GraduationCap, ArrowRight } from 'lucide-react';
import SectionCta from './SectionCta';

const categories = [
    { icon: Code2, name: 'Programming Languages' },
    { icon: Globe, name: 'Web Development' },
    { icon: Smartphone, name: 'Mobile Development' },
    { icon: Gamepad2, name: 'Game Development' },
    { icon: Database, name: 'Databases' },
    { icon: GitBranch, name: 'Tools & Version Control' },
    { icon: GraduationCap, name: 'Relevant Coursework' },
];

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const SkillsPreview = () => (
    <section id="skills" className="section-padding relative">
        <div className="container">
            <motion.h2
                className="section-title text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Skills &amp; Expertise
            </motion.h2>
            <p className="mx-auto -mt-6 mb-10 max-w-xl text-center text-sm text-sky-100/60">
                Seven core skill areas, from low-level programming to modern web &amp; mobile stacks.
            </p>

            <motion.div
                className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.08 }}
            >
                {categories.map(({ icon: Icon, name }) => (
                    <motion.div
                        key={name}
                        variants={itemVariants}
                        whileHover={{ y: -4, scale: 1.03 }}
                        className="flex min-w-[140px] flex-shrink-0 flex-col items-center gap-3 rounded-2xl border border-blue-500/15 bg-white/[0.03] p-5 text-center backdrop-blur-sm transition-colors duration-300 hover:border-blue-500/40"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 text-sky-300">
                            <Icon size={22} />
                        </div>
                        <span className="text-xs font-medium text-sky-100/80 sm:text-sm">{name}</span>
                    </motion.div>
                ))}
            </motion.div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
                <SectionCta to="/skills" label="View All Skills" className="flex justify-center" />
                <Link
                    to="/tech-stack"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-sky-300/70 transition-colors hover:text-white cursor-hover"
                >
                    Explore the full tech stack
                    <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    </section>
);

export default SkillsPreview;
