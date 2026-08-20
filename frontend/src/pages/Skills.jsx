import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Smartphone, Gamepad2, Database, GitBranch, GraduationCap } from 'lucide-react';

const categoryIcons = {
    'Programming Languages': Code2,
    'Web Development': Globe,
    'Mobile Development': Smartphone,
    'Game Development': Gamepad2,
    'Databases': Database,
    'Tools & Version Control': GitBranch,
    'Relevant Coursework': GraduationCap,
};

const Skills = () => {
    const skillCategoryVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    const skillItemVariants = {
        hidden: { width: 0 },
        visible: { width: 'var(--skill-width)', transition: { duration: 1.5, ease: 'easeOut' } }
    };

    const skillsData = [
        {
            category: 'Programming Languages',
            items: [
                { name: 'Java', level: '85%' },
                { name: 'C++', level: '80%' },
                { name: 'Assembly Language (x86/8086)', level: '70%' },
                { name: 'C# (Unity)', level: '75%' },
                { name: 'Dart', level: '80%' },
            ]
        },
        {
            category: 'Web Development',
            items: [
                { name: 'HTML5', level: '90%' },
                { name: 'CSS3', level: '85%' },
                { name: 'JavaScript', level: '80%' },
                { name: 'React.js', level: '70%' },
                { name: 'Node.js', level: '65%' },
            ]
        },
        {
            category: 'Mobile Development',
            items: [
                { name: 'Flutter', level: '90%' },
            ]
        },
        {
            category: 'Game Development',
            items: [
                { name: 'Unity Engine', level: '75%' },
            ]
        },
        {
            category: 'Databases',
            items: [
                { name: 'MySQL', level: '80%' },
                { name: 'PostgreSQL', level: '60%' },
                { name: 'Firebase', level: '75%' },
            ]
        },
        {
            category: 'Tools & Version Control',
            items: [
                { name: 'Git', level: '90%' },
                { name: 'GitHub', level: '85%' },
            ]
        },
        {
            category: 'Relevant Coursework',
            items: [
                { name: 'Data Structures & Algorithms', level: '90%' },
                { name: 'Object-Oriented Programming', level: '85%' },
                { name: 'Database Systems', level: '80%' },
                { name: 'Software Engineering', level: '80%' },
                { name: 'Computer Organization & Assembly Language', level: '75%' },
                { name: 'Discrete Mathematics', level: '70%' },
            ]
        },
    ];

    return (
        <section id="skills" className="skills-section section-padding">
            <div className="container">
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    My Skills
                </motion.h2>
                <div className="skills-grid">
                    {skillsData.map((skillCat, index) => {
                        const Icon = categoryIcons[skillCat.category] || Code2;
                        return (
                            <motion.div
                                key={index}
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
                                {skillCat.items.map((skill, idx) => (
                                    <div key={idx} className="skill-item">
                                        <span>{skill.name}</span>
                                        <div className="progress-bar">
                                            <motion.div
                                                className="progress-fill"
                                                style={{ '--skill-width': skill.level }}
                                                variants={skillItemVariants}
                                                transition={{ duration: 1.3, ease: 'easeOut', delay: idx * 0.12 }}
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
