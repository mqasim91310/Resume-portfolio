import {
    Code2, Globe, Smartphone, Gamepad2, Database, GitBranch, GraduationCap,
    Paintbrush, Bug, Tablet, Sparkles, MessageCircle, Cpu, Server, Braces,
    Bot, BrainCircuit, ShieldCheck, ShieldAlert, FileSpreadsheet, Layers, Wrench,
} from 'lucide-react';

// --- Skill / section categories --------------------------------------------
// Keys are matched case-sensitively against Skill.category first, then
// case-insensitively as a fallback, so both the site's existing category
// names and whatever an admin types in still resolve to something sensible.
const CATEGORY_ICON_MAP = {
    'Programming Languages': Code2,
    'Web Development': Globe,
    Frontend: Globe,
    'Mobile Development': Smartphone,
    Mobile: Smartphone,
    'Game Development': Gamepad2,
    Databases: Database,
    Database: Database,
    Backend: Server,
    'Tools & Version Control': GitBranch,
    Tools: GitBranch,
    'Relevant Coursework': GraduationCap,
    'AI / Machine Learning': BrainCircuit,
    AI: BrainCircuit,
};

export const resolveCategoryIcon = (category = '', fallback = Code2) => {
    if (CATEGORY_ICON_MAP[category]) return CATEGORY_ICON_MAP[category];
    const lower = category.toLowerCase();
    const match = Object.keys(CATEGORY_ICON_MAP).find((k) => k.toLowerCase() === lower);
    return match ? CATEGORY_ICON_MAP[match] : fallback;
};

// --- Services ---------------------------------------------------------------
// Service.icon is a free-text field an admin can type in (see ManageServices).
// Match loosely on keywords so "Flutter", "flutter-dev", "Mobile Apps" etc.
// all land on the same icon instead of falling through to the default.
const SERVICE_ICON_RULES = [
    [/flutter|mobile|smartphone|android|ios/i, Smartphone],
    [/design|paint|ui\/?ux|figma/i, Paintbrush],
    [/firebase|database|storage|cloud/i, Database],
    [/api|rest|integration|code|dev/i, Code2],
    [/bug|debug|fix|optimi[sz]e/i, Bug],
    [/responsive|tablet|device/i, Tablet],
    [/animat|sparkle|motion|interaction/i, Sparkles],
    [/consult|chat|message|advice/i, MessageCircle],
];
const SERVICE_ICON_PALETTE = [Smartphone, Paintbrush, Database, Code2, Bug, Tablet, Sparkles, MessageCircle];

export const resolveServiceIcon = (iconName = '', index = 0) => {
    if (iconName) {
        const rule = SERVICE_ICON_RULES.find(([re]) => re.test(iconName));
        if (rule) return rule[1];
    }
    return SERVICE_ICON_PALETTE[index % SERVICE_ICON_PALETTE.length];
};

// --- Certificates -------------------------------------------------------------
// Certificate has no icon field at all — pick one from the title's subject
// matter, falling back to a rotating palette so a list of unrelated
// certificates still reads as intentionally varied rather than repetitive.
const CERT_TITLE_RULES = [
    [/security|hack|cyber|penetration/i, ShieldCheck],
    [/sql|analytics|\bbi\b|dashboard/i, Database],
    [/machine learning|\bai\b|chatgpt|gpt|data analysis|\beda\b/i, BrainCircuit],
    [/excel|spreadsheet/i, FileSpreadsheet],
    [/javascript|\bjs\b|typescript/i, Braces],
    [/c\+\+|c#|operating system|\bos\b|assembly/i, Cpu],
    [/automation|bot/i, Bot],
    [/server|backend|network/i, Server],
];
const CERT_ICON_PALETTE = [Cpu, Bot, Database, BrainCircuit, FileSpreadsheet, ShieldCheck, ShieldAlert, Braces, Server];

export const resolveCertificateIcon = (title = '', index = 0) => {
    const rule = CERT_TITLE_RULES.find(([re]) => re.test(title));
    if (rule) return rule[1];
    return CERT_ICON_PALETTE[index % CERT_ICON_PALETTE.length];
};

// --- Projects -----------------------------------------------------------------
// Project.category is a free-text field (e.g. "web, university" in the
// static data) — match on the first token, then fall back to a palette.
const PROJECT_CATEGORY_ICON = {
    web: Globe,
    flutter: Smartphone,
    mobile: Smartphone,
    cpp: Cpu,
    java: Braces,
    game: Gamepad2,
    dsa: Layers,
    database: Database,
    os: Server,
    assembly: Cpu,
    hardware: Wrench,
    design: Paintbrush,
    university: GraduationCap,
    ai: BrainCircuit,
};
const PROJECT_ICON_PALETTE = [Code2, Globe, Smartphone, Gamepad2, Database, Cpu, Server, Layers];

export const resolveProjectIcon = (category = '', index = 0) => {
    const first = category.split(/[\s,]+/)[0]?.toLowerCase();
    if (first && PROJECT_CATEGORY_ICON[first]) return PROJECT_CATEGORY_ICON[first];
    return PROJECT_ICON_PALETTE[index % PROJECT_ICON_PALETTE.length];
};

// --- Shared gradient palette ----------------------------------------------
// Used for any banner (project or certificate) that has no real image —
// mirrors the blue/sky palette already used throughout the static data.
const GRADIENT_PALETTE = [
    'from-blue-600 to-sky-500',
    'from-sky-500 to-blue-700',
    'from-blue-500 to-blue-800',
    'from-blue-700 to-sky-600',
    'from-sky-600 to-blue-900',
    'from-blue-600 to-blue-900',
];

export const resolveGradient = (index = 0) => GRADIENT_PALETTE[index % GRADIENT_PALETTE.length];
