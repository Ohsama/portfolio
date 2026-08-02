import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

pdf_path = r"c:\Users\R5_Win10\Desktop\portfolio\screenshots\OussamaBoukhalfa_TechnicalSpec.pdf"

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=36,
    leftMargin=36,
    topMargin=36,
    bottomMargin=36
)

styles = getSampleStyleSheet()

# Custom styles
style_header_name = ParagraphStyle(
    'HeaderName',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=20,
    leading=24,
    textColor=colors.HexColor('#0c1017')
)

style_header_title = ParagraphStyle(
    'HeaderTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=13,
    textColor=colors.HexColor('#8b6420')
)

style_header_contact = ParagraphStyle(
    'HeaderContact',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=12,
    alignment=2, # Right aligned
    textColor=colors.HexColor('#4a5568')
)

style_section_title = ParagraphStyle(
    'SectionTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10.5,
    leading=14,
    textColor=colors.HexColor('#0c1017'),
    spaceAfter=4
)

style_body = ParagraphStyle(
    'BodyTextCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=12,
    textColor=colors.HexColor('#2d3748')
)

style_bullet = ParagraphStyle(
    'BulletText',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8,
    leading=11,
    textColor=colors.HexColor('#1a202c')
)

elements = []

# Top Header Table (Left: Name & Role, Right: Contact Details)
header_left = Paragraph(
    "<b>OUSSAMA BOUKHALFA</b><br/>"
    "<font color='#8b6420'><b>SYSTEMS ENGINEER &amp; SAAS ARCHITECT</b></font><br/>"
    "<font size='8' color='#555555'>Production Infrastructure · Cloud Video Pipelines · Multi-Tenant SaaS</font>",
    style_header_name
)

header_right = Paragraph(
    "<b>Email:</b> boukhalfaoussama02@gmail.com<br/>"
    "<b>GitHub:</b> github.com/Ohsama<br/>"
    "<b>LinkedIn:</b> linkedin.com/in/oussama-it-boukhalfa<br/>"
    "<b>Location:</b> Algeria (EU Blue Card Eligible)",
    style_header_contact
)

header_table = Table([[header_left, header_right]], colWidths=[340, 200])
header_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 0),
]))

elements.append(header_table)
elements.append(Spacer(1, 8))
elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#8b6420'), spaceAfter=8))

# Core Value & Key Metrics Banner
metrics_data = [
    [
        Paragraph("<b>&lt;2s Streaming Latency</b><br/><font size='7.5' color='#666666'>RTSP to HLS Pipeline</font>", style_body),
        Paragraph("<b>0% Archive Frame Loss</b><br/><font size='7.5' color='#666666'>Thread-Safe Ring Buffer</font>", style_body),
        Paragraph("<b>58 Wilayas Automated</b><br/><font size='7.5' color='#666666'>DZ Logistics Network</font>", style_body),
        Paragraph("<b>7 Systems Shipped</b><br/><font size='7.5' color='#666666'>Production Enterprise</font>", style_body)
    ]
]
metrics_table = Table(metrics_data, colWidths=[135, 135, 135, 135])
metrics_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f7f4ef')),
    ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#e2d8c7')),
    ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2d8c7')),
    ('TOPPADDING', (0,0), (-1,-1), 6),
    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
]))
elements.append(metrics_table)
elements.append(Spacer(1, 10))

# Section 1: Production Systems Architecture Portfolio
elements.append(Paragraph("PRODUCTION SYSTEMS SPECIFICATIONS", style_section_title))

systems_data = [
    [Paragraph("<b>System / Product</b>", style_bullet), Paragraph("<b>Architecture & Key Innovation</b>", style_bullet), Paragraph("<b>Tech Stack</b>", style_bullet)],
    [
        Paragraph("<b>Cloud VSaaS Pipeline</b><br/><font color='#666666'>Video Surveillance</font>", style_bullet),
        Paragraph("Dual-pipeline video bridge (RTSP → FFmpeg → HLS & Ring Buffer). Sub-2s streaming latency with zero frame loss.", style_bullet),
        Paragraph("Python, FFmpeg, MinIO S3, Docker, React", style_bullet)
    ],
    [
        Paragraph("<b>RSManager SaaS</b><br/><font color='#666666'>Multi-Tenant POS</font>", style_bullet),
        Paragraph("Multi-tenant repair shop management with PostgreSQL Row-Level Security (RLS) & native ESC/POS thermal printing.", style_bullet),
        Paragraph("FastAPI, PostgreSQL RLS, React, ESC/POS", style_bullet)
    ],
    [
        Paragraph("<b>Jibli Delivery Platform</b><br/><font color='#666666'>Logistics Engine</font>", style_bullet),
        Paragraph("Real-time courier dispatch with WebSocket state machine, proximity matching, and offline-first SQLite sync.", style_bullet),
        Paragraph("Flutter, WebSocket, Python, SQLite", style_bullet)
    ],
    [
        Paragraph("<b>Health Monitor IoT</b><br/><font color='#666666'>Medical Telemetry</font>", style_bullet),
        Paragraph("IoT patient telemetry dashboard with real-time biometric anomaly thresholds and WebSocket broadcast.", style_bullet),
        Paragraph("ESP32, Python, WebSockets, Chart.js", style_bullet)
    ],
    [
        Paragraph("<b>DZ Lead Gen Engine</b><br/><font color='#666666'>Scraping & Lead Pipeline</font>", style_bullet),
        Paragraph("Distributed B2B lead discovery tool mapping 58 wilayas with automated phone verification & CSV export.", style_bullet),
        Paragraph("Python, Playwright, Pandas, BeautifulSoup", style_bullet)
    ],
    [
        Paragraph("<b>DocsGuards Scheduler</b><br/><font color='#666666'>Medical Roster</font>", style_bullet),
        Paragraph("Stateful fairness-guaranteed round-robin algorithm with holiday memory for doctor on-call shifts.", style_bullet),
        Paragraph("Python, Flask, Round-Robin Engine", style_bullet)
    ]
]

systems_table = Table(systems_data, colWidths=[130, 270, 140])
systems_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0c1017')),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e0')),
    ('TOPPADDING', (0,0), (-1,-1), 4),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
]))

# Fix header text color in header row
for i in range(3):
    systems_data[0][i].style.textColor = colors.white

elements.append(systems_table)
elements.append(Spacer(1, 10))

# Section 2: Core Engineering Capabilities & Relocation Framework
elements.append(Paragraph("TECHNICAL STACK & RELOCATION ELIGIBILITY", style_section_title))

stack_data = [
    [
        Paragraph("<b>Backend Systems:</b> Python (FastAPI, Flask, SQLAlchemy), Node.js, REST APIs, WebSockets, PostgreSQL, SQLite", style_body),
        Paragraph("<b>Mobile & Frontend:</b> Flutter & Dart, React 18, TypeScript, React Native, Expo SDK 54, TailwindCSS, Zustand", style_body)
    ],
    [
        Paragraph("<b>Infrastructure & Cloud:</b> Docker, Nginx, MinIO S3, Supabase, Cloudflare, FFmpeg, Linux Systems Administration", style_body),
        Paragraph("<b>Systems Design:</b> Offline-First Arch, Multi-Tenant RLS, IoT Telemetry, Event Queues, Proximity Logistics", style_body)
    ]
]
stack_table = Table(stack_data, colWidths=[270, 270])
stack_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
    ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
    ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
]))
elements.append(stack_table)
elements.append(Spacer(1, 10))

# Section 3: Engagement Model & International Mobility
elements.append(Paragraph("ENGAGEMENT MODEL & INTERNATIONAL MOBILITY", style_section_title))

mobility_text = Paragraph(
    "<b>Engagement Model:</b> Available for high-complexity contract engagements, technical architecture consultation, and full-stack system execution.<br/>"
    "<b>Visa & Relocation Status:</b> Based in Algeria — Open & Ready to Relocate. Eligible for <b>EU Blue Card</b> (Germany/EU), <b>Passeport Talent</b> (France), <b>Skilled IT Shortage Fast-Track</b>, and <b>Global Talent / Express Entry</b>.",
    style_body
)
mobility_table = Table([[mobility_text]], colWidths=[540])
mobility_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f7f0e4')),
    ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#d6c5aa')),
    ('TOPPADDING', (0,0), (-1,-1), 6),
    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
]))
elements.append(mobility_table)

doc.build(elements)
print("PDF compiled successfully at:", pdf_path)
