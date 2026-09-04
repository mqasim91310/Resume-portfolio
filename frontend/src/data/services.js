import { Smartphone, Paintbrush, Database, Code, Bug, Tablet, Sparkles, MessageCircle } from 'lucide-react';

// Single source of truth for services — the full Services page renders all
// of these, the homepage preview shows the first four. `iconKey` holds the
// actual component reference (not a rendered element) so this shape matches
// what useServices() normalizes live API data into.
export const serviceData = [
    {
        title: 'Flutter Development',
        description: 'Building high-performance, cross-platform mobile applications with Flutter for a seamless user experience on both iOS and Android.',
        bullets: [
            'One codebase shipping to both iOS and Android',
            'Custom widgets and smooth, purposeful animations',
            'Clean state management that stays maintainable as the app grows',
            'Firebase or REST API integration for real data, not mockups',
        ],
        iconKey: Smartphone,
    },
    {
        title: 'UI/UX Design',
        description: 'Crafting intuitive, aesthetically pleasing, and user-centric interfaces that enhance engagement and ensure a delightful user journey.',
        bullets: [
            'User-flow mapping before any visual design starts',
            'Clickable Figma prototypes to validate ideas early',
            'Role-based flows for apps with more than one type of user',
            'Designs handed off ready for development, not just pretty screens',
        ],
        iconKey: Paintbrush,
    },
    {
        title: 'Firebase Integration',
        description: 'Integrating robust backend services with Google Firebase for scalable, real-time data synchronization, authentication, and cloud functions.',
        bullets: [
            'Firestore for real-time data sync across devices',
            'Secure authentication and session handling',
            'NoSQL data models structured to stay easy to query',
        ],
        iconKey: Database,
    },
    {
        title: 'REST API Integration',
        description: 'Connecting applications with external services through efficient, secure, and well-documented RESTful APIs for data exchange and functionality.',
        bullets: [
            'Clean request/response handling on the frontend',
            'Node.js/Express APIs built from scratch when one is needed',
            'Error handling that fails gracefully, not silently',
        ],
        iconKey: Code,
    },
    {
        title: 'Bug Fixing & Optimization',
        description: 'Identifying, diagnosing, and resolving software defects to ensure smooth, reliable, and optimized application performance and stability.',
        bullets: [
            'Root-cause debugging, not just symptom patches',
            'Performance checks on slow renders, queries, or load times',
            'Fixes documented clearly so the change is easy to review',
        ],
        iconKey: Bug,
    },
    {
        title: 'Responsive Applications',
        description: 'Developing applications that adapt flawlessly and provide an optimal viewing experience across a wide range of devices and screen sizes.',
        bullets: [
            'Mobile-first layouts that scale up cleanly to desktop',
            'Tested across real breakpoints, not just a resized browser window',
            'Consistent experience across phone, tablet, and desktop',
        ],
        iconKey: Tablet,
    },
    {
        title: 'Modern Animations',
        description: 'Adding captivating, smooth, and performance-optimized animations to enhance the visual appeal and interactivity of user interfaces.',
        bullets: [
            'Motion that guides attention instead of just decorating',
            'Smooth micro-interactions on hover, scroll, and page transitions',
            'Performance-conscious — animation without janky load times',
        ],
        iconKey: Sparkles,
    },
    {
        title: 'Technical Consultation',
        description: 'Providing expert guidance and strategic insights on software development, architecture best practices, and technology stack choices to achieve project goals.',
        bullets: [
            'Honest input on whether Flutter, React, or another stack actually fits',
            'Architecture review before you build, not after something breaks',
            'Trade-offs explained plainly, without unnecessary jargon',
        ],
        iconKey: MessageCircle,
    },
];
