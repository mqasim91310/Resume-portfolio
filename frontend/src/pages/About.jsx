import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Target, Heart, BookOpen, Briefcase } from 'lucide-react';
import ProfileAvatar from '../components/ProfileAvatar';
import AnimatedCounter from '../components/AnimatedCounter';
import { experienceData } from '../data/experience';

const About = () => {
    // Active Tab State for structured interactive info
    const [activeTab, setActiveTab] = useState('education');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const tabData = {
        education: {
            icon: <GraduationCap className="text-sky-400" size={18} />,
            title: "Education",
            content: (
                <div className="space-y-2">
                    <h4 className="text-white font-semibold text-base sm:text-lg">Bachelor of Science in Computer Science (BSCS)</h4>
                    <p className="text-sky-200/95 text-sm font-medium">Riphah International University, Lahore, Pakistan</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        <span className="bg-blue-500/10 text-sky-300 text-xs px-3 py-1 rounded-full border border-blue-500/20">6th Semester</span>
                        <span className="bg-blue-500/10 text-sky-300 text-xs px-3 py-1 rounded-full border border-blue-500/20">Expected Graduation: Fall 2027</span>
                    </div>
                </div>
            )
        },
        objective: {
            icon: <Target className="text-sky-400" size={18} />,
            title: "Career Objective",
            content: (
                <p className="text-sky-100/70 text-sm leading-relaxed">
                    My goal is to leverage my expertise in Flutter and full-stack development to build scalable, user-centric applications that solve real-world problems. I am constantly seeking opportunities to learn and grow within a dynamic tech environment.
                </p>
            )
        },
        focus: {
            icon: <BookOpen className="text-sky-400" size={18} />,
            title: "Current Focus & Future",
            content: (
                <div className="space-y-3">
                    <p className="text-sky-100/70 text-sm">
                        Currently exploring REST API design, cloud deployment (Firebase Hosting), and responsive design systems.
                    </p>
                    <p className="text-sky-100/70 text-sm">
                        <strong>Future Goals:</strong> I aspire to become a lead software architect, guiding teams in developing cutting-edge solutions and mentoring junior developers to foster a collaborative and innovative work culture.
                    </p>
                </div>
            )
        },
        experience: {
            icon: <Briefcase className="text-sky-400" size={18} />,
            title: "Experience",
            content: (
                <div className="space-y-4">
                    {experienceData.map((exp) => (
                        <div key={exp.company}>
                            <h4 className="text-white font-semibold text-base sm:text-lg">{exp.position}</h4>
                            <p className="text-sky-200/95 text-sm font-medium">{exp.company} &middot; {exp.mode}</p>
                            <p className="text-sky-100/50 text-xs mt-1">{exp.duration}</p>
                            <p className="text-sky-100/70 text-sm leading-relaxed mt-2">{exp.description}</p>
                        </div>
                    ))}
                </div>
            )
        },
        interests: {
            icon: <Heart className="text-sky-400" size={18} />,
            title: "Interests",
            content: (
                <p className="text-sky-100/70 text-sm leading-relaxed">
                    Beyond coding, I enjoy exploring new technologies, contributing to open-source projects, and participating in hackathons. I believe in continuous learning and staying updated with the latest industry trends.
                </p>
            )
        }
    };

    // Correct target stats (2.5 Years, 20 Projects, 10 Certificates)
    const stats = [
        { value: '2.5', label: 'Years Experience', suffix: '+' },
        { value: '15', label: 'Projects Completed', suffix: '+' },
        { value: '10', label: 'Certificates', suffix: '+' }
    ];

    return (
        <section id="about" className="about-section section-padding relative overflow-hidden py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="section-title text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    About Me
                </motion.h2>

                <motion.div
                    className="about-content grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* LEFT COLUMN: Floating Profile Card */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-4 flex flex-col items-center sticky top-24"
                    >
                        <motion.div
                            className="about-image relative mb-6"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            whileHover={{ scale: 1.04, rotate: -1 }}
                        >
                            <div className="absolute inset-0 -z-10 rounded-3xl bg-blue-500/10 blur-2xl" />
                            <ProfileAvatar size="md" className="profile-img" />
                        </motion.div>
                    </motion.div>

                    {/* RIGHT COLUMN: Scannable Blocks & Dynamic Tabs */}
                    <motion.div
                        variants={itemVariants}
                        className="about-text glass-card lg:col-span-8 p-6 sm:p-8 rounded-3xl border border-blue-500/15 bg-white/[0.01] backdrop-blur-md"
                    >
                        {/* DIVIDED BLOCKS: About Us Content split into clean structural segments */}
                        <div className="space-y-6 mb-8 text-sky-100/80 text-sm sm:text-base leading-relaxed">
                            {/* Block 1: Intro */}
                            <div className="border-l-2 border-blue-500/30 pl-4 py-1">
                                <p className="font-semibold text-white text-base sm:text-lg mb-1">Who I Am</p>
                                <p>
                                    Motivated <strong>BS Computer Science student</strong> at Riphah International University (6th Semester).
                                    I am a passionate developer with hands-on experience building full-stack web applications, mobile apps, DSA-driven C++ systems, and interactive games.
                                </p>
                            </div>

                            {/* Block 2: Tech Skills */}
                            <div className="border-l-2 border-blue-500/30 pl-4 py-1">
                                <p className="font-semibold text-white text-base sm:text-lg mb-1">Technical Expertise</p>
                                <p>
                                    Proficient in modern languages and frameworks including <strong>Java, C++, Assembly Language (x86/8086)</strong>,
                                    and cross-platform development using <strong>Flutter</strong>. I combine strong low-level programming fundamentals with high-level software engineering skills.
                                </p>
                            </div>

                            {/* Block 3: Purpose / Internship */}
                            <div className="border-l-2 border-blue-500/30 pl-4 py-1">
                                <p className="font-semibold text-white text-base sm:text-lg mb-1">What I am Seeking</p>
                                <p>
                                    Actively looking for a <strong>Software Engineering internship</strong> to bring academic theory into real-world production environments, adding value to dynamic engineering teams.
                                </p>
                            </div>
                        </div>

                        {/* Interactive Tab Navigation */}
                        <div className="flex flex-wrap gap-2 mb-6 border-b border-blue-500/10 pb-4">
                            {Object.keys(tabData).map((tabKey) => (
                                <button
                                    key={tabKey}
                                    onClick={() => setActiveTab(tabKey)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${activeTab === tabKey
                                            ? 'bg-blue-500/20 text-white border border-blue-500/40 shadow-[0_0_15px_rgba(56, 189, 248,0.15)]'
                                            : 'bg-transparent text-sky-200/60 hover:text-white hover:bg-white/5 border border-transparent'
                                        }`}
                                >
                                    {tabData[tabKey].icon}
                                    {tabData[tabKey].title}
                                </button>
                            ))}
                        </div>

                        {/* Animated Tab Content Box */}
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="min-h-[110px] bg-white/[0.01] border border-blue-500/5 rounded-2xl p-5 mb-8"
                        >
                            {tabData[activeTab].content}
                        </motion.div>

                        {/* Dynamic Counters Grid */}
                        <div className="info-cards grid grid-cols-3 gap-3 sm:gap-4">
                            {stats.map((stat) => (
                                <motion.div
                                    key={stat.label}
                                    variants={itemVariants}
                                    className="info-card rounded-2xl border border-blue-500/10 bg-white/[0.02] p-3 sm:p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/[0.03]"
                                    whileHover={{ scale: 1.05, y: -4 }}
                                >
                                    <h3 className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-xl sm:text-3xl font-bold text-transparent">
                                        <AnimatedCounter to={stat.value} suffix={stat.suffix} duration={1.8} />
                                    </h3>
                                    <p className="text-[9px] sm:text-xs text-sky-100/60 mt-1 uppercase tracking-wider">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;