import React from 'react';
import { motion } from 'framer-motion';
import {
    SiFlutter,
    SiFirebase,
    SiGit,
    SiGithub,
    SiAndroidstudio,
    SiHtml5,
    SiCss,
    SiJavascript,
    SiReact,
    SiNodedotjs,
    SiPython,
    SiOpenjdk,
    SiCplusplus,
    SiMysql,
    SiPostgresql,
    SiUnity
} from 'react-icons/si'; // Using react-icons for tech stack icons
import { VscVscode } from 'react-icons/vsc';

const TechStack = () => {
    const techData = [
        { icon: <SiOpenjdk />, name: 'Java' },
        { icon: <SiCplusplus />, name: 'C++' },
        { icon: <SiHtml5 />, name: 'HTML5' },
        { icon: <SiCss />, name: 'CSS3' },
        { icon: <SiJavascript />, name: 'JavaScript' },
        { icon: <SiReact />, name: 'React.js' },
        { icon: <SiNodedotjs />, name: 'Node.js' },
        { icon: <SiPython />, name: 'Python' },
        { icon: <SiFlutter />, name: 'Flutter' },
        { icon: <SiUnity />, name: 'Unity Engine' },
        { icon: <SiMysql />, name: 'MySQL' },
        { icon: <SiPostgresql />, name: 'PostgreSQL' },
        { icon: <SiFirebase />, name: 'Firebase' },
        { icon: <SiGit />, name: 'Git' },
        { icon: <SiGithub />, name: 'GitHub' },
        { icon: <VscVscode />, name: 'VS Code' },
        { icon: <SiAndroidstudio />, name: 'Android Studio' },
        { icon: null, name: 'Assembly Language (x86/8086)' }, // No direct icon, add as text
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
    };

    return (
        <section id="tech-stack" className="tech-stack-section section-padding">
            <div className="container">
                <motion.h1 
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    My Tech Stack
                </motion.h1>
                <motion.div 
                    className="tech-stack-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {techData.map((tech, index) => (
                        <motion.div
                            key={index}
                            className="tech-card glass-card"
                            variants={itemVariants}
                            style={{ perspective: 600 }}
                            whileHover={{ scale: 1.12, rotateY: 12, rotateX: -6, boxShadow: "0 12px 40px rgba(56, 189, 248, 0.45)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="tech-icon">{tech.icon || tech.name}</div>
                            <span>{tech.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TechStack;
