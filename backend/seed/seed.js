require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const logger = require('../utils/logger');

const Admin = require('../models/Admin');
const About = require('../models/About');
const Skill = require('../models/Skill');
const Education = require('../models/Education');
const Experience = require('../models/Experience');
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const Service = require('../models/Service');
const Statistics = require('../models/Statistics');

const aboutData = {
    name: 'Muhammad Qasim',
    designation: 'Computer Science Student & Flutter Developer',
    biography:
        'Motivated BS Computer Science student at Riphah International University (6th Semester) with hands-on ' +
        'experience building full-stack web applications, mobile apps, DSA-driven C++ systems, and interactive games. ' +
        'Proficient in Java, C++, Assembly Language (x86/8086), and cross-platform development using Flutter. ' +
        'Actively seeking a Software Engineering internship to apply academic knowledge in a real-world environment.',
    socialLinks: {
        github: 'https://github.com/mqasim91310',
        linkedin: 'https://www.linkedin.com/in/muhammad-qasim-6725242a7',
        email: 'mqasim91310@gmail.com',
        twitter: '',
    },
};

const skillsData = [
    { name: 'Java', percentage: 85, category: 'Programming Languages', order: 1 },
    { name: 'C++', percentage: 80, category: 'Programming Languages', order: 2 },
    { name: 'Assembly Language (x86/8086)', percentage: 70, category: 'Programming Languages', order: 3 },
    { name: 'C# (Unity)', percentage: 75, category: 'Programming Languages', order: 4 },
    { name: 'Dart', percentage: 80, category: 'Programming Languages', order: 5 },
    { name: 'HTML5', percentage: 90, category: 'Web Development', order: 6 },
    { name: 'CSS3', percentage: 85, category: 'Web Development', order: 7 },
    { name: 'JavaScript', percentage: 80, category: 'Web Development', order: 8 },
    { name: 'React.js', percentage: 70, category: 'Web Development', order: 9 },
    { name: 'Node.js', percentage: 65, category: 'Web Development', order: 10 },
    { name: 'Flutter', percentage: 90, category: 'Mobile Development', order: 11 },
    { name: 'Unity Engine', percentage: 75, category: 'Game Development', order: 12 },
    { name: 'MySQL', percentage: 80, category: 'Databases', order: 13 },
    { name: 'PostgreSQL', percentage: 60, category: 'Databases', order: 14 },
    { name: 'Firebase', percentage: 75, category: 'Databases', order: 15 },
    { name: 'Git', percentage: 90, category: 'Tools & Version Control', order: 16 },
    { name: 'GitHub', percentage: 85, category: 'Tools & Version Control', order: 17 },
    { name: 'Data Structures & Algorithms', percentage: 90, category: 'Relevant Coursework', order: 18 },
    { name: 'Object-Oriented Programming', percentage: 85, category: 'Relevant Coursework', order: 19 },
    { name: 'Database Systems', percentage: 80, category: 'Relevant Coursework', order: 20 },
    { name: 'Software Engineering', percentage: 80, category: 'Relevant Coursework', order: 21 },
    { name: 'Computer Organization & Assembly Language', percentage: 75, category: 'Relevant Coursework', order: 22 },
    { name: 'Discrete Mathematics', percentage: 70, category: 'Relevant Coursework', order: 23 },
];

const educationData = [
    {
        degree: 'Bachelor of Science in Computer Science (BSCS)',
        institute: 'Riphah International University, Lahore, Pakistan',
        duration: 'Spring 2024 - Fall 2027 (Expected)',
        description: 'Currently in 6th Semester. Coursework includes Data Structures & Algorithms, OOP, Database Systems, Software Engineering, Computer Organization & Assembly Language, and Discrete Mathematics.',
        order: 1,
    },
];

const experienceData = [
    {
        company: 'Decode Labs',
        position: 'Frontend Development Intern',
        department: 'Frontend Development',
        duration: '15 May 2026 - 15 June 2026',
        mode: 'Remote / Virtual',
        description: 'Learning-focused internship working on assigned projects, completing milestones, and participating in mentor-led sessions to gain hands-on industry experience.',
        order: 1,
    },
];

const projectsData = [
    { title: 'Airline Reservation System', description: 'Console-based airline booking system applying core OOP principles to model flights, seats, and passenger records.', technologies: 'C++ (OOP)', role: 'Software Developer', features: 'Class-based flight & passenger modeling, seat booking and cancellation, encapsulated data handling.', category: 'cpp', semester: 1, featured: false },
    { title: 'Restaurant Management System (OOP Edition)', description: 'Console-based restaurant system applying encapsulation, inheritance, and polymorphism.', technologies: 'Java (OOP)', role: 'Software Developer', features: 'OOP class hierarchy, order management workflow, bill generation.', category: 'java', semester: 1, featured: false },
    { title: '4-bit Digital Password Lock System', description: 'Digital logic circuit verifying a 4-bit password using logic gates, no microcontroller involved.', technologies: 'Digital Logic Design', role: 'Digital Logic Designer', features: 'Pure combinational/sequential logic gate design, truth-table driven verification.', category: 'hardware', semester: 2, featured: false },
    { title: 'Restaurant Management System (DSA Edition)', description: 'Rebuilt restaurant system in C++ applying core data structures.', technologies: 'C++, DSA', role: 'Software Developer', features: 'Linked-list based order queues, structured inventory tracking.', category: 'cpp', semester: 3, featured: false },
    { title: 'Hotel Management System', description: 'Full-featured hotel system in C++ implementing check-in, check-out, room booking, and billing.', technologies: 'C++, DSA (Trees, Hash Maps, File I/O)', role: 'Software Developer', features: 'Hash map for O(1) room lookup, persistent file I/O, dynamic billing engine.', category: 'cpp', semester: 3, featured: true },
    { title: 'Student Marks & Result System', description: 'Low-level Assembly program calculating and displaying student marks and results.', technologies: 'x86/8086 Assembly Language', role: 'Low-level Programmer', features: 'Register-level arithmetic, DOS interrupt-driven I/O.', category: 'assembly', semester: 3, featured: false },
    { title: 'Movie Ticket Booking System', description: 'Relational database-backed system for browsing showtimes and booking tickets.', technologies: 'MySQL', role: 'Database Developer', features: 'Normalized relational schema, seat availability tracking.', category: 'database', semester: 3, featured: false },
    { title: 'Al Kabir Developers — Real Estate Web Application', description: 'Full-stack real estate replica web app with live listings, registration, and an admin dashboard.', technologies: 'React.js, Node.js, MySQL', role: 'Full-stack Developer', features: 'Live listings, admin dashboard, multi-filter search, ~25% improved query efficiency.', category: 'web', semester: 4, featured: true, githubLink: 'https://github.com/mqasim91310' },
    { title: 'Internal Hotel Management System', description: 'SDLC-driven hotel management system with requirements, design, implementation and testing phases.', technologies: 'Software Engineering Practices, SDLC', role: 'Software Engineer', features: 'Use-case modeling, structured SDLC workflow, staff-facing booking modules.', category: 'software-engineering', semester: 4, featured: false },
    { title: 'IR Sensor Water Level Indicator Game', description: 'Hardware game where an IR sensor raises a water level in a cup toward a target level to win.', technologies: 'Computer Architecture, IR Sensor', role: 'Embedded Systems Developer', features: 'IR proximity sensing, real-time water-level simulation, target-based win condition.', category: 'hardware', semester: 4, featured: false },
    { title: 'Khidmat — Hostel Services App (UI/UX Design)', description: 'Foodpanda-style ordering concept designed for hostel students, teachers, and employees.', technologies: 'Figma, HCI & Computer Graphics', role: 'UI/UX Designer', features: 'Full user-flow prototyping, role-based flows for students/teachers/employees.', category: 'design', semester: 5, featured: false },
    { title: 'Brew & Bless Coffee Shop — Mobile Application', description: 'Cross-platform Flutter app for browsing menu, customizing orders, and purchasing.', technologies: 'Flutter, Dart, Firebase', role: 'Mobile App Developer', features: 'Firebase Firestore integration, custom widgets, secure Firebase Auth.', category: 'flutter', semester: 5, featured: true, githubLink: 'https://github.com/mqasim91310' },
    { title: 'DeenEase — Complete Quran & Islamic Companion App', description: 'Complete Islamic lifestyle app bringing Quran reading and deen tools into one place.', technologies: 'Flutter, Dart', role: 'Mobile App Developer', features: 'Full Quran reading module, offline-friendly design.', category: 'flutter', semester: 5, featured: false },
    { title: 'Street Rush — Endless Runner Mobile Game', description: 'Complete endless-runner game built in Unity with procedural obstacle generation and scoring.', technologies: 'Unity Engine, C#', role: 'Game Developer', features: 'Object-pooled rendering for stable 60 FPS, persistent high-score system.', category: 'game', semester: 5, featured: true, githubLink: 'https://github.com/mqasim91310' },
    { title: 'OS Kernel Simulation with CPU Scheduling', description: 'Operating Systems simulation modeling kernel-level process scheduling.', technologies: 'JavaFX, Java', role: 'Systems Programmer', features: 'FCFS, SJF, and Round Robin scheduling algorithms with a visual GUI.', category: 'os', semester: 5, featured: false },
    { title: 'Khidmat — Full Application Development', description: 'Taking Khidmat from Figma design into a fully functional hostel-services ordering platform.', technologies: 'Flutter / React, Node.js, Firebase or MySQL', category: 'design', semester: 7, featured: false, status: 'upcoming' },
    { title: 'LMS — Home Tutor & Parent Platform', description: 'Complete LMS connecting parents with highly-rated home tutors, with a shared progress portal.', technologies: 'React/Flutter, Node.js, MySQL/Firebase', category: 'web', semester: 8, featured: false, status: 'upcoming' },
];

const certificatesData = [
    { title: 'C++ Essentials 2', organization: 'Cisco Networking Academy · Riphah International University', instructor: 'Dua Mahmood', issueDate: new Date('2025-05-15') },
    { title: "ChatGPT Masterclass: The Ultimate Beginner's Guide!", organization: 'Udemy', instructor: 'Chetan Pujari', issueDate: new Date('2025-12-04'), length: '4 total hours', link: 'https://ude.my/UC-51fb0d9d-abc6-41d2-85ba-3b250d90d90d' },
    { title: 'Get Started with SQL Analytics and BI on Databricks', organization: 'Databricks', issueDate: new Date('2025-12-27'), certificateCode: '9644216' },
    { title: 'Master Data Analysis and EDA for Machine Learning Projects', organization: 'Udemy', instructor: 'Faisal Zamir', issueDate: new Date('2025-12-27'), length: '44 total mins', link: 'https://ude.my/UC-3e6aec7b-d8ad-40f3-be7d-441a50f0b725' },
    { title: 'Excel Automation using ChatGPT', organization: 'Verified Certificate', issueDate: new Date('2025-12-27'), certificateCode: '9646600' },
    { title: 'Ethically Hack the Planet', organization: 'Udemy', instructor: 'Cyber Twinkle, Zeronyte Security', issueDate: new Date('2026-01-02'), length: '1 total hour', link: 'https://ude.my/UC-f40aed7e-8832-412c-b8d2-f799e7d6b870' },
    { title: 'Ethically Hack the Planet Part 2', organization: 'Udemy', instructor: 'Cyber Twinkle, Zeronyte Security', issueDate: new Date('2026-01-03'), length: '34 total mins', link: 'https://ude.my/UC-9125e5a1-50d0-4d1d-9dd4-abcbe460d7ae' },
    { title: 'JavaScript Essentials 1', organization: 'Cisco Networking Academy · Riphah International University', instructor: 'Dua Mahmood', issueDate: new Date('2026-01-25') },
    { title: 'JavaScript Essentials 2', organization: 'Cisco Networking Academy · Riphah International University', instructor: 'Dua Mahmood', issueDate: new Date('2026-01-27') },
    { title: 'Operating Systems Basics', organization: 'Cisco Networking Academy · Riphah International University', instructor: 'Ramisha Farrukh', issueDate: new Date('2026-06-01') },
];

const servicesData = [
    { title: 'Flutter Development', description: 'Building high-performance, cross-platform mobile applications with Flutter for a seamless user experience on both iOS and Android.', order: 1 },
    { title: 'UI/UX Design', description: 'Crafting intuitive, aesthetically pleasing, and user-centric interfaces that enhance engagement and ensure a delightful user journey.', order: 2 },
    { title: 'Firebase Integration', description: 'Integrating robust backend services with Google Firebase for scalable, real-time data synchronization, authentication, and cloud functions.', order: 3 },
    { title: 'REST API Integration', description: 'Connecting applications with external services through efficient, secure, and well-documented RESTful APIs.', order: 4 },
    { title: 'Bug Fixing & Optimization', description: 'Identifying, diagnosing, and resolving software defects to ensure smooth, reliable, and optimized application performance.', order: 5 },
    { title: 'Responsive Applications', description: 'Developing applications that adapt flawlessly across a wide range of devices and screen sizes.', order: 6 },
    { title: 'Modern Animations', description: 'Adding captivating, smooth, and performance-optimized animations to enhance visual appeal and interactivity.', order: 7 },
    { title: 'Technical Consultation', description: 'Providing expert guidance on software development, architecture best practices, and technology stack choices.', order: 8 },
];

const statisticsData = {
    clients: 5,
    projects: 15,
    experience: 3,
    awards: 2,
    certificates: 10,
};

const seed = async () => {
    await connectDB();

    const destroy = process.argv.includes('--destroy');

    if (destroy) {
        await Promise.all([
            Admin.deleteMany(),
            About.deleteMany(),
            Skill.deleteMany(),
            Education.deleteMany(),
            Experience.deleteMany(),
            Project.deleteMany(),
            Certificate.deleteMany(),
            Service.deleteMany(),
            Statistics.deleteMany(),
        ]);
        logger.info('All collections cleared.');
        process.exit(0);
    }

    // Admin (idempotent — skip if one already exists with this email)
    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
        await Admin.create({
            name: process.env.SEED_ADMIN_NAME || 'Admin',
            email: adminEmail,
            password: process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!',
            role: 'superadmin',
        });
        logger.info(`Admin account created: ${adminEmail}`);
    } else {
        logger.info('Admin account already exists, skipping.');
    }

    await About.deleteMany();
    await About.create(aboutData);

    await Skill.deleteMany();
    await Skill.insertMany(skillsData);

    await Education.deleteMany();
    await Education.insertMany(educationData);

    await Experience.deleteMany();
    await Experience.insertMany(experienceData);

    await Project.deleteMany();
    await Project.insertMany(projectsData);

    await Certificate.deleteMany();
    await Certificate.insertMany(certificatesData);

    await Service.deleteMany();
    await Service.insertMany(servicesData);

    await Statistics.deleteMany();
    await Statistics.create(statisticsData);

    logger.info('Database seeded successfully with portfolio content.');
    mongoose.connection.close();
    process.exit(0);
};

seed().catch((err) => {
    logger.error(`Seeding failed: ${err.message}`);
    process.exit(1);
});
