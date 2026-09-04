import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Target, Heart, BookOpen, Briefcase, Layers, Sparkles, Code2, Compass } from 'lucide-react';
import ProfileAvatar from '../components/ProfileAvatar';
import AnimatedCounter from '../components/AnimatedCounter';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';
import { useExperience } from '../hooks/useExperience';
import { useEducation } from '../hooks/useEducation';
import { useStatistics } from '../hooks/useStatistics';
import { useAbout } from '../hooks/useAbout';

const About = () => {
    // Active Tab State for structured interactive info
    const [activeTab, setActiveTab] = useState('education');

    const experience = useExperience(experienceData);
    const education = useEducation(educationData);
    const stats = useStatistics({ years: '2.5', projects: '15', certificates: '10' });
    const about = useAbout({
        profileImage: undefined,
        careerObjective: "My immediate goal is a Software Engineering internship where I can apply what I've built so far — full-stack web apps, Flutter mobile apps, and DSA-driven systems — to a real codebase with real users. I'm looking for problems that force me to actually think, and engineers I can learn from.",
        currentFocus: "Right now I'm sharpening REST API design, cloud deployment with Firebase Hosting, and building design systems that stay consistent as an app grows past a handful of screens — the practical gaps a coursework-only education tends to leave.",
        futureGoals: "Longer term, I want to grow into a full-stack engineer who can own a feature end-to-end, from schema design through to a shipped UI, and eventually take on the kind of architectural and mentoring responsibility that comes with experience, not just a title.",
        interests: 'Outside of coursework, I like pulling apart new frameworks and AI tools to see what they\'re actually good for, tinkering with small Flutter and game side-projects, and reading through how other developers structure real production codebases instead of textbook examples.',
    });

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
                <div className="space-y-4">
                    {education.map((edu) => (
                        <div key={`${edu.degree}-${edu.institute}`}>
                            <h4 className="text-white font-semibold text-base sm:text-lg">{edu.degree}</h4>
                            <p className="text-sky-200/95 text-sm font-medium">{edu.institute}</p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {edu.description && (
                                    <span className="bg-blue-500/10 text-sky-300 text-xs px-3 py-1 rounded-full border border-blue-500/20">{edu.description}</span>
                                )}
                                {edu.duration && (
                                    <span className="bg-blue-500/10 text-sky-300 text-xs px-3 py-1 rounded-full border border-blue-500/20">{edu.duration}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )
        },
        objective: {
            icon: <Target className="text-sky-400" size={18} />,
            title: "Career Objective",
            content: (
                <p className="text-sky-100/70 text-sm leading-relaxed">
                    {about.careerObjective}
                </p>
            )
        },
        focus: {
            icon: <BookOpen className="text-sky-400" size={18} />,
            title: "Current Focus & Future",
            content: (
                <div className="space-y-3">
                    <p className="text-sky-100/70 text-sm">
                        {about.currentFocus}
                    </p>
                    <p className="text-sky-100/70 text-sm">
                        <strong>Future Goals:</strong> {about.futureGoals}
                    </p>
                </div>
            )
        },
        experience: {
            icon: <Briefcase className="text-sky-400" size={18} />,
            title: "Experience",
            content: (
                <div className="space-y-4">
                    {experience.map((exp) => (
                        <div key={`${exp.company}-${exp.position}`}>
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
                    {about.interests}
                </p>
            )
        }
    };

    const whyWorkWithMe = [
        { icon: Target, title: 'Problem-Solving Mindset', desc: 'I focus on understanding the actual problem before reaching for a framework — the tech choice comes second.' },
        { icon: Layers, title: 'Full-Stack Perspective', desc: 'Comfortable across frontend, backend, databases and mobile, so I can reason about how a change in one layer affects the others.' },
        { icon: Heart, title: 'User-Focused Development', desc: 'Responsive layouts and a smooth, practical experience matter to me as much as the code working correctly.' },
        { icon: Sparkles, title: 'Continuous Learning', desc: "I'm consistently exploring new tools, frameworks, and AI-assisted workflows rather than sticking to what I already know." },
        { icon: Code2, title: 'Clean, Maintainable Code', desc: 'I aim for reusable components and structure that someone else — or future me — can actually follow.' },
    ];

    const buildProcess = [
        { step: '01', title: 'Understand', desc: 'Understand the idea, the users, and the actual requirements before writing any code.' },
        { step: '02', title: 'Plan', desc: 'Define the architecture, pick the technology, and sketch out the implementation approach.' },
        { step: '03', title: 'Build', desc: 'Develop the product using reusable, maintainable components rather than one-off code.' },
        { step: '04', title: 'Test & Refine', desc: 'Test functionality, responsiveness and performance, then refine based on what actually breaks.' },
        { step: '05', title: 'Deploy & Improve', desc: 'Ship it, then keep improving based on how it holds up in real use.' },
    ];

    const headingChips = ['Full-stack development', 'Flutter & mobile development', 'AI-assisted workflows', 'Real-world software products', 'Challenging engineering problems', 'Continuous technical growth'];

    // Correct target stats (2.5 Years, 20 Projects, 10 Certificates)
    const statCards = [
        { value: stats.years, label: 'Years Experience', suffix: '+' },
        { value: stats.projects, label: 'Projects Completed', suffix: '+' },
        { value: stats.certificates, label: 'Certificates', suffix: '+' }
    ];

    return (
        <section id="about" className="about-section section-padding relative overflow-hidden py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <motion.h1
                    className="section-title text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    About Me
                </motion.h1>

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
                            <ProfileAvatar size="md" className="profile-img" src={about.profileImage} />
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
                            {statCards.map((stat) => (
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

                {/* WHY WORK WITH ME */}
                <motion.div
                    className="mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="section-title mb-10">Why Work With Me</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {whyWorkWithMe.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    className="group rounded-2xl border border-blue-500/15 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_10px_40px_rgba(56,189,248,0.15)]"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                >
                                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 text-sky-300 transition-colors duration-300 group-hover:text-sky-200">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="mb-1.5 text-sm font-semibold text-white">{item.title}</h3>
                                    <p className="text-xs leading-relaxed text-sky-100/60">{item.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* HOW I BUILD */}
                <motion.div
                    className="mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="section-title mb-10">How I Build</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {buildProcess.map((item, i) => (
                            <motion.div
                                key={item.step}
                                className="relative rounded-2xl border border-blue-500/15 bg-white/[0.02] p-5 backdrop-blur-sm"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                            >
                                <span className="mb-2 block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-2xl font-bold text-transparent">
                                    {item.step}
                                </span>
                                <h3 className="mb-1.5 text-sm font-semibold text-white">{item.title}</h3>
                                <p className="text-xs leading-relaxed text-sky-100/60">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* WHERE I'M HEADING + TECH PHILOSOPHY */}
                <motion.div
                    className="mt-20 glass-card rounded-3xl border border-blue-500/15 bg-white/[0.01] p-6 sm:p-8 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <Compass className="mx-auto mb-3 text-sky-400" size={22} />
                    <h2 className="mb-3 text-lg font-semibold text-white sm:text-xl">Where I'm Heading</h2>
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-sky-100/65">
                        I choose technology based on the problem, not because it's trending — the call comes down to requirements, performance, scalability, maintainability, and how fast I can ship something reliable. That approach is what I want to keep applying, on bigger problems, with more experienced people around me.
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                        {headingChips.map((chip) => (
                            <span key={chip} className="hero-meta-pill">{chip}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;