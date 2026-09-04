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
    careerObjective:
        "My immediate goal is a Software Engineering internship where I can apply what I've built so far — full-stack " +
        "web apps, Flutter mobile apps, and DSA-driven systems — to a real codebase with real users. I'm looking for " +
        "problems that force me to actually think, and engineers I can learn from.",
    currentFocus:
        "Right now I'm sharpening REST API design, cloud deployment with Firebase Hosting, and building design systems " +
        "that stay consistent as an app grows past a handful of screens — the practical gaps a coursework-only " +
        "education tends to leave.",
    futureGoals:
        'Longer term, I want to grow into a full-stack engineer who can own a feature end-to-end, from schema design ' +
        'through to a shipped UI, and eventually take on the kind of architectural and mentoring responsibility that ' +
        'comes with experience, not just a title.',
    interests:
        "Outside of coursework, I like pulling apart new frameworks and AI tools to see what they're actually good for, " +
        'tinkering with small Flutter and game side-projects, and reading through how other developers structure real ' +
        'production codebases instead of textbook examples.',
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
    {
        title: 'Airline Reservation System',
        description: 'Console-based airline booking system applying core OOP principles to model flights, seats, and passenger records.',
        technologies: 'C++ (OOP)',
        role: 'Software Developer',
        features: 'Class-based flight & passenger modeling, seat booking and cancellation, encapsulated data handling.',
        problem: "University courses teach OOP theory in isolation; this project's goal was to prove the concepts by modeling something with real relationships — flights, seats, and passengers — instead of another calculator.",
        solution: 'Designed a small class hierarchy where Flight, Seat, and Passenger were separate objects with clear responsibilities, wired together through a menu-driven console app that could book a seat, cancel a booking, and print the current manifest.',
        techHighlights: 'Encapsulated seat state inside the Flight class so no other part of the program could put a seat into an invalid state directly — booking and cancellation had to go through defined methods.',
        contribution: 'Designed and implemented the full project solo, from the initial class diagram through the console interface.',
        challenges: "The hardest part wasn't the C++ syntax — it was the shift from writing one long procedural script to thinking in terms of objects with their own state and behavior.",
        outcome: 'A complete, working reservation system that models flights, seats, and passengers cleanly — the starting point for how OOP fundamentals carried into every project since.',
        category: 'cpp', semester: 1, featured: false,
    },
    {
        title: 'Restaurant Management System (OOP Edition)',
        description: 'Console-based restaurant system applying encapsulation, inheritance, and polymorphism.',
        technologies: 'Java (OOP)',
        role: 'Software Developer',
        features: 'OOP class hierarchy, order management workflow, bill generation.',
        problem: "Simulate a restaurant's order-to-bill workflow using proper object-oriented design rather than a single monolithic function.",
        solution: 'Modeled Orders, Menu Items, and Staff as a class hierarchy using inheritance and polymorphism, so different staff roles and menu categories share behavior without duplicating code.',
        techHighlights: "Used UML class diagrams during design before writing code, then implemented polymorphic staff roles so a single 'process order' call behaves correctly regardless of which staff subclass handles it.",
        contribution: 'Designed the class hierarchy, implemented the order and billing workflow, and produced the UML diagrams used to plan the system.',
        challenges: 'Deciding where inheritance actually belonged (staff roles) versus where composition made more sense (orders containing menu items) was the main design call to get right.',
        outcome: 'A working console application that takes an order from menu selection through to a generated bill — a more confident second pass at OOP design after the Airline Reservation System.',
        category: 'java', semester: 1, featured: false,
    },
    {
        title: '4-bit Digital Password Lock System',
        description: 'Digital logic circuit verifying a 4-bit password using logic gates, no microcontroller involved.',
        technologies: 'Digital Logic Design',
        role: 'Digital Logic Designer',
        features: 'Pure combinational/sequential logic gate design, truth-table driven verification.',
        problem: 'Design a password-verification system using nothing but logic gates — no microcontroller, no firmware — to understand how comparison and state actually work at the hardware level.',
        solution: 'Built a 4-bit comparator circuit from combinational and sequential logic gates that checks an entered 4-bit sequence against a fixed password and only unlocks on an exact match.',
        techHighlights: 'Worked entirely from truth tables — every gate combination was verified against its expected output before being wired into the larger circuit.',
        contribution: 'Designed, simulated, and verified the complete circuit.',
        challenges: "Debugging a logic circuit is nothing like debugging code — there's no stack trace, just truth tables and manual signal tracing when an output doesn't match.",
        outcome: 'A working password-lock circuit that correctly accepts a matching 4-bit code and rejects everything else, without a single line of embedded software.',
        category: 'hardware', semester: 2, featured: false,
    },
    {
        title: 'Restaurant Management System (DSA Edition)',
        description: 'Rebuilt restaurant system in C++ applying core data structures.',
        technologies: 'C++, DSA',
        role: 'Software Developer',
        features: 'Linked-list based order queues, structured inventory tracking.',
        problem: 'Rebuild the earlier Java restaurant system in C++, backed by real data structures instead of simple arrays, to see how the choice of data structure changes what a system can actually do.',
        solution: "Replaced flat array storage with a linked-list-based order queue for FIFO order processing and structured inventory tracking, so orders are handled in the order they arrive and inventory lookups don't require scanning every record.",
        techHighlights: 'Implemented the order queue as a singly linked list rather than reaching for std::queue, specifically to practice manual pointer management and node-level operations.',
        contribution: 'Rebuilt the system from the ground up in C++, choosing and implementing each data structure.',
        challenges: 'Getting comfortable with manual memory management — a linked-list bug like a dangling pointer fails very differently than an array-index bug.',
        outcome: 'A DSA-driven version of the restaurant system that processes orders through a proper queue instead of iterating an array — a direct comparison of two implementations of the same problem.',
        category: 'cpp', semester: 3, featured: false,
    },
    {
        title: 'Hotel Management System',
        description: 'Full-featured hotel system in C++ implementing check-in, check-out, room booking, and billing.',
        technologies: 'C++, DSA (Trees, Hash Maps, File I/O)',
        role: 'Software Developer',
        features: 'Hash map for O(1) room lookup, persistent file I/O, dynamic billing engine.',
        problem: "Model a hotel's day-to-day operations — checking guests in and out, tracking room status, billing correctly — in a system that stays fast as the number of rooms and guest records grows.",
        solution: 'Combined a hash map for room-status lookups with tree-based structures for organizing guest and room records, backed by persistent file I/O so data survives between runs, wrapped in a check-in/check-out workflow with an automatic billing engine that calculates charges by length of stay.',
        techHighlights: "Room availability lookups run in constant time thanks to the hash map instead of scanning every room on each check-in — the kind of decision a naive array-based version wouldn't need to make, but a real system does. File I/O was structured so guest and billing records persist across runs rather than resetting every time the program closes.",
        contribution: 'Designed the full data model, chose and implemented each data structure, and built the check-in/check-out and billing workflows end-to-end.',
        challenges: 'Balancing multiple data structures — hash maps for speed, trees for organization — inside one coherent system was more involved than any single-structure project from earlier semesters, and keeping them in sync as guests checked in and out required careful design.',
        outcome: 'One of the most complete C++ systems built during the degree so far — persistent data, constant-time room lookups, and an automatic billing engine, without relying on an external database.',
        category: 'cpp', semester: 3, featured: true,
    },
    {
        title: 'Student Marks & Result System',
        description: 'Low-level Assembly program calculating and displaying student marks and results.',
        technologies: 'x86/8086 Assembly Language',
        role: 'Low-level Programmer',
        features: 'Register-level arithmetic, DOS interrupt-driven I/O.',
        problem: 'Calculate and display student marks and results using nothing above the level of registers and memory addresses — no high-level language abstractions to lean on.',
        solution: 'Wrote the complete grade-calculation and display logic in x86/8086 Assembly, using register-level arithmetic for the calculations and DOS interrupts for reading input and printing results.',
        techHighlights: 'Every variable is a specific register or memory address, and every operation — addition, comparison, output — is written at the instruction level with no built-in functions to lean on.',
        contribution: 'Wrote and debugged the complete Assembly program.',
        challenges: "Debugging at this level means stepping through registers one instruction at a time — there's no print statement to quickly check a value.",
        outcome: "A working result-calculation program running entirely in Assembly — a close-to-the-metal contrast to the same semester's higher-level C++ and MySQL projects.",
        category: 'assembly', semester: 3, featured: false,
    },
    {
        title: 'Movie Ticket Booking System',
        description: 'Relational database-backed system for browsing showtimes and booking tickets.',
        technologies: 'MySQL',
        role: 'Database Developer',
        features: 'Normalized relational schema, seat availability tracking.',
        problem: "Model a movie-booking system where multiple showtimes, screens, and seats all need to stay consistent — double-booking a seat isn't an option.",
        solution: 'Designed a normalized relational schema across movies, shows, seats, and bookings tables, so seat availability could be tracked accurately and queried efficiently without duplicating data across tables.',
        techHighlights: "Normalized the schema specifically to avoid the seat-availability inconsistencies a flatter design would risk — each seat's booking status lives in exactly one place.",
        contribution: 'Designed the full relational schema and wrote the queries for browsing showtimes and booking tickets.',
        challenges: 'Getting the normalization right — enough separation between tables to avoid redundancy, without over-splitting the schema into so many joins that simple queries slow down.',
        outcome: "A relational database that answers 'which seats are free for this showtime' correctly and efficiently — the first project of the degree built database-first rather than code-first.",
        category: 'database', semester: 3, featured: false,
    },
    {
        title: 'Al Kabir Developers — Real Estate Web Application',
        description: 'Full-stack real estate replica web app with live listings, registration, and an admin dashboard.',
        technologies: 'React.js, Node.js, MySQL',
        role: 'Full-stack Developer',
        features: 'Live listings, user registration, admin dashboard, multi-filter search, ~25% improved query efficiency.',
        problem: "Move from console applications into a real, publicly deployed browser application — replicating a production-grade real estate platform's core functionality (live listings, filtering, an admin dashboard) rather than a simplified toy version.",
        solution: 'Built a full-stack web application with a React frontend, a Node.js/Express backend, and a normalized MySQL schema, covering property listings, user registration, a multi-filter search across location, price and property type, and an admin dashboard for managing listings.',
        techHighlights: 'Normalized the MySQL schema specifically to speed up the multi-filter search queries, improving query efficiency by roughly 25% over an earlier, flatter schema. The frontend and backend communicate over a REST API, with the admin dashboard hitting the same endpoints as the public site under authenticated routes.',
        contribution: 'Built the project end-to-end — React frontend, Node.js/Express API, MySQL schema and queries, and the admin dashboard — and deployed it live.',
        challenges: 'Multi-filter search (combining location, price range, and property type in one query) needed a schema and query design that stayed fast as filters were combined, which is what drove the normalization work.',
        outcome: 'A live, publicly deployed real estate web application — the first project of the degree a stranger can actually open in a browser and use, not just a screenshot in a report.',
        category: 'web', semester: 4, featured: true, githubLink: 'https://github.com/mqasim91310',
    },
    {
        title: 'Internal Hotel Management System',
        description: 'SDLC-driven hotel management system with requirements, design, implementation and testing phases.',
        technologies: 'Software Engineering Practices, SDLC',
        role: 'Software Engineer',
        features: 'Use-case modeling, structured SDLC workflow, staff-facing booking modules.',
        problem: "Most course projects start with 'build X' — this one started with a full software engineering lifecycle instead, to practice the discipline of requirements and design before writing any code.",
        solution: 'Followed a structured SDLC process — requirements gathering, use-case modeling, design, implementation, and testing — to build an internal, staff-facing hotel booking and billing system.',
        techHighlights: "Use-case diagrams and requirements documentation were produced and reviewed before implementation began, so the system's scope was defined up front rather than discovered mid-build.",
        contribution: 'Owned the SDLC process end-to-end — requirements, design documentation, implementation, and testing.',
        challenges: 'Sticking to the documented requirements and design once implementation started, instead of the usual instinct to just start coding and work out the design along the way.',
        outcome: 'A hotel booking and billing system built with formal SDLC documentation behind it — a different discipline than the DSA-driven Hotel Management System from the previous semester, and a clearer picture of how professional teams plan before they build.',
        category: 'software-engineering', semester: 4, featured: false,
    },
    {
        title: 'IR Sensor Water Level Indicator Game',
        description: 'Hardware game where an IR sensor raises a water level in a cup toward a target level to win.',
        technologies: 'Computer Architecture, IR Sensor',
        role: 'Embedded Systems Developer',
        features: 'IR proximity sensing, real-time water-level simulation, target-based win condition.',
        problem: 'Computer Architecture coursework called for a project that connected physical sensor hardware to interactive software behavior, rather than staying purely in the console.',
        solution: 'Built a game where an IR proximity sensor detects a hand hovering near it and raises a simulated water level in a cup toward a target line — reach the target to win.',
        techHighlights: 'Real hardware input from the IR sensor drives real-time software state, which meant handling noisy or inconsistent sensor readings gracefully rather than assuming clean input like a keyboard would give.',
        contribution: 'Designed the game concept and built the sensor-to-software integration.',
        challenges: 'Hardware input is not as clean as keyboard input — tuning the sensor response so the water level rose smoothly instead of jumping around took some iteration.',
        outcome: 'A small but complete demonstration of hardware-software interaction — sensor input driving a real-time simulation with an actual win condition.',
        category: 'hardware', semester: 4, featured: false,
    },
    {
        title: 'Khidmat — Hostel Services App (UI/UX Design)',
        description: 'Foodpanda-style ordering concept designed for hostel students, teachers, and employees.',
        technologies: 'Figma, HCI & Computer Graphics',
        role: 'UI/UX Designer',
        features: 'Full user-flow prototyping, role-based flows for students/teachers/employees.',
        problem: "People living and working in hostels — students, teachers, support staff — don't have a Foodpanda-style ordering experience built for their specific context: shared kitchens, fixed meal windows, and multiple user roles with different needs.",
        solution: "Designed a complete Figma prototype for a hostel ordering platform, with distinct user flows for students, teachers, and employees, applying HCI principles to keep each role's flow simple despite the shared underlying system.",
        techHighlights: 'Prototyped full user flows rather than static screens — every role has its own path through the app, validated in Figma before a single line of application code was written.',
        contribution: 'Designed and prototyped the complete product concept — user flows, screens, and role-based navigation — solo.',
        challenges: 'Designing one coherent system that serves three different user roles without making any of them feel like an afterthought was the core UX challenge.',
        outcome: 'A complete, validated Figma prototype that later became the design foundation for the in-progress Khidmat application.',
        category: 'design', semester: 5, featured: false,
    },
    {
        title: 'Brew & Bless Coffee Shop — Mobile Application',
        description: 'Cross-platform Flutter app for browsing menu, customizing orders, and purchasing.',
        technologies: 'Flutter, Dart, Firebase',
        role: 'Mobile App Developer',
        features: 'Firebase Firestore integration, custom widgets, secure Firebase Auth.',
        problem: "Give a coffee shop's customers a proper mobile ordering experience — browsing the menu, customizing an order, and purchasing — from a single Flutter codebase covering both iOS and Android.",
        solution: 'Built a cross-platform Flutter app backed by Firebase, with Firestore powering real-time menu and order data and Firebase Authentication handling secure sign-in, alongside custom Flutter widgets for the menu and order-customization screens.',
        techHighlights: "Firestore's real-time listeners keep the menu and order status in sync across the app without manual refresh logic, and Firebase Auth handles sign-in without the app needing to manage passwords or sessions itself.",
        contribution: 'Built the complete app — UI, Firebase integration, and the ordering flow — from design decisions through to a working Flutter build.',
        challenges: "Structuring Firestore's NoSQL data model so menu items, customizations, and orders stayed easy to query, without the rigid relational structure the MySQL projects earlier in the degree relied on.",
        outcome: 'A complete, cross-platform mobile ordering app — one of two Flutter apps shipped this semester, and the first to use Firebase as a real backend rather than local-only data.',
        category: 'flutter', semester: 5, featured: true, githubLink: 'https://github.com/mqasim91310',
    },
    {
        title: 'DeenEase — Complete Quran & Islamic Companion App',
        description: 'Complete Islamic lifestyle app bringing Quran reading and deen tools into one place.',
        technologies: 'Flutter, Dart',
        role: 'Mobile App Developer',
        features: 'Full Quran reading module, offline-friendly design.',
        problem: 'Bring everyday Islamic lifestyle tools — Quran reading chief among them — into one clean, cross-platform app instead of several disconnected ones.',
        solution: "Built a Flutter app centered on a complete Quran reading module, designed to work offline-friendly so reading isn't dependent on a constant connection, alongside a set of everyday deen-related utility tools in the same clean UI.",
        techHighlights: 'Designed the Quran reading module with offline access in mind from the start, rather than bolting on caching after the fact — a deliberate architecture decision given how the app is actually meant to be used.',
        contribution: 'Designed and built the complete application, including the Quran reading module and its offline-friendly data handling.',
        challenges: 'Structuring content so it stays available offline without bloating the app or requiring a constant sync process.',
        outcome: 'A complete, self-contained Islamic companion app — the second Flutter app shipped in the same semester as Brew & Bless, this time built around offline-first content rather than a live backend.',
        category: 'flutter', semester: 5, featured: false,
    },
    {
        title: 'Street Rush — Endless Runner Mobile Game',
        description: 'Complete endless-runner game built in Unity with procedural obstacle generation and scoring.',
        technologies: 'Unity Engine, C#',
        role: 'Game Developer',
        features: 'Procedural obstacle generation, progressive difficulty scaling, object-pooled rendering for stable 60 FPS, persistent local high-score system, touch controls built for mobile play.',
        problem: 'Build a complete mobile game from scratch in Unity — not a course exercise adapted into a game, but a real endless runner built the way a small studio would approach one: procedural content, a real performance budget, and a persistence layer, running smoothly on a phone.',
        solution: 'Built Street Rush in Unity 6 using C#, an endless runner where the player dodges a procedurally generated stream of street obstacles — including moving traffic — down a lane system that gets denser and faster as the score climbs, with a persistent local high-score system so progress carries across sessions.',
        techHighlights: 'Every obstacle and traffic element is drawn from an object pool instead of being instantiated and destroyed on the fly, which is what keeps the game at a stable 60 FPS on mobile hardware — repeated spawn/destroy calls are one of the most common performance killers in Unity mobile games, and pooling avoids it entirely. Difficulty scaling is tied directly to score, so obstacle density and speed increase procedurally rather than through hand-authored levels, and the high-score system persists locally between sessions.',
        contribution: 'Designed and built the complete game solo — the C# gameplay systems (movement, obstacle spawning, difficulty scaling, scoring), the object-pooling architecture behind them, and the UI covering the run, game-over, and score screens.',
        challenges: 'Keeping performance stable on mobile while continuously spawning obstacles was the central engineering problem — the object-pooling system exists specifically because naive spawn-and-destroy logic caused frame drops during early testing.',
        outcome: 'A complete, playable endless runner with the kind of performance discipline — object pooling, procedural difficulty, persistent scores — that separates a finished mobile game from a tech demo, published as a full Unity project on GitHub.',
        category: 'game', semester: 5, featured: true, githubLink: 'https://github.com/mqasim91310',
    },
    {
        title: 'OS Kernel Simulation with CPU Scheduling',
        description: 'Operating Systems simulation modeling kernel-level process scheduling.',
        technologies: 'JavaFX, Java',
        role: 'Systems Programmer',
        features: 'FCFS, SJF, and Round Robin scheduling algorithms with a visual GUI.',
        problem: 'CPU scheduling algorithms are hard to really understand from a textbook diagram alone; this project set out to make scheduling behavior visible and interactive instead.',
        solution: 'Built a JavaFX application that simulates kernel-level process scheduling using three classic algorithms — First-Come-First-Served, Shortest Job First, and Round Robin — with a visual GUI showing process and queue state as scheduling decisions happen.',
        techHighlights: 'Implemented all three scheduling algorithms against the same underlying process model, so the same set of simulated processes can be run through FCFS, SJF, or Round Robin and compared directly.',
        contribution: 'Designed and implemented the scheduling algorithms and the JavaFX visualization on top of them.',
        challenges: 'Building a GUI that accurately reflects scheduling decisions in real time, rather than just printing a final result, took more design work than the algorithms themselves.',
        outcome: 'A working, visual CPU scheduling simulator that makes the difference between FCFS, SJF, and Round Robin genuinely visible instead of theoretical.',
        category: 'os', semester: 5, featured: false,
    },
    {
        title: 'Khidmat — Full Application Development',
        description: 'Taking Khidmat from Figma design into a fully functional hostel-services ordering platform.',
        technologies: 'Flutter / React, Node.js, Firebase or MySQL',
        category: 'design', semester: 7, featured: false, status: 'upcoming',
    },
    {
        title: 'LMS — Home Tutor & Parent Platform',
        description: 'Complete LMS connecting parents with highly-rated home tutors, with a shared progress portal.',
        technologies: 'React/Flutter, Node.js, MySQL/Firebase',
        category: 'web', semester: 8, featured: false, status: 'upcoming',
    },
];

const certificatesData = [
    { title: 'C++ Essentials 2', organization: 'Cisco Networking Academy · Riphah International University', instructor: 'Dua Mahmood', description: "Intermediate C++: object-oriented programming, templates, and STL containers, building directly on the C++ used throughout the degree's coursework.", issueDate: new Date('2025-05-15') },
    { title: "ChatGPT Masterclass: The Ultimate Beginner's Guide!", organization: 'Udemy', instructor: 'Chetan Pujari', description: 'A practical introduction to using ChatGPT effectively — prompt structuring and getting reliable output for everyday research and writing tasks.', issueDate: new Date('2025-12-04'), length: '4 total hours', link: 'https://ude.my/UC-51fb0d9d-abc6-41d2-85ba-3b250d90d90d' },
    { title: 'Get Started with SQL Analytics and BI on Databricks', organization: 'Databricks', description: 'SQL-based analytics and business intelligence workflows on the Databricks platform, from querying data to building simple dashboards.', issueDate: new Date('2025-12-27'), certificateCode: '9644216' },
    { title: 'Master Data Analysis and EDA for Machine Learning Projects', organization: 'Udemy', instructor: 'Faisal Zamir', description: 'Exploratory data analysis techniques — cleaning, visualizing, and interpreting datasets — as the first step in any machine learning workflow.', issueDate: new Date('2025-12-27'), length: '44 total mins', link: 'https://ude.my/UC-3e6aec7b-d8ad-40f3-be7d-441a50f0b725' },
    { title: 'Excel Automation using ChatGPT', organization: 'Verified Certificate', description: 'Using ChatGPT to automate repetitive Excel work, from formula generation to data cleanup.', issueDate: new Date('2025-12-27'), certificateCode: '9646600' },
    { title: 'Ethically Hack the Planet', organization: 'Udemy', instructor: 'Cyber Twinkle, Zeronyte Security', description: 'An introduction to ethical hacking and security fundamentals — how common attacks work and how to think defensively about systems.', issueDate: new Date('2026-01-02'), length: '1 total hour', link: 'https://ude.my/UC-f40aed7e-8832-412c-b8d2-f799e7d6b870' },
    { title: 'Ethically Hack the Planet Part 2', organization: 'Udemy', instructor: 'Cyber Twinkle, Zeronyte Security', description: 'Continues the ethical hacking track with more applied security concepts and hands-on techniques.', issueDate: new Date('2026-01-03'), length: '34 total mins', link: 'https://ude.my/UC-9125e5a1-50d0-4d1d-9dd4-abcbe460d7ae' },
    { title: 'JavaScript Essentials 1', organization: 'Cisco Networking Academy · Riphah International University', instructor: 'Dua Mahmood', description: 'Core JavaScript fundamentals — syntax, control flow, and functions — the foundation for the web development work in later projects.', issueDate: new Date('2026-01-25') },
    { title: 'JavaScript Essentials 2', organization: 'Cisco Networking Academy · Riphah International University', instructor: 'Dua Mahmood', description: 'Builds on JavaScript Essentials 1 with more advanced concepts: objects, asynchronous code, and working with the DOM.', issueDate: new Date('2026-01-27') },
    { title: 'Operating Systems Basics', organization: 'Cisco Networking Academy · Riphah International University', instructor: 'Ramisha Farrukh', description: 'Foundational OS concepts — processes, memory management, and scheduling — that directly informed the OS Kernel Simulation project.', issueDate: new Date('2026-06-01') },
];

const servicesData = [
    {
        title: 'Flutter Development',
        description: 'Building high-performance, cross-platform mobile applications with Flutter for a seamless user experience on both iOS and Android.',
        bullets: 'One codebase shipping to both iOS and Android\nCustom widgets and smooth, purposeful animations\nClean state management that stays maintainable as the app grows\nFirebase or REST API integration for real data, not mockups',
        order: 1,
    },
    {
        title: 'UI/UX Design',
        description: 'Crafting intuitive, aesthetically pleasing, and user-centric interfaces that enhance engagement and ensure a delightful user journey.',
        bullets: 'User-flow mapping before any visual design starts\nClickable Figma prototypes to validate ideas early\nRole-based flows for apps with more than one type of user\nDesigns handed off ready for development, not just pretty screens',
        order: 2,
    },
    {
        title: 'Firebase Integration',
        description: 'Integrating robust backend services with Google Firebase for scalable, real-time data synchronization, authentication, and cloud functions.',
        bullets: 'Firestore for real-time data sync across devices\nSecure authentication and session handling\nNoSQL data models structured to stay easy to query',
        order: 3,
    },
    {
        title: 'REST API Integration',
        description: 'Connecting applications with external services through efficient, secure, and well-documented RESTful APIs.',
        bullets: 'Clean request/response handling on the frontend\nNode.js/Express APIs built from scratch when one is needed\nError handling that fails gracefully, not silently',
        order: 4,
    },
    {
        title: 'Bug Fixing & Optimization',
        description: 'Identifying, diagnosing, and resolving software defects to ensure smooth, reliable, and optimized application performance.',
        bullets: 'Root-cause debugging, not just symptom patches\nPerformance checks on slow renders, queries, or load times\nFixes documented clearly so the change is easy to review',
        order: 5,
    },
    {
        title: 'Responsive Applications',
        description: 'Developing applications that adapt flawlessly across a wide range of devices and screen sizes.',
        bullets: 'Mobile-first layouts that scale up cleanly to desktop\nTested across real breakpoints, not just a resized browser window\nConsistent experience across phone, tablet, and desktop',
        order: 6,
    },
    {
        title: 'Modern Animations',
        description: 'Adding captivating, smooth, and performance-optimized animations to enhance visual appeal and interactivity.',
        bullets: 'Motion that guides attention instead of just decorating\nSmooth micro-interactions on hover, scroll, and page transitions\nPerformance-conscious — animation without janky load times',
        order: 7,
    },
    {
        title: 'Technical Consultation',
        description: 'Providing expert guidance on software development, architecture best practices, and technology stack choices.',
        bullets: 'Honest input on whether Flutter, React, or another stack actually fits\nArchitecture review before you build, not after something breaks\nTrade-offs explained plainly, without unnecessary jargon',
        order: 8,
    },
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
