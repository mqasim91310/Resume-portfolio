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
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=24, textColor=DARK, spaceAfter=2),
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
story.append(Paragraph("Computer Science Student &nbsp;|&nbsp; Flutter &amp; Full-Stack Developer", styles['title']))
story.append(Paragraph(
    "Lahore, Pakistan &nbsp;&#8226;&nbsp; mqasim91310@gmail.com &nbsp;&#8226;&nbsp; +92 320 658 9259 "
    "&nbsp;&#8226;&nbsp; github.com/mqasim91310 &nbsp;&#8226;&nbsp; linkedin.com/in/muhammad-qasim-cs",
    styles['contact']
))
story.append(hr())

# Summary
story.append(section("Professional Summary"))
story.append(Paragraph(
    "Motivated BS Computer Science student at Riphah International University (5th Semester) with hands-on "
    "experience building full-stack web applications, mobile apps, DSA-driven C++ systems, and interactive games. "
    "Proficient in Java, C++, Assembly Language (x86/8086), and cross-platform development using Flutter and Unity. "
    "Actively seeking a Software Engineering internship to apply academic knowledge in a real-world engineering "
    "environment.",
    styles['body']
))

# Education
story.append(section("Education"))
story.append(Paragraph("Bachelor of Science in Computer Science (BSCS)", styles['job_title']))
story.append(Paragraph("Riphah International University, Lahore, Pakistan &nbsp;|&nbsp; Expected Graduation: June 2027 &nbsp;|&nbsp; Currently in 5th Semester", styles['job_meta']))

# Projects
story.append(section("Featured Projects"))

projects = [
    ("Al Kabir Developers — Real Estate Web Application", "React.js, Node.js, MySQL",
     "Engineered a full-stack real estate web app with live property listings, user registration, and an admin dashboard; normalized MySQL schema improved query efficiency by 25%."),
    ("Street Rush — Endless Runner Mobile Game", "Unity Engine, C#",
     "Shipped a complete endless-runner game with procedural obstacle generation, scoring, progressive difficulty scaling, and object-pooled rendering."),
    ("Brew & Bless Coffee Shop — Mobile Application", "Flutter, Dart, Firebase",
     "Built a cross-platform ordering app with real-time Firestore sync, custom UI widgets, and secure Firebase Authentication."),
    ("Flight Reservation System", "C++, Linked Lists, Queues",
     "Console-based reservation system using linked lists for seat management, queues for waitlists, and merge sort for flight listings."),
    ("Restaurant Management System", "Java (OOP), MySQL/PostgreSQL",
     "Console application applying encapsulation, inheritance, and polymorphism with CRUD-backed order management and automated billing."),
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
    [Paragraph("Mobile & Game Dev", styles['skillcat']), Paragraph("Flutter, Unity Engine", styles['skillval'])],
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
    ("Semester 1-2 (2022-2023)", "Foundations of Programming, OOP &amp; Data Structures — built a console calculator and a Java Library Management System."),
    ("Semester 3-4 (2023-2024)", "Web &amp; Database Fundamentals, Operating Systems — built an e-commerce frontend and a C-based simple shell."),
    ("Semester 5 (2024-2025)", "Computer Networks, Software Engineering, Theory of Automata — developed a Python socket-based chat application."),
    ("Upcoming", "Artificial Intelligence, Flutter, Cloud Computing (AWS), Big Data Analytics, Capstone Project."),
]
for period, desc in journey_items:
    story.append(Paragraph(f"<b>{period}:</b> {desc}", styles['body']))

# Interests
story.append(section("Interests"))
story.append(Paragraph(
    "Exploring new technologies, contributing to open-source projects, participating in hackathons, "
    "and continuous learning across the modern software stack.",
    styles['body']
))

doc.build(story)
print("Resume generated.")
