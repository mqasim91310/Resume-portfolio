// Single source of truth for semester info — used by the Journey timeline,
// the Home page chips, the Navbar dropdown, and each semester's detail page.
// Timeline: Semester 1 started Spring 2024, Semester 8 ends Fall 2027.

export const CURRENT_SEMESTER = 6;

export const semesterData = [
    {
        id: 1,
        title: 'Programming Foundations',
        duration: 'Spring 2024',
        subjects: 'C++, Java, Object-Oriented Programming, Discrete Mathematics',
        projectsSummary: 'Airline Reservation System (C++, OOP) — modeling flights, seats, and passenger records with core OOP principles.',
        note: 'My first real introduction to OOP — learning to model real-world systems as objects instead of writing everything as one long procedure.',
        technologies: ['C++', 'Java', 'Console I/O', 'UML basics'],
        skillsGained: [
            'Class design & object modeling',
            'Encapsulation of real-world entities',
            'Menu-driven console interfaces',
            'Mathematical proof techniques (Discrete Math)',
        ],
        achievements: [
            'Shipped my first complete OOP system from a blank file',
            'Modeled a multi-entity domain (flights, seats, passengers) as clean classes',
        ],
        challenges: 'Translating a real-world process into class hierarchies with zero prior programming experience — the biggest jump was learning to think in objects instead of a single linear script.',
        learningOutcomes: [
            'Comfortable designing simple class hierarchies from a problem statement',
            'Can apply encapsulation to keep data and behavior together',
            'Built a foundation in discrete math that underpins later algorithm work',
        ],
    },
    {
        id: 2,
        title: 'Digital Logic & Design',
        duration: 'Fall 2024',
        subjects: 'Digital Logic & Design, Discrete Mathematics II, Object-Oriented Programming (Java)',
        projectsSummary: '4-bit Digital Password Lock System, built entirely with logic gates — no Arduino or microcontroller involved — alongside a Java Restaurant Management System (OOP Edition) applying encapsulation, inheritance, and polymorphism.',
        note: 'A semester spent thinking in hardware — gates, flip-flops and truth tables — while continuing to sharpen OOP design with a second, more advanced Java project.',
        technologies: ['Logic Gates & Flip-Flops', 'Circuit Simulation', 'Java (Inheritance & Polymorphism)'],
        skillsGained: [
            'Boolean algebra & truth-table design',
            'Combinational and sequential circuit design',
            'Inheritance & polymorphism in Java',
            'UML class diagrams for larger systems',
        ],
        achievements: [
            'Designed a working 4-bit password lock using only logic gates',
            'Rebuilt a restaurant system with a proper OOP class hierarchy (orders, menu, staff)',
        ],
        challenges: 'Switching between two very different mindsets in one semester — reasoning about hardware at the gate level, then reasoning about software at the class level.',
        learningOutcomes: [
            'Able to design and simulate simple combinational & sequential circuits',
            'Strengthened OOP fundamentals with inheritance and polymorphism',
            'More confident splitting a system into a class hierarchy before writing code',
        ],
    },
    {
        id: 3,
        title: 'Data, Databases & Assembly',
        duration: 'Spring 2025',
        subjects: 'Data Structures & Algorithms, Computer Organization & Assembly Language, Database Systems',
        projectsSummary: 'Restaurant Management System and Hotel Management System (rebuilt in C++ with DSA), Student Marks & Result System (Assembly Language), and a Movie Ticket Booking System (MySQL).',
        note: 'The busiest semester so far — four projects across three subjects, managing data at every level from CPU registers to relational tables.',
        technologies: ['C++ (DSA)', 'x86/8086 Assembly', 'MySQL', 'ER Diagrams'],
        skillsGained: [
            'Core data structures: arrays, linked lists, stacks & queues',
            'Algorithm complexity analysis (Big-O thinking)',
            'Low-level programming with registers & memory addressing',
            'Relational schema design and SQL querying',
        ],
        achievements: [
            'Shipped 4 projects across 3 subjects in a single semester',
            'Rebuilt earlier console projects with proper DSA-backed data handling',
            'Wrote a full result-processing system directly in Assembly',
        ],
        challenges: 'Juggling four parallel projects while debugging Assembly at the register/memory level, with none of the high-level abstractions I had gotten used to.',
        learningOutcomes: [
            'Can choose and implement the right data structure for a problem',
            'Understands how high-level code maps down to CPU-level execution',
            'Comfortable designing and querying relational databases',
        ],
    },
    {
        id: 4,
        title: 'Web, Engineering & Architecture',
        duration: 'Fall 2025',
        subjects: 'Web Development, Software Engineering, Computer Architecture',
        projectsSummary: 'Al Kabir Developers real estate website replica (React), an Internal Hotel Management System built with proper SDLC practices, and an IR-sensor Water Level Indicator Game for Computer Architecture.',
        note: 'The semester I moved from the console into the browser, and into hardware sensors — building things people could actually interact with.',
        technologies: ['React', 'HTML5 / CSS3 / JavaScript', 'SDLC Documentation', 'IR Sensors'],
        skillsGained: [
            'Component-based frontend architecture',
            'Responsive, browser-based UI development',
            'Formal software engineering lifecycle & requirements docs',
            'Basic embedded sensor integration',
        ],
        achievements: [
            'Shipped my first production-style, publicly viewable website',
            'Delivered a hotel system following full SDLC documentation',
            'Built a hardware-driven game using an IR sensor',
        ],
        challenges: 'Moving from console apps to full browser UIs, and following strict SDLC documentation for the first time slowed early progress but paid off in cleaner project structure.',
        learningOutcomes: [
            'Can build responsive, component-based interfaces with React',
            'Understands the professional software engineering lifecycle end-to-end',
            'Can integrate simple hardware sensors into an interactive system',
        ],
    },
    {
        id: 5,
        title: 'Mobile, Games & Systems',
        duration: 'Spring 2026',
        subjects: 'Human-Computer Interaction & Computer Graphics, Mobile App Development, Game Programming, Operating Systems',
        projectsSummary: 'Khidmat (a Foodpanda-style ordering concept for hostel students, teachers & employees, designed in Figma), the Brew & Bless coffee shop app and DeenEase Quran app (both Flutter), Street Rush (Unity, C#), and an OS kernel simulation with FCFS, SJF and Round Robin scheduling (JavaFX).',
        note: 'Five projects across four subjects — the semester that shaped my product instincts across mobile, design and systems programming.',
        technologies: ['Flutter & Dart', 'Firebase', 'Unity & C#', 'JavaFX', 'Figma'],
        skillsGained: [
            'Cross-platform mobile app development',
            'Product design & prototyping in Figma',
            'Real-time backend integration with Firebase',
            'Game loop & collision programming in Unity',
            'CPU scheduling algorithms: FCFS, SJF, Round Robin',
        ],
        achievements: [
            'Heaviest project load yet — 5 shipped projects across 4 subjects',
            'Designed a full product concept (Khidmat) end-to-end in Figma',
            'Built and published two complete Flutter apps',
        ],
        challenges: 'Balancing design, mobile development, game development, and systems programming in parallel was the biggest workload-management test of the degree so far.',
        learningOutcomes: [
            'Confident building and shipping a mobile app end-to-end',
            'Understands core OS scheduling theory and can simulate it',
            'Learned to prototype a product in Figma before writing a line of code',
        ],
    },
    {
        id: 6,
        title: 'In Progress',
        duration: 'Fall 2026',
        subjects: 'Advanced coursework in Artificial Intelligence, Advanced Database Systems and Mobile App Development',
        projectsSummary: 'Currently building the full Khidmat application and laying the groundwork for a home-tutor LMS platform.',
        note: 'Where I am right now — putting everything from the last five semesters into two real products.',
        isCurrent: true,
        technologies: ['Flutter (production build)', 'Advanced SQL / DB design', 'AI/ML fundamentals'],
        skillsGained: [
            'Turning a Figma concept into a production Flutter app',
            'Advanced database design for multi-role platforms',
            'Foundational AI/ML concepts',
        ],
        achievements: [
            "Actively building the full Khidmat application from last semester's design",
            'Laying the architecture for a second product — a home-tutor LMS',
        ],
        challenges: "Taking a project past the prototype stage into something production-ready, while starting a second major project in parallel — this semester is about scope and time management as much as code.",
        learningOutcomes: [
            'Building toward production-grade, multi-feature apps rather than single-purpose coursework projects (in progress)',
        ],
    },
    {
        id: 7,
        title: 'Upcoming',
        duration: 'Spring 2027',
        subjects: 'Cloud Computing, Artificial Intelligence specialization',
        projectsSummary: 'Complete the Khidmat platform end-to-end and continue building out the home-tutor LMS system.',
        note: 'Planned focus: shipping real products to production while going deeper into cloud and AI.',
        isUpcoming: true,
        technologies: ['Cloud deployment (Firebase Hosting / equivalent)', 'Applied AI specialization'],
        skillsGained: [
            'Cloud deployment & scaling (planned)',
            'Applied AI specialization coursework (planned)',
        ],
        achievements: [
            'Goal: take Khidmat live for real users',
            'Goal: continue building out the home-tutor LMS',
        ],
        challenges: 'Anticipated: deploying and supporting a real, cloud-hosted application for actual users for the first time.',
        learningOutcomes: [
            'Planned: ship a cloud-deployed application used by real people, not just graded by an instructor',
        ],
    },
    {
        id: 8,
        title: 'Final Semester',
        duration: 'Fall 2027',
        subjects: 'Capstone Project, Industry Internship',
        projectsSummary: 'Ship the complete LMS platform connecting parents with verified home tutors, with a shared portal where teachers report student progress directly to parents.',
        note: 'The finish line — graduating with a portfolio of real, working products, not just coursework.',
        isUpcoming: true,
        technologies: ['Capstone project stack (TBD)', 'Industry tooling via internship'],
        skillsGained: [
            'Real-world engineering practices via an industry internship (planned)',
            'End-to-end ownership of a capstone product',
        ],
        achievements: [
            'Goal: ship the complete LMS platform connecting parents with verified home tutors',
            'Goal: graduate with a live portfolio of real, working products',
        ],
        challenges: 'Anticipated: balancing capstone delivery with internship responsibilities in the same semester.',
        learningOutcomes: [
            'Planned: graduate production-ready, with real shipped software rather than coursework alone',
        ],
    },
];

export const semesterYears = [
    { label: 'Year 1 · Spring 2024 - Fall 2024', semesters: [1, 2] },
    { label: 'Year 2 · Spring 2025 - Fall 2025', semesters: [3, 4] },
    { label: 'Year 3 · Spring 2026 - Fall 2026 (Current)', semesters: [5, 6] },
    { label: 'Year 4 · Spring 2027 - Fall 2027 (Upcoming)', semesters: [7, 8] },
];

export const getSemester = (id) => semesterData.find((s) => s.id === Number(id));
