import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { skillsData as staticSkillsData, categoryIcons, categoryDescriptions, skillsIntro } from '../data/skills';
import { useSkills } from '../hooks/useSkills';

const Skills = () => {
    const skillsData = useSkills(staticSkillsData);

    const skillCategoryVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    const skillItemVariants = {
        hidden: { width: 0 },
        visible: { width: 'var(--skill-width)', transition: { duration: 1.5, ease: 'easeOut' } }
    };

    return (
        <section id="skills" className="skills-section section-padding">
            <div className="container">
                <motion.h1 
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    My Skills
                </motion.h1>
                <motion.p
                    className="skills-intro"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {skillsIntro}
                </motion.p>
                <div className="skills-grid">
                    {skillsData.map((skillCat) => {
                        const Icon = categoryIcons[skillCat.category] || Code2;
                        return (
                            <motion.div
                                key={skillCat.category}
                                className="skill-category glass-card"
                                variants={skillCategoryVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(56, 189, 248, 0.3)" }}
                            >
                                <div className="skill-category-header">
                                    <span className="skill-category-icon">
                                        <Icon size={20} />
                                    </span>
                                    <h3>{skillCat.category}</h3>
                                </div>
                                {categoryDescriptions[skillCat.category] && (
                                    <p className="skill-category-description">
                                        {categoryDescriptions[skillCat.category]}
                                    </p>
                                )}
                                {skillCat.items.map((skill) => (
                                    <div key={skill.name} className="skill-item">
                                        <span>{skill.name}</span>
                                        <div className="progress-bar">
                                            <motion.div
                                                className="progress-fill"
                                                style={{ '--skill-width': skill.level }}
                                                variants={skillItemVariants}
                                                transition={{ duration: 1.3, ease: 'easeOut', delay: 0.1 }}
                                            ></motion.div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
