from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)

PINK = colors.HexColor('#c2185b')
PINK_LIGHT = colors.HexColor('#ec4899')
DARK = colors.HexColor('#1a1a1a')
GREY = colors.HexColor('#4a4a4a')

styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=24, textColor=DARK, leading=28, spaceAfter=10),
    'title': ParagraphStyle('title', fontName='Helvetica', fontSize=12.5, textColor=PINK, spaceAfter=8),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=9.3, textColor=GREY, spaceAfter=14, leading=13),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=12, textColor=PINK, spaceBefore=14, spaceAfter=6, letterSpacing=1),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=9.7, textColor=DARK, leading=14, spaceAfter=6),
    'job_title': ParagraphStyle('job_title', fontName='Helvetica-Bold', fontSize=10.3, textColor=DARK, spaceAfter=1),
    'job_meta': ParagraphStyle('job_meta', fontName='Helvetica-Oblique', fontSize=9, textColor=GREY, spaceAfter=3),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=9.5, textColor=DARK, leading=13.5, leftIndent=12, spaceAfter=3),
    'skillcat': ParagraphStyle('skillcat', fontName='Helvetica-Bold', fontSize=9.7, textColor=DARK, spaceAfter=2),
    'skillval': ParagraphStyle('skillval', fontName='Helvetica', fontSize=9.5, textColor=GREY, spaceAfter=8, leading=13),
}


def hr():
    return HRFlowable(width="100%", thickness=1.3, color=PINK_LIGHT, spaceAfter=10, spaceBefore=0)


def section(title):
    return Paragraph(title.upper(), styles['section'])


def bullet(text):
    return Paragraph(f'<bullet>&#8226;</bullet> {text}', styles['bullet'])


doc = SimpleDocTemplate(
    "public/Muhammad-Qasim-CV.pdf",
    pagesize=letter,
    topMargin=0.55 * inch,
    bottomMargin=0.5 * inch,
    leftMargin=0.65 * inch,
    rightMargin=0.65 * inch,
    title="Muhammad Qasim - Resume",
    author="Muhammad Qasim",
)

story = []

story.append(Paragraph("Muhammad Qasim", styles['name']))
story.append(Paragraph("Full-Stack Developer &nbsp;&#8226;&nbsp; Flutter Developer &nbsp;&#8226;&nbsp; AI Enthusiast", styles['title']))
story.append(Paragraph(
    "Lahore, Pakistan &nbsp;&#8226;&nbsp; mqasim91310@gmail.com &nbsp;&#8226;&nbsp; +92 320 658 9259 "
    "&nbsp;&#8226;&nbsp; github.com/mqasim91310 &nbsp;&#8226;&nbsp; linkedin.com/in/muhammad-qasim-6725242a7",
    styles['contact']
))
story.append(hr())

# Summary
story.append(section("Professional Summary"))
story.append(Paragraph(
    "Motivated BS Computer Science student at Riphah International University (6th Semester) with hands-on "
    "experience building full-stack web applications, mobile apps, DSA-driven C++ systems, and interactive games. "
    "Proficient in Java, C++, Assembly Language (x86/8086), and cross-platform development using Flutter and Unity. "
    "Actively seeking a Software Engineering internship to apply academic knowledge in a real-world engineering "
    "environment.",
    styles['body']
))

# Education
story.append(section("Education"))
story.append(Paragraph("Bachelor of Science in Computer Science (BSCS)", styles['job_title']))
story.append(Paragraph(
    "Riphah International University, Lahore, Pakistan &nbsp;|&nbsp; Expected Graduation: June 2027 "
    "&nbsp;|&nbsp; Currently in 6th Semester",
    styles['job_meta']
))
story.append(Paragraph(
    "Relevant coursework: Data Structures &amp; Algorithms, Object-Oriented Programming, Database Systems, "
    "Software Engineering, Computer Organization &amp; Assembly Language, Discrete Mathematics.",
    styles['body']
))

# Experience
story.append(section("Experience"))
story.append(Paragraph("Frontend Development Intern &nbsp;&#8226;&nbsp; Decode Labs", styles['job_title']))
story.append(Paragraph("Remote / Virtual &nbsp;|&nbsp; 15 May 2026 &#8211; 15 June 2026", styles['job_meta']))
story.append(bullet(
    "Learning-focused internship working on assigned frontend projects, completing milestones, and "
    "participating in mentor-led sessions to gain hands-on industry experience."
))

# Projects
story.append(section("Featured Projects"))

projects = [
    ("Al Kabir Developers — Real Estate Web Application", "React.js, Node.js, MySQL",
     "Full-stack real estate web app with live property listings, user registration, multi-filter search, and an "
     "admin dashboard; normalized MySQL schema improved query efficiency by roughly 25%. Deployed live."),
    ("Street Rush — Endless Runner Mobile Game", "Unity 6, C#",
     "Complete endless-runner game with procedural obstacle generation, progressive difficulty scaling, "
     "object-pooled rendering for a stable 60 FPS on mobile, and a persistent local high-score system."),
    ("Brew & Bless Coffee Shop — Mobile Application", "Flutter, Dart, Firebase",
     "Cross-platform ordering app with real-time Firestore sync for menu and orders, custom Flutter widgets, "
     "and secure Firebase Authentication."),
    ("Hotel Management System", "C++, DSA (Trees, Hash Maps, File I/O)",
     "Full check-in/check-out and billing system using a hash map for constant-time room lookups, tree-based "
     "record organization, and persistent file I/O for guest data."),
    ("OS Kernel Simulation with CPU Scheduling", "JavaFX, Java",
     "Visual simulator for kernel-level process scheduling implementing FCFS, SJF, and Round Robin algorithms "
     "against a shared process model."),
]

for title, tech, desc in projects:
    story.append(Paragraph(title, styles['job_title']))
    story.append(Paragraph(tech, styles['job_meta']))
    story.append(bullet(desc))
    story.append(Spacer(1, 4))

# Skills
story.append(section("Technical Skills"))

skills_table_data = [
    [Paragraph("Programming Languages", styles['skillcat']), Paragraph("Java, C++, Dart, C# (Unity), x86/8086 Assembly", styles['skillval'])],
    [Paragraph("Web Development", styles['skillcat']), Paragraph("HTML5, CSS3, JavaScript, React.js, Node.js", styles['skillval'])],
    [Paragraph("Mobile &amp; Game Dev", styles['skillcat']), Paragraph("Flutter, Unity Engine", styles['skillval'])],
    [Paragraph("Databases", styles['skillcat']), Paragraph("MySQL, PostgreSQL, Firebase", styles['skillval'])],
    [Paragraph("Tools", styles['skillcat']), Paragraph("Git, GitHub, VS Code, Android Studio", styles['skillval'])],
    [Paragraph("Coursework", styles['skillcat']), Paragraph("DSA, OOP, Database Systems, Software Engineering, Computer Organization, Discrete Mathematics", styles['skillval'])],
]

t = Table(skills_table_data, colWidths=[1.6 * inch, 5.1 * inch])
t.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('TOPPADDING', (0, 0), (-1, -1), 1),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 1),
    ('LEFTPADDING', (0, 0), (-1, -1), 0),
]))
story.append(t)

# Journey / timeline highlights
story.append(section("Academic Journey"))
journey_items = [
    ("Semester 1-2 (Spring-Fall 2024)", "Programming Foundations, Digital Logic &amp; Design — built an OOP-based "
     "Airline Reservation System (C++), a Restaurant Management System (Java), and a 4-bit password lock circuit."),
    ("Semester 3-4 (Spring-Fall 2025)", "Data Structures, Databases, Assembly, Web &amp; Software Engineering — "
     "built a DSA-driven Hotel Management System, a MySQL ticket-booking system, and the full-stack Al Kabir "
     "Developers web app."),
    ("Semester 5 (Spring 2026)", "Human-Computer Interaction, Mobile App Development, Game Programming, Operating "
     "Systems — shipped two Flutter apps (Brew &amp; Bless, DeenEase), the Street Rush Unity game, and an OS "
     "scheduling simulator."),
    ("Semester 6 — In Progress (Fall 2026)", "Advanced coursework in Artificial Intelligence, Advanced Database "
     "Systems, and Mobile App Development — currently building the full Khidmat application and laying the "
     "groundwork for a home-tutor LMS platform."),
]
for period, desc in journey_items:
    story.append(Paragraph(f"<b>{period}:</b> {desc}", styles['body']))

# Certifications
story.append(section("Certifications"))
story.append(Paragraph(
    "C++ Essentials 2, JavaScript Essentials 1 &amp; 2, and Operating Systems Basics (Cisco Networking Academy) "
    "&nbsp;&#8226;&nbsp; Master Data Analysis &amp; EDA for Machine Learning Projects, ChatGPT Masterclass, and "
    "Ethically Hack the Planet Parts 1 &amp; 2 (Udemy) &nbsp;&#8226;&nbsp; Get Started with SQL Analytics and BI "
    "on Databricks (Databricks) &nbsp;&#8226;&nbsp; Excel Automation using ChatGPT (Verified Certificate)",
    styles['body']
))

# Interests
story.append(section("Interests"))
story.append(Paragraph(
    "Pulling apart new frameworks and AI tools to see what they're actually good for, tinkering with small "
    "Flutter and game side-projects, and studying how production codebases are structured beyond textbook examples.",
    styles['body']
))

doc.build(story)
print("Resume generated.")
