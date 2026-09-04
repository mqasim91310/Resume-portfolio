import { Code2, Globe, Smartphone, Gamepad2, Database, GitBranch, GraduationCap } from 'lucide-react';

export const categoryIcons = {
    'Programming Languages': Code2,
    'Web Development': Globe,
    'Mobile Development': Smartphone,
    'Game Development': Gamepad2,
    Databases: Database,
    'Tools & Version Control': GitBranch,
    'Relevant Coursework': GraduationCap,
};

// Short, honest context for each category — not a sales pitch, just what the
// category is for and where it's actually been used across real projects.
export const categoryDescriptions = {
    'Programming Languages': 'The foundation everything else is built on — from register-level Assembly to the object-oriented languages used across most coursework projects.',
    'Web Development': 'The stack behind the Al Kabir Developers web app and this portfolio itself — component-based, responsive interfaces backed by a real API.',
    'Mobile Development': 'Flutter is the primary tool for cross-platform apps, used to ship Brew & Bless and DeenEase from a single codebase to both iOS and Android.',
    'Game Development': 'Unity and C# power Street Rush, applying the same programming fundamentals to real-time, performance-sensitive systems instead of a typical CRUD app.',
    Databases: 'From relational schema design in MySQL/PostgreSQL to real-time NoSQL data with Firebase — the choice depends on what a given project actually needs.',
    'Tools & Version Control': 'Git and GitHub are used on every project without exception, from a single console app to the full-stack Al Kabir Developers build.',
    'Relevant Coursework': 'The academic foundation underneath the applied work — data structures, OOP, database systems, and low-level systems programming.',
};

// One-line framing shown above the full skills grid.
export const skillsIntro =
    "These aren't a bootcamp checklist — each skill here is tied to something actually built, from register-level Assembly to full-stack web apps and cross-platform mobile development. The percentages reflect hands-on project experience, not just course completion.";

// Single source of truth for skills, grouped by category. The full Skills
// page renders every item with its progress bar; the homepage preview and
// tech-stack teaser just need the category names, derived from this list
// rather than kept as a separate hardcoded array.
export const skillsData = [
    {
        category: 'Programming Languages',
        items: [
            { name: 'Java', level: '85%' },
            { name: 'C++', level: '80%' },
            { name: 'Assembly Language (x86/8086)', level: '70%' },
            { name: 'C# (Unity)', level: '75%' },
            { name: 'Dart', level: '80%' },
        ],
    },
    {
        category: 'Web Development',
        items: [
            { name: 'HTML5', level: '90%' },
            { name: 'CSS3', level: '85%' },
            { name: 'JavaScript', level: '80%' },
            { name: 'React.js', level: '70%' },
            { name: 'Node.js', level: '65%' },
        ],
    },
    {
        category: 'Mobile Development',
        items: [
            { name: 'Flutter', level: '90%' },
        ],
    },
    {
        category: 'Game Development',
        items: [
            { name: 'Unity Engine', level: '75%' },
        ],
    },
    {
        category: 'Databases',
        items: [
            { name: 'MySQL', level: '80%' },
            { name: 'PostgreSQL', level: '60%' },
            { name: 'Firebase', level: '75%' },
        ],
    },
    {
        category: 'Tools & Version Control',
        items: [
            { name: 'Git', level: '90%' },
            { name: 'GitHub', level: '85%' },
        ],
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
        ],
    },
];
