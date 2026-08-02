# MASTER WORKPLAN — Oussama Boukhalfa Portfolio
**Portfolio Repository:** `https://github.com/Ohsama/portfolio`  
**Live URL:** `https://ohsama.github.io/portfolio/`  
**Local Dev:** `http://localhost:8080` (python -m http.server 8080 from portfolio root)  
**Supabase Project:** `alsizocdqqftxmqoqfph` (region: eu-central-1)  
**Email Routing:** `boukhalfaoussama02@gmail.com` via Web3Forms  

---

## Agent Instructions

> Any agent picking up this document MUST:
> 1. Read this entire plan before touching any file.
> 2. Mark tasks `[/]` **IN PROGRESS** before starting.
> 3. Run the **Verification Checklist** after every task.
> 4. Mark `[x]` **DONE** only after verification passes.
> 5. If verification fails, note the failure inline and restart the task.
> 6. Commit and push to GitHub after every phase completion.
> 7. Update this document after every session.

### Status Key
```
[ ] — Not Started
[/] — In Progress
[x] — Complete & Verified
[!] — Blocked / Failed — reason noted inline
```

---

## FILE MAP (Full Project Structure)
```
portfolio/
├── index.html          # Main HTML — structure, all sections
├── style.css           # Full design system — dual theme tokens + all component CSS
├── app.js              # Scroll reveal, project modals, terminal engine, contact form
├── theme.js            # Theme toggle + radial ripple animation engine
├── translations.js     # i18n strings — EN / FR / DE / AR
├── i18n.js             # i18n DOM injector + localStorage lang persistence
├── screenshots/
│   ├── photo.jpg       # Executive portrait (hero section)
│   ├── VSaaS.jpeg
│   ├── RSMGR.PNG
│   ├── Jibli.jpg
│   ├── hcmonitor3.jpg
│   ├── 11.03.2026_13.45.55_REC.png  (DZ Lead Gen)
│   ├── 11.03.2026_13.47.39_REC.png  (DZ Schools)
│   └── docsguard.jpg
```

---

## PHASE 0 — Foundation (COMPLETED)
> All items below are complete. Verify before building on top of them.

### 0.1 Core Structure
- [x] `index.html` — Full semantic page structure with all 7 sections
- [x] `style.css` — Full design system: tokens, dual theme, all components
- [x] `app.js` — Scroll reveal, project grid/filter, modal system, terminal, contact form
- [x] `theme.js` — Dark ↔ Beige ripple animation engine

**Verify:**
```
[ ] Open http://localhost:8080 — page loads without console errors
[ ] All 7 sections visible: Hero, Marquee, Philosophy, Work, Terminal, Stack, Contact
[ ] No broken images in browser DevTools Network tab
```

---

### 0.2 Dual Theme System
- [x] Dark Obsidian theme (`data-theme="dark"`) — `#080c12` base
- [x] Beige Liquid Glass theme (`data-theme="beige"`) — `#f2ebe0` gradient
- [x] Theme toggle button (Moon/Sun SVG) in navbar next to language selector
- [x] Radial clip-path ripple expansion animation on toggle (from button center)
- [x] Button 360° spin animation on theme switch
- [x] Automatic opening transition: Dark → Beige on page load (650ms delay)
- [x] Theme saved in `localStorage` key `portfolio_theme`
- [x] View Transitions API used (clip-path overlay fallback for legacy browsers)

**Verify:**
```
[ ] Page opens in Dark mode first, then transitions to Beige after ~650ms
[ ] Toggle button switches theme with radial ripple animation
[ ] Reload page — theme persists from localStorage
[ ] Both themes: check navbar, cards, terminal, modal, footer all adapt correctly
[ ] No FOUC (Flash of Unstyled Content) on load
```

---

### 0.3 Project Grid & Modal System
- [x] 7 project cards in 3-column responsive grid
- [x] Filter tabs: All / Cloud & Video / SaaS / Mobile / Automation / Algorithms
- [x] Click card → bottom-sheet modal slides up from bottom
- [x] Modal panels: screenshot (left) + detail panel (right)
- [x] Screenshot click → full-screen lightbox zoom
- [x] Close: X button / backdrop click / Escape key
- [x] PROJECTS data object in `app.js` — single source of truth for all modal content

**Project Data Map (what screenshot each project uses):**
```
vsaas      → screenshots/VSaaS.jpeg
rsmanager  → screenshots/RSMGR.PNG
jibli      → screenshots/Jibli.jpg
hcmonitor  → screenshots/hcmonitor3.jpg
leadgen    → screenshots/11.03.2026_13.45.55_REC.png
docsguard  → screenshots/docsguard.jpg
dzschools  → screenshots/11.03.2026_13.47.39_REC.png
```

**Verify:**
```
[ ] Click all 7 project cards — modals open with correct screenshot + content
[ ] Click screenshot in modal — lightbox opens full screen
[ ] Filter tabs hide/show correct cards smoothly
[ ] Escape key and backdrop click close modal
[ ] Modal is scrollable if content overflows (max-height: 90vh)
```

---

### 0.4 Terminal
- [x] Functional retro terminal with input field
- [x] Commands: help, whoami, vsaas, rsmanager, jibli, hcmonitor, leadgen, docsguard, dzschools, stack, contact, clear
- [x] Quick-command pills (clickable buttons above terminal)
- [x] `runTermCmd()` exposed globally so pills call it via `onclick`
- [x] Terminal re-bound correctly after `clear` command
- [x] HTML sanitized via `escHtml()` before injection

**Verify:**
```
[ ] Type each command manually — correct output appears
[ ] Click each quick-command pill — correct output appears
[ ] Type `clear` — terminal resets cleanly, input still works
[ ] Type unknown command — shows "not recognized" message
[ ] Terminal input auto-focuses when body is clicked
```

---

### 0.5 i18n System (4 Languages)
- [x] Languages: English (EN), French (FR), German (DE), Arabic (AR)
- [x] `translations.js` — all strings keyed by `data-i18n` attributes
- [x] `i18n.js` — DOM injector + `localStorage` key `portfolio_lang`
- [x] Language selector `<select id="lang-select">` in navbar
- [x] RTL support: Arabic switches `dir="rtl"` on `<html>` element
- [x] Relocation drawer badge translated in all 4 languages
- [x] Contact form placeholder text translated via `data-i18n-placeholder`

**Verify:**
```
[ ] Switch to FR — all section labels / hero text update
[ ] Switch to DE — all section labels / hero text update
[ ] Switch to AR — page switches to RTL layout, text is Arabic
[ ] Reload page — language persists from localStorage
[ ] Form placeholders change language on switch
```

---

### 0.6 Hero Section
- [x] Executive portrait displayed (`screenshots/photo.jpg`)
- [x] Photo masked with radial gradient (blending into background)
- [x] Floating Glass Social Pill (GitHub / LinkedIn / Email icons)
  - GitHub → opens `https://github.com/Ohsama` in new tab
  - LinkedIn → opens LinkedIn profile in new tab
  - Email icon → scrolls to `#contact` section AND copies email to clipboard
- [x] Relocation Drawer Badge (bottom of photo frame)
  - Default: "Based in Algeria" + "Open & Ready to Relocate"
  - Hover/focus: expands drawer with 4 visa eligibility items
  - Arrow icon nudges continuously to invite hover
  - Arrow rotates 90° when drawer opens
- [x] Availability tag (top of hero left, no dot/gimmick)
- [x] Metrics strip: `<2s Streaming Latency`, `0% Archive Frame Loss`, `58 Wilayas`, `7 Systems`
- [x] Two CTAs: "View Projects" (primary) + "Open Terminal" (ghost)

**Verify:**
```
[ ] Photo renders correctly — not stretched, masked at edges
[ ] GitHub / LinkedIn icons open correct URLs in new tab
[ ] Email icon scrolls to contact section AND shows "Email copied" toast
[ ] Hover relocation badge → drawer expands with all 4 items visible
[ ] Arrow nudge animation playing on page load
[ ] Metrics strip visible below CTAs
```

---

### 0.7 Contact Form — Dual Backend
- [x] Supabase PostgreSQL table `public.contact_submissions` created
  - Columns: `id (UUID)`, `name`, `email`, `engagement_type`, `brief`, `created_at`
  - RLS enabled with anonymous insert policy
- [x] Form submits to Supabase REST API `/rest/v1/contact_submissions`
- [x] Form simultaneously dispatches to Web3Forms API → email to `boukhalfaoussama02@gmail.com`
- [x] `Promise.allSettled()` — both requests fire in parallel, neither blocks the other
- [x] Success: submit button hides, confirmation message shows, toast fires

**Verify:**
```
[ ] Fill form (Name: "Test", Email: "test@test.com", Type: any, Brief: "test")
[ ] Submit — button shows "Sending…" then confirmation message appears
[ ] Check Supabase dashboard → Table Editor → contact_submissions → row appears
[ ] Check Gmail inbox — email notification received from Web3Forms
[ ] Test with empty Name or Email → toast error fires, form does NOT submit
```

---

### 0.8 Deployment
- [x] Repository: `https://github.com/Ohsama/portfolio` (branch: `main`)
- [x] GitHub Pages enabled — serving from `main` / root
- [x] Live URL: `https://ohsama.github.io/portfolio/`

**Verify:**
```
[ ] Open https://ohsama.github.io/portfolio/ — site loads
[ ] No 404 errors on screenshot files
[ ] Theme transition animation plays on load
[ ] Contact form submits successfully on live URL
```

---

## PHASE 1 — Copy & Trust Signal Upgrade ⬅️ NEXT PRIORITY
> Highest ROI changes. No complex code. Immediate positioning impact.

### 1.1 Hero Value Proposition Rewrite
**Status:** `[ ]`  
**File:** `index.html` + `translations.js`  
**Goal:** Replace "Building systems that hold under real-world pressure" with high-ticket positioning copy.

**New Hero Headline (EN):**
```
I de-risk complex
technical execution
for high-growth ventures.
```

**New Hero Sub (EN):**
```
Production systems that survive scale, audits, and the gap between 
MVP and enterprise. Backend architecture, cloud pipelines, 
and SaaS infrastructure — owned end-to-end.
```

**New Availability Tag (EN):**
```
Accepting High-Complexity Engagements
```

**Tasks:**
```
[ ] Update hero_headline key in translations.js (all 4 languages)
[ ] Update hero_sub key in translations.js (all 4 languages)
[ ] Update hero_availability key (all 4 languages)
[ ] Update hero-headline in index.html default text
[ ] Update hero-sub in index.html default text
```

**Verify:**
```
[ ] New headline renders correctly in all 4 language modes
[ ] Text does not overflow hero container on mobile (< 480px)
[ ] Italic <em> emphasis still styled correctly
```

---

### 1.2 Social Proof / Testimonials Section
**Status:** `[ ]`  
**File:** `index.html` + `style.css`  
**Location:** Insert between `#work` (projects) and `#terminal-section`  
**Goal:** One high-impact testimonial or client reference block. Even one quote is a trust signal.

**Design Spec:**
- Large pull-quote in italic, attribution below
- Glass card layout, amber left-border accent
- 2-column layout on desktop (quote left, client info right)
- If no real testimonial yet: use a placeholder styled block labeled "Testimonial — Available Upon Request" or a professional endorsement from LinkedIn

**Tasks:**
```
[ ] Add #testimonials section HTML to index.html
[ ] Add CSS: .testimonial-section, .testimonial-card, .pull-quote
[ ] Add i18n keys for testimonials in translations.js
[ ] Add section link to navbar
[ ] If real testimonial exists: use it; otherwise use a structured placeholder
```

**Verify:**
```
[ ] Section renders between #work and #terminal
[ ] Glass card adapts to both dark and beige themes
[ ] Quote text readable at all font sizes
[ ] Scroll reveal animation triggers correctly
```

---

### 1.3 Engagement Process Section ("How I Work")
**Status:** `[ ]`  
**File:** `index.html` + `style.css`  
**Location:** Insert between `#testimonials` and `#terminal-section`  
**Goal:** Show senior-partner positioning. CTOs need to know the engagement is structured, low-risk, and deliverable-driven.

**Design Spec:**
- 4 horizontal numbered steps on desktop, vertical on mobile
- Steps:
  1. **Discovery** — Requirements audit, threat model, architecture decision record
  2. **Design** — System architecture, data model, API contract, deployment plan
  3. **Build** — Disciplined development with staging environment and milestone sign-offs
  4. **Handover** — Documentation, runbook, training, post-launch monitoring
- Connected by a subtle animated dashed line
- Each step: number, title, 2-line description

**Tasks:**
```
[ ] Add #process section HTML to index.html
[ ] Add CSS: .process-section, .process-steps, .process-step, .process-connector
[ ] Dashed connector line between steps (desktop only)
[ ] Add i18n keys in translations.js (all 4 languages)
[ ] Add animated dashed line (CSS stroke-dashoffset animation on scroll)
```

**Verify:**
```
[ ] All 4 steps visible and numbered 01–04
[ ] Connector line renders on desktop, hidden on mobile
[ ] Both themes render correctly
[ ] Scroll reveal animation triggers
[ ] i18n strings switch on language change
```

---

## PHASE 2 — High-Ticket Conversion Features

### 2.1 Calendly Booking Modal
**Status:** `[ ]`  
**File:** `index.html` + `style.css` + `app.js`  
**Goal:** Replace or augment contact form CTA with 1-click 15-min technical audit booking.

**Options:**
- **A (Recommended):** Embed `cal.com` (open-source, no fees) popup widget.
- **B:** Embed Calendly popup widget (needs account).

**Tasks:**
```
[ ] Create Cal.com account at https://cal.com (free)
[ ] Create "15-Min Technical Audit" event type
[ ] Get embed URL
[ ] Add "Schedule Technical Audit" CTA button in contact section (alongside form)
[ ] Add Cal.com inline popup script to index.html
[ ] Style the button to match design system (amber ghost button)
[ ] Add i18n key: "schedule_audit_btn" in translations.js
```

**Verify:**
```
[ ] Button renders in contact section
[ ] Click button → Cal.com modal opens (not new tab)
[ ] Modal adapts to both themes (overlay works)
[ ] Mobile: button and modal work correctly
```

---

### 2.2 PDF Technical Spec / Architecture Resume Download
**Status:** `[ ]`  
**File:** New `OussamaBoukhalfa_TechnicalSpec.pdf` + `index.html`  
**Goal:** Enterprise recruiters and CTOs need a printable 1-page summary.

**PDF Content (1 page):**
```
Header:  Oussama Boukhalfa — Systems Engineer & SaaS Architect
         boukhalfaoussama02@gmail.com | github.com/Ohsama | linkedin.com/in/oussama-it-boukhalfa

Systems Built:  [7 systems, bullet format with key metric each]
Technical Stack: [grouped: Backend / Mobile / Infra / Design]
Enterprise Capabilities: [Sub-2s Latency, 0% Frame Loss, Multi-Tenant RLS, Offline-First]
Engagement Model: [Discovery → Design → Build → Handover]
Visa & Relocation: [EU Blue Card eligible, Open to relocation]
```

**Tasks:**
```
[ ] Design PDF using HTML/CSS print stylesheet or Figma export
[ ] Save as screenshots/OussamaBoukhalfa_TechnicalSpec.pdf
[ ] Add download button to navbar (icon: download arrow) AND contact section
[ ] Button: <a href="screenshots/OussamaBoukhalfa_TechnicalSpec.pdf" download>
[ ] Add i18n key: "download_spec" in translations.js
```

**Verify:**
```
[ ] Button renders in both navbar and contact section
[ ] Click → PDF downloads (not opens in tab)
[ ] PDF is exactly 1 page, professional layout
[ ] Filename is descriptive when downloaded
```

---

## PHASE 3 — Architecture Visualizer (Credibility Differentiator)

### 3.1 Interactive System Architecture Playground
**Status:** `[ ]`  
**File:** New section in `index.html` + `style.css` + `architecture.js`  
**Location:** After `#work`, before `#testimonials`  
**Goal:** Animated, clickable node data-flow diagrams showing how each major system's architecture works.

**Systems to Visualize:**
```
A. VSaaS Video Pipeline:
   RTSP Camera → Python Bridge → FFmpeg (dual pipeline)
   → [HLS 2s Playlist] → React Native Client (Live)
   → [60s Segment] → Thread-Safe Queue → MinIO S3 (Archive)

B. Jibli Delivery:
   Customer App → FastAPI → Supabase PostgreSQL
   → WebSocket Broadcast → [Courier App / Merchant App]
   → GPS Stream → Proximity Algorithm → Order Dispatch

C. RSManager POS:
   Cashier UI → JWT Auth → FastAPI → SQLAlchemy ORM
   → PostgreSQL (RBAC) → [4 Role Tiers: Owner/Manager/Technician/Cashier]
   → Barcode Scanner → python-escpos → Thermal Receipt
```

**Design Spec:**
- Tab selector: `[VSaaS]  [Jibli]  [RSManager]`
- SVG node graph with labeled boxes connected by animated dashed arrows
- Data "packet" dot animates along the path on loop (CSS/JS keyframes)
- Hover any node → tooltip showing tech detail
- Active node highlighted in amber on hover

**Tasks:**
```
[ ] Create #architecture section in index.html
[ ] Create architecture.js with:
    - ARCHITECTURES data object (nodes + edges per system)
    - SVG renderer function
    - Packet animation loop (requestAnimationFrame)
    - Node hover tooltip handler
    - Tab switch with fade transition
[ ] Style: .arch-section, .arch-tabs, .arch-canvas, .arch-node, .arch-edge, .arch-packet, .arch-tooltip
[ ] All 3 systems fully animated
[ ] Add script include to index.html
[ ] Add section to navbar
[ ] Add i18n keys for node labels (EN/FR/DE/AR)
```

**Verify:**
```
[ ] All 3 tabs switch cleanly
[ ] Packets animate along correct paths in all 3 systems
[ ] Hover tooltip appears with correct tech detail per node
[ ] Animation runs smoothly (60fps, no jank — check DevTools Performance tab)
[ ] Works in both dark and beige themes
[ ] No memory leaks — animation pauses when section not in viewport (IntersectionObserver)
[ ] Mobile: scales down gracefully, horizontal scroll if needed
```

---

## PHASE 4 — Motion & Polish

### 4.1 Magnetic Button Effect (CTAs only)
**Status:** `[ ]`  
**File:** `app.js`  
**Goal:** Primary CTA buttons subtly pull toward cursor on hover. Applies ONLY to `.btn-primary` and `.nav-hire` — NOT globally.

**Implementation:**
```javascript
// Attach to .btn-primary and .nav-hire elements
el.addEventListener('mousemove', (e) => {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
});
el.addEventListener('mouseleave', () => {
  el.style.transform = '';
});
```

**Tasks:**
```
[ ] Add initMagneticButtons() function in app.js
[ ] Call on DOMContentLoaded
[ ] Apply only to .btn-primary and .nav-hire (NOT project cards or nav links)
[ ] Disable on touch devices (check: 'ontouchstart' in window)
[ ] Ensure transition is smooth (CSS transition: transform 0.2s ease on default state)
```

**Verify:**
```
[ ] Desktop: CTAs subtly move toward cursor — effect feels smooth, not jittery
[ ] Desktop: Button snaps back smoothly on mouse leave
[ ] Mobile/Touch: NO magnetic effect (fallback graceful)
[ ] Other elements (cards, nav links) are NOT magnetic
[ ] Performance: no lag with effect active (60fps in DevTools)
```

---

### 4.2 Interactive Screenshot Hotspots (Modal)
**Status:** `[ ]`  
**File:** `app.js` + `style.css` + `PROJECTS` data in `app.js`  
**Goal:** Add 2-3 pulsing annotation pins on project screenshots inside modals.

**Design Spec:**
- Small pulsing amber circle positioned absolutely over screenshot
- Hover → tooltip expands with engineering annotation (e.g., *"WebSocket state machine — order status broadcast to 3 concurrent clients"*)
- 2-3 pins per project max — only for VSaaS, Jibli, RSManager

**Data structure addition to PROJECTS:**
```javascript
hotspots: [
  { x: '32%', y: '45%', label: 'Thread-Safe Queue: prevents frame loss during network drop' },
  { x: '68%', y: '20%', label: 'HLS Playlist: 2-second rolling window for live feed' }
]
```

**Tasks:**
```
[ ] Add hotspots array to vsaas, jibli, rsmanager in PROJECTS data object
[ ] In openProjectModal(), render hotspot pins over .modal-screenshot
[ ] CSS: .hotspot-pin (pulse animation), .hotspot-tooltip (glass card)
[ ] Tooltip appears on hover, positioned to avoid overflow
[ ] Pins removed when modal closes
```

**Verify:**
```
[ ] Open VSaaS modal → 2 pins visible on screenshot
[ ] Hover pin → tooltip appears with annotation text
[ ] Tooltip doesn't overflow modal bounds
[ ] Pins removed cleanly when modal closes
[ ] Both themes render pin + tooltip correctly
```

---

### 4.3 Thought Leadership / Engineering Notes Section
**Status:** `[ ]`  
**File:** `index.html` + `style.css`  
**Location:** After `#capabilities` (Stack section), before `#contact`  
**Goal:** 2-3 short engineering note cards showing domain depth. Positions Oussama as a thought leader, not just an implementer.

**Notes Content:**
```
Note 1: "Why Thread-Safe Queues Beat Database Buffers for RTSP Archive Reliability"
         Tags: [Video Streaming] [Python] [Resilience]

Note 2: "Multi-Tenant PostgreSQL: Row-Level Security as the Only Safe Isolation Layer"
         Tags: [SaaS] [PostgreSQL] [Security]

Note 3: "The Hidden Cost of Naive WebSocket Fanout in Delivery Logistics"
         Tags: [WebSockets] [Logistics] [Architecture]
```

**Design Spec:**
- 3-column grid of glass cards with amber accent top-border
- Each card: read-time badge, title, 2-line teaser, tags
- Optional: clicking opens a short inline reading view (300-500 word essay)
- Footer note: "More technical writing available on request"

**Tasks:**
```
[ ] Add #engineering-notes section in index.html with 3 note cards
[ ] Write 200-300 word content for each note
[ ] CSS: .notes-grid, .note-card, .note-accent, .note-tag
[ ] Optional: inline expand/collapse for full note content
[ ] Add section to navbar
[ ] Add i18n keys (at minimum: section titles and tags)
```

**Verify:**
```
[ ] 3 cards render in grid
[ ] Both themes apply correctly
[ ] Tags have correct styling
[ ] Scroll reveal triggers on section entry
```

---

## PHASE 5 — SEO & Performance Hardening

### 5.1 SEO Meta Tags
**Status:** `[ ]`  
**File:** `index.html`

**Tasks:**
```
[ ] Add canonical URL: <link rel="canonical" href="https://ohsama.github.io/portfolio/">
[ ] Add OG image meta tag (screenshot of hero section)
[ ] Add Twitter Card meta tags
[ ] Add structured data (JSON-LD Schema.org Person)
[ ] Verify title tag: "Oussama Boukhalfa — Systems Engineer & SaaS Architect | Algeria"
[ ] Verify meta description (155 chars max)
```

**Verify:**
```
[ ] Paste URL into https://opengraph.xyz — OG card renders
[ ] Paste URL into https://validator.schema.org — no errors
[ ] Lighthouse SEO score ≥ 90 (run in DevTools)
```

---

### 5.2 Performance Audit
**Status:** `[ ]`

**Tasks:**
```
[ ] Run Lighthouse audit (DevTools → Lighthouse → Desktop + Mobile)
[ ] Compress all screenshots: use https://squoosh.app — target < 80KB each
[ ] Add loading="lazy" on all modal screenshots and non-hero images
[ ] Verify fonts load with font-display: swap
[ ] Verify no render-blocking scripts in <head> (theme.js is fine as it prevents FOUC)
```

**Target Scores:**
```
Performance:    ≥ 85 (Desktop), ≥ 70 (Mobile)
Accessibility:  ≥ 95
Best Practices: ≥ 90
SEO:            ≥ 90
```

---

## PHASE 6 — Live Deployment Verification

### 6.1 GitHub Pages Push Protocol
> Run after every phase completion.

```bash
# From portfolio/ directory:
git add .
git commit -m "[Phase X] Description of changes"
git push origin main
```

**Post-push checks:**
```
[ ] GitHub Actions tab — no build failures
[ ] https://ohsama.github.io/portfolio/ loads within 2 min of push
[ ] Hard refresh (Ctrl+Shift+R) shows new version
[ ] No 404 errors in Network tab
[ ] Theme animation plays on load
```

---

### 6.2 Supabase Database Health Check
> Run monthly or after form updates.

```sql
-- Run in Supabase SQL Editor:
SELECT COUNT(*), MIN(created_at), MAX(created_at)
FROM public.contact_submissions;

-- View latest submissions:
SELECT * FROM public.contact_submissions
ORDER BY created_at DESC
LIMIT 10;
```

**Verify:**
```
[ ] Table accessible in Supabase dashboard
[ ] RLS policy still active (anon can INSERT, cannot SELECT)
[ ] Test form submission → row appears in table
[ ] Email notification received in inbox
```

---

## GLOBAL COMPLETION TRACKER

| Phase | Task | Status | Commit |
|-------|------|--------|--------|
| 0.1 | Core Structure | [x] | Initial build |
| 0.2 | Dual Theme System | [x] | `eeb77ac` |
| 0.3 | Project Grid & Modals | [x] | Initial build |
| 0.4 | Terminal Engine | [x] | Initial build |
| 0.5 | i18n (4 languages) | [x] | Initial build |
| 0.6 | Hero Section | [x] | `27bd332` |
| 0.7 | Contact Form Dual Backend | [x] | `4b99311` |
| 0.8 | GitHub Pages Deployment | [x] | `1540c81` |
| 0.9 | Relocation Drawer Badge | [x] | `911c568` |
| 1.1 | Hero Copy Rewrite | [ ] | — |
| 1.2 | Social Proof / Testimonials | [ ] | — |
| 1.3 | Engagement Process Section | [ ] | — |
| 2.1 | Calendly Booking Modal | [ ] | — |
| 2.2 | PDF Technical Spec Download | [ ] | — |
| 3.1 | Architecture Visualizer | [ ] | — |
| 4.1 | Magnetic Button Effect | [ ] | — |
| 4.2 | Screenshot Hotspot Pins | [ ] | — |
| 4.3 | Engineering Notes Section | [ ] | — |
| 5.1 | SEO Meta Tags | [ ] | — |
| 5.2 | Performance Audit | [ ] | — |
| 6.1 | Deployment Verification | [x] | `911c568` |
| 6.2 | Supabase Health Check | [x] | `4b99311` |

---

## AGENT HANDOFF CHECKLIST
> Any new agent starting work MUST complete this before touching files.

```
[ ] Read this entire MASTER_WORKPLAN.md
[ ] Run: python -m http.server 8080 from portfolio/ directory
[ ] Open http://localhost:8080 and verify the site loads without errors
[ ] Open browser DevTools console — confirm 0 JS errors
[ ] Identify which phase tasks are [ ] Not Started
[ ] Start with the highest priority [ ] task from Phase 1
[ ] Mark task [/] In Progress in this document
[ ] Complete task + run its Verification Checklist
[ ] Mark task [x] Done
[ ] Commit and push to GitHub
[ ] Update GLOBAL COMPLETION TRACKER table above
```

---

*Last Updated: 2026-08-02 | Portfolio Live: https://ohsama.github.io/portfolio/*
