'use strict';

/* ═════════════════════════════════════════════
   PROJECT DATA — Single source of truth for the
   modal detail panel content.
   ═════════════════════════════════════════════ */
const PROJECTS = {
  vsaas: {
    index: '01',
    cat: 'Cloud · Video',
    title: 'VSaaS — Video Surveillance as a Service',
    screenshot: 'screenshots/VSaaS.jpeg',
    screenshotAlt: 'VSaaS architecture screenshot',
    result: 'Achieved <strong>sub-2-second live feed latency</strong> with a resilient offline queue guaranteeing zero archive frame loss across unstable consumer-grade Wi-Fi networks.',
    constraintLabel: 'The Constraint',
    constraint: 'RTSP camera networks installed in retail environments operate over consumer-grade Wi-Fi — connections that drop, degrade, and recover unpredictably. A naive pipeline drops footage on every lapse. The requirement was absolute: zero frame loss in the archive, with feeds that snap back to real-time the moment connectivity resumes.',
    archLabel: 'Engineering Architecture',
    arch1: 'A Python bridge ingests raw RTSP feeds and runs two simultaneous FFmpeg pipelines: a rolling 2-second HLS playlist for live consumption, and 60-second .ts segment files for archival chunking. A thread-safe queue intercepts the upload path — during outages, segments accumulate locally and flush to MinIO object storage in strict temporal order on reconnection.',
    arch2: 'The mobile application (React Native + Expo) stitches daily segment sequences into continuous playback timelines using metadata stored in Supabase PostgreSQL.',
    stack: ['Python', 'FFmpeg', 'HLS / RTSP', 'MinIO (S3)', 'Supabase', 'PostgreSQL', 'React Native', 'Expo', 'Docker', 'Nginx'],
    hotspots: [
      { x: '25%', y: '35%', label: 'RTSP Stream ingest & Python OpenCV bridge' },
      { x: '65%', y: '60%', label: 'Thread-Safe Queue: 0% frame loss during network drop' }
    ]
  },
  rsmanager: {
    index: '02',
    cat: 'SaaS · POS',
    title: 'RSManager — Repair Shop & Point of Sale Platform',
    screenshot: 'screenshots/RSMGR.PNG',
    screenshotAlt: 'RSManager rebranded dashboard',
    result: 'Replaced fragmented paper workflows with a <strong>unified POS and repair management system</strong>, consolidating four operational roles under strict RBAC with zero data reconciliation errors.',
    constraintLabel: 'The Constraint',
    constraint: 'Electronics repair shops operate across four surfaces simultaneously: customer checkout (POS), device repair tracking, inventory, and supplier procurement. Each surface ran on its own informal system, producing reconciliation errors and inventory blindspots that compounded daily.',
    archLabel: 'Engineering Architecture',
    arch1: 'The backend is a FastAPI service with asynchronous SQLAlchemy ORM on PostgreSQL, protected by JWT authentication. Four role tiers — Owner, Manager, Technician, Cashier — enforce API-level permission boundaries. The POS module handles barcode scanning, trade-in discounts, custom line items, and thermal receipt output via python-escpos.',
    arch2: 'The frontend is a React + Vite application built in TypeScript with Zustand for global state management. The entire app is bundled into a portable offline distribution for shops without reliable internet access.',
    stack: ['FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy (Async)', 'JWT', 'React 18', 'TypeScript', 'Vite', 'TailwindCSS', 'Zustand', 'python-escpos'],
    hotspots: [
      { x: '30%', y: '25%', label: 'PostgreSQL Row-Level Security (RLS) tenant isolation' },
      { x: '70%', y: '50%', label: 'python-escpos thermal hardware print bridge' }
    ]
  },
  jibli: {
    index: '03',
    cat: 'Mobile · Logistics',
    title: 'Jibli — Hyperlocal Delivery & Logistics Platform',
    screenshot: 'screenshots/Jibli.jpg',
    screenshotAlt: 'Jibli mobile app interface',
    result: 'Engineered a <strong>tripartite delivery ecosystem</strong> connecting customers, merchants, and couriers with real-time order dispatching, live GPS routing, and instant state-transition broadcasting via WebSockets.',
    constraintLabel: 'The Constraint',
    constraint: 'Hyperlocal delivery in secondary Algerian cities faces compounding challenges: unmapped neighborhoods, intermittent mobile data connectivity, and rapid order volume spikes during peak hours. The system required zero-latency driver routing and instant order status synchronization across three user types simultaneously.',
    archLabel: 'Engineering Architecture',
    arch1: 'Built with Flutter for both the customer and courier mobile apps, sharing a common FastAPI backend orchestrating Supabase PostgreSQL. Real-time WebSockets broadcast order state transitions (Created → Accepted → Picked Up → Out for Delivery → Delivered) to all three parties instantly.',
    arch2: 'Live GPS streams continuously update courier positions, feeding a proximity-assignment algorithm that automatically dispatches new orders to the nearest available courier based on real-time location data.',
    stack: ['Flutter', 'Dart', 'FastAPI', 'Python', 'Supabase', 'PostgreSQL', 'WebSockets', 'GPS Tracking', 'Docker'],
    hotspots: [
      { x: '35%', y: '40%', label: 'WebSocket 100ms state-machine broadcast' },
      { x: '75%', y: '70%', label: 'Live GPS proximity driver dispatch' }
    ]
  },
  hcmonitor: {
    index: '04',
    cat: 'IoT · Mobile',
    title: 'HCMonitor — Wearable IoT Health Monitoring System',
    screenshot: 'screenshots/hcmonitor3.jpg',
    screenshotAlt: 'HCMonitor mobile application',
    result: 'Designed an <strong>end-to-end IoT-to-mobile telemetry pipeline</strong> delivering real-time pediatric health vitals to parents with configurable threshold alerting and AI-assisted plain-language interpretation.',
    constraintLabel: 'The Constraint',
    constraint: 'A custom wearable device continuously collects biometric data from children — body temperature and GPS coordinates — and must surface that data to a parent\'s phone with no perceptible lag. Abnormal readings must trigger immediate, context-aware alerts that a non-technical parent can interpret without medical training.',
    archLabel: 'Engineering Architecture',
    arch1: 'Sensor data transmits wirelessly from the wearable to a cloud ingestion layer. The React Native mobile app — built with Expo SDK 54, React Navigation v7, and TypeScript — renders a live dashboard with temperature history as time-series charts and real-time GPS position on an interactive map.',
    arch2: 'An integrated AI chatbot interface interprets raw sensor readings into plain-language health summaries, reducing alert fatigue and improving parent response quality.',
    stack: ['React Native', 'Expo SDK 54', 'TypeScript', 'react-native-maps', 'Chart-Kit', 'React Navigation v7', 'IoT Sensors', 'AI API'],
  },
  leadgen: {
    index: '05',
    cat: 'Automation · Data',
    title: 'DZ Lead Gen Pro — Automated Google Maps Scraper',
    screenshot: 'screenshots/11.03.2026_13.45.55_REC.png',
    screenshotAlt: 'DZ Lead Gen Pro Streamlit interface',
    result: 'Automated extraction of <strong>verified school records across all 58 Algerian wilayas</strong> by bypassing Google Maps\' dynamic anti-bot measures, delivering a clean exportable database in hours rather than weeks.',
    constraintLabel: 'The Constraint',
    constraint: 'The client required a comprehensive database of private schools across all 58 Algerian wilayas — including schools with no website presence. Manual data entry was unfeasible at this scale, and standard scraping scripts were immediately blocked by Google Maps\' dynamic rendering and anti-bot detection systems.',
    archLabel: 'Engineering Architecture',
    arch1: 'An asynchronous Python application uses Playwright to launch a real Chromium browser instance with automation detection flags disabled. The scraper navigates region by region, handling consent screens, dynamic scroll events, and lazy-loading elements exactly as a human would.',
    arch2: 'A Streamlit frontend provides a clean configuration UI for specifying search parameters, monitoring progress in real time, and exporting results as structured CSV files via Pandas.',
    stack: ['Python', 'Playwright (Async)', 'Chromium', 'Streamlit', 'Pandas', 'asyncio', 'CSV Export'],
  },
  docsguard: {
    index: '06',
    cat: 'Algorithm · Healthcare',
    title: 'DocsGuards — Medical On-Call Scheduling Engine',
    screenshot: 'screenshots/docsguard.jpg',
    screenshotAlt: 'DocsGuards scheduling engine interface',
    result: 'Eliminated scheduling bias and holiday-assignment disputes by implementing a <strong>stateful fairness-guaranteed round-robin algorithm</strong> with persistent historical memory — provably equitable to every doctor.',
    constraintLabel: 'The Constraint',
    constraint: 'Hospital on-call scheduling is politically fraught: doctors track precisely who was last assigned a major holiday, who has been on leave, and whether standard-night and weekend pools are treated with equal rigor. Manual spreadsheet scheduling introduces implicit bias that compounds over years. Any algorithmic solution must be demonstrably fair and auditable.',
    archLabel: 'Engineering Architecture',
    arch1: 'A custom continuous round-robin queuing engine maintains separate state machines for Standard and Weekend doctor pools. The algorithm enforces a hard invariant: no doctor receives a second assignment of any type until every eligible non-leave doctor in that pool has received one assignment.',
    arch2: 'A Holiday Memory Engine stores per-holiday assignment history indefinitely, ensuring the system distributes Christmas, Eid, and national holidays in strict rotation year over year. Rosters export to color-coded Excel files via openpyxl.',
    stack: ['Python 3.8+', 'Flask', 'Custom Round-Robin Engine', 'openpyxl', 'SQLite', 'Holiday Memory Engine'],
  },
  dzschools: {
    index: '07',
    cat: 'SaaS · EdTech',
    title: 'DZ Schools — Educational Administration Platform',
    screenshot: 'screenshots/11.03.2026_13.47.39_REC.png',
    screenshotAlt: 'DZ Schools admin dashboard',
    result: 'Engineered a <strong>multi-tenant SaaS platform</strong> digitizing student enrollment, financial reconciliation, and academic tracking for private Algerian schools — with zero technical training required.',
    constraintLabel: 'The Constraint',
    constraint: 'Private schools operate on fragmented spreadsheets and paper trails, producing enrollment errors, financial reconciliation failures, and compliance gaps. The system needed to be powerful enough to handle complex financial workflows and strict enough to isolate institutional data between tenants — while remaining operable by non-technical school administrators.',
    archLabel: 'Engineering Architecture',
    arch1: 'The backend uses a multi-tenant architecture with strict PostgreSQL row-level security (RLS) policies that isolate each school\'s data at the database level. No application-layer filtering required — unauthorized data access is impossible by design.',
    arch2: 'The frontend is a React application built with TypeScript, TailwindCSS, and Zustand, handling complex financial table rendering, student registry management, and multi-step enrollment workflows.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Row-Level Security', 'TailwindCSS', 'Zustand', 'Multi-Tenant Architecture'],
  },
};

/* ═════════════════════════════════════════════
   TERMINAL COMMANDS
   ═════════════════════════════════════════════ */
const TERM_CMDS = {
  help: `Available commands:
  whoami      — Profile summary
  vsaas       — Video Surveillance as a Service
  rsmanager   — Repair Shop POS platform
  jibli       — Hyperlocal delivery ecosystem
  hcmonitor   — Wearable IoT health monitor
  leadgen     — Automated Google Maps scraper
  docsguard   — Medical on-call scheduling engine
  dzschools   — Educational administration SaaS
  stack       — Full technical stack breakdown
  contact     — Contact details and links
  clear       — Clear terminal`,

  whoami: `Oussama Boukhalfa
  Role      : Systems Engineer · Full-Stack Developer · SaaS Architect
  Location  : Algeria
  Focus     : High-reliability backend systems, cloud video pipelines,
              delivery logistics, multi-tenant SaaS
  GitHub    : github.com/Ohsama
  LinkedIn  : linkedin.com/in/oussama-it-boukhalfa`,

  vsaas: `[VSaaS — Video Surveillance as a Service]
  Latency   : <2s live HLS feed
  Archive   : 0% frame loss via thread-safe offline queue → MinIO S3
  Stack     : Python · FFmpeg · HLS/RTSP · MinIO · Supabase · React Native`,

  rsmanager: `[RSManager — Repair Shop & POS Platform]
  Roles     : 4 RBAC tiers (Owner · Manager · Technician · Cashier)
  Modules   : POS · Repair tracking · Inventory · Supplier procurement
  Stack     : FastAPI · PostgreSQL · SQLAlchemy · React · TypeScript · Zustand`,

  jibli: `[Jibli — Hyperlocal Delivery & Logistics]
  Type      : Tripartite mobile ecosystem (Customer · Courier · Merchant)
  Realtime  : WebSocket order dispatching + live GPS proximity routing
  Stack     : Flutter · Dart · FastAPI · Supabase · PostgreSQL · WebSockets`,

  hcmonitor: `[HCMonitor — Wearable IoT Health Monitor]
  Data      : Temperature + GPS, continuous telemetry from wearable
  Features  : Live charts · map view · threshold alerts · AI interpretation
  Stack     : React Native · Expo SDK 54 · TypeScript · react-native-maps`,

  leadgen: `[DZ Lead Gen Pro — Automated Scraper]
  Scope     : All 58 Algerian wilayas scraped, anti-bot bypass
  Tool      : Playwright Chromium (automation flags disabled)
  Stack     : Python · Playwright · Streamlit · Pandas · asyncio`,

  docsguard: `[DocsGuards — Medical Scheduling Engine]
  Algorithm : Stateful round-robin with holiday memory
  Guarantee : No doctor gets a 2nd assignment until every eligible doctor has 1st
  Stack     : Python · Flask · Custom RR Engine · openpyxl · SQLite`,

  dzschools: `[DZ Schools — Educational Administration SaaS]
  Model     : Multi-tenant, PostgreSQL row-level security (RLS)
  Features  : Enrollment · Financial reconciliation · Academic tracking
  Stack     : React · TypeScript · Node.js · PostgreSQL · TailwindCSS · Zustand`,

  stack: `[Full Technical Stack]
  Backend   : Python 3.12 · FastAPI · Flask · SQLAlchemy · PostgreSQL · SQLite · JWT
  Mobile    : Flutter · Dart · React Native · Expo SDK 54 · TypeScript
  Frontend  : React 18 · TypeScript · Vite · Zustand · TailwindCSS
  Infra     : Docker · Nginx · Cloudflare · MinIO (S3) · Supabase · FFmpeg · HLS/RTSP
  Other     : WebSockets · Playwright · Streamlit · openpyxl`,

  contact: `[Contact Details]
  Email     : boukhalfaoussama02@gmail.com
  GitHub    : https://github.com/Ohsama
  LinkedIn  : https://www.linkedin.com/in/oussama-it-boukhalfa/`,
};

/* ═════════════════════════════════════════════
   DOMContentLoaded INIT
   ═════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Magnetic CTA Physics (Phase 4.1) ── */
  if (!('ontouchstart' in window)) {
    const magneticBtns = document.querySelectorAll('.btn-primary, .nav-hire, .nav-download-spec');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ── Active Nav Highlight on Scroll ── */
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(navLinks)
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  window.addEventListener('scroll', () => {
    const pos = window.scrollY + 120;
    sections.forEach(sec => {
      if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
        const id = sec.getAttribute('id');
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { passive: true });

  /* ── Project Grid — Filter Tabs ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        card.style.transition = 'opacity 0.25s, transform 0.25s';
        if (show) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 260);
        }
      });
    });
  });

  /* ── Project Cards → Open Modal ── */
  projectCards.forEach(card => {
    card.addEventListener('click', () => openProjectModal(card.getAttribute('data-project')));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openProjectModal(card.getAttribute('data-project'));
    });
  });

  /* ── Modal close triggers ── */
  document.getElementById('modalClose').addEventListener('click', closeProjectModal);
  document.getElementById('modalBackdrop').addEventListener('click', closeProjectModal);

  /* ── Terminal form ── */
  const termForm = document.getElementById('termForm');
  const termInput = document.getElementById('termInput');
  const termBody = document.getElementById('termBody');

  if (termForm && termInput) {
    termForm.addEventListener('submit', e => {
      e.preventDefault();
      const val = termInput.value.trim();
      if (val) { runTermCmd(val); termInput.value = ''; }
    });
    if (termBody) {
      termBody.addEventListener('click', () => termInput.focus());
    }
  }

  /* ── Contact Form (Supabase DB + Web3Forms Email) ── */
  const contactForm = document.getElementById('contactForm');
  const formSubmit = document.getElementById('formSubmit');
  const formConfirm = document.getElementById('formConfirm');

  const SUPABASE_URL = 'https://alsizocdqqftxmqoqfph.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsc2l6b2NkcXFmdHhtcW9xZnBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNjYzNjIsImV4cCI6MjEwMDY0MjM2Mn0.pHWAreoqGEkoXAIgvzeZ4DHX58ptMfSd68v7m7bfTkU';

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = (contactForm.querySelector('#f-name') || {}).value.trim();
      const email = (contactForm.querySelector('#f-email') || {}).value.trim();
      const typeSelect = contactForm.querySelector('#f-type');
      const type = typeSelect ? typeSelect.value : '';
      const brief = (contactForm.querySelector('#f-brief') || {}).value.trim();

      if (!name || !email) {
        showToast('Please fill in required fields (Name & Email).');
        return;
      }

      formSubmit.textContent = 'Sending…';
      formSubmit.disabled = true;

      // 1. Save to Supabase PostgreSQL Database Table (public.contact_submissions)
      const dbInsert = fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          engagement_type: type,
          brief: brief
        })
      }).catch(err => console.error('Supabase DB Insert Error:', err));

      // 2. Dispatch to Email Inbox (boukhalfaoussama02@gmail.com) via Web3Forms API
      const emailDispatch = fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '5561a0b1-ef17-48f5-b384-3c819d9b62a6', // Web3Forms direct inbox routing key
          email: email,
          name: name,
          subject: `Portfolio Project Brief from ${name}`,
          message: `Name: ${name}\nEmail: ${email}\nEngagement Type: ${type}\n\nProject Brief:\n${brief}`
        })
      }).catch(err => console.warn('Email dispatch fallback:', err));

      // Wait for completion
      await Promise.allSettled([dbInsert, emailDispatch]);

      formSubmit.style.display = 'none';
      formConfirm.style.display = 'block';
      showToast('Brief saved to database & sent to inbox! Oussama will respond within 24 hours.');
      contactForm.reset();
    });
  }

  /* ── Lightbox close ── */
  const lightbox = document.getElementById('lightbox');
  document.getElementById('lightboxCloseBtn').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  /* ── Global keyboard shortcuts ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeLightbox();
    }
  });
});

/* ═════════════════════════════════════════════
   PROJECT MODAL
   ═════════════════════════════════════════════ */
function openProjectModal(projectKey) {
  const data = PROJECTS[projectKey];
  if (!data) return;

  // Populate
  document.getElementById('modalIndex').textContent = data.index;
  document.getElementById('modalCat').textContent = data.cat;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalResult').innerHTML = data.result;
  document.getElementById('modalConstraintLabel').textContent = data.constraintLabel || 'The Constraint';
  document.getElementById('modalConstraint').textContent = data.constraint;
  document.getElementById('modalArchLabel').textContent = data.archLabel || 'Engineering Architecture';
  document.getElementById('modalArch1').textContent = data.arch1;
  document.getElementById('modalArch2').textContent = data.arch2 || '';
  document.getElementById('modalArch2').style.display = data.arch2 ? 'block' : 'none';

  const screenshot = document.getElementById('modalScreenshot');
  if (screenshot) {
    screenshot.src = data.screenshot;
    screenshot.alt = data.screenshotAlt || data.title;
  }

  // Populate Hotspot Pins
  const modalVisual = document.querySelector('.modal-visual');
  if (modalVisual) {
    // Remove existing pins
    modalVisual.querySelectorAll('.hotspot-pin').forEach(p => p.remove());

    if (data.hotspots && data.hotspots.length) {
      data.hotspots.forEach(hs => {
        const pin = document.createElement('div');
        pin.className = 'hotspot-pin';
        pin.style.left = hs.x;
        pin.style.top = hs.y;
        pin.innerHTML = `
          <div class="hotspot-dot"></div>
          <div class="hotspot-tooltip">${hs.label}</div>
        `;
        modalVisual.appendChild(pin);
      });
    }
  }

  const pillsContainer = document.getElementById('modalStack');
  pillsContainer.innerHTML = '';
  (data.stack || []).forEach(tech => {
    const pill = document.createElement('span');
    pill.className = 'modal-pill';
    pill.textContent = tech;
    pillsContainer.appendChild(pill);
  });

  // Open
  const modal = document.getElementById('project-modal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modal.setAttribute('aria-hidden', 'false');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
  modal.setAttribute('aria-hidden', 'true');
}

/* ═════════════════════════════════════════════
   LIGHTBOX (full screenshot zoom)
   ═════════════════════════════════════════════ */
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

/* ═════════════════════════════════════════════
   TOAST
   ═════════════════════════════════════════════ */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ═════════════════════════════════════════════
   EMAIL COPY
   ═════════════════════════════════════════════ */
function copyEmail() {
  const email = 'boukhalfaoussama02@gmail.com';
  navigator.clipboard.writeText(email)
    .then(() => showToast('Email copied to clipboard.'))
    .catch(() => showToast('Email: ' + email));
}

/* ═════════════════════════════════════════════
   TERMINAL ENGINE
   ═════════════════════════════════════════════ */
function runTermCmd(rawCmd) {
  const termBody = document.getElementById('termBody');
  const termInput = document.getElementById('termInput');
  if (!termBody) return;

  const cmd = rawCmd.trim().toLowerCase();

  if (cmd === 'clear') {
    termBody.innerHTML = `
      <div class="term-line">
        <span class="term-prompt">oussama@dev-system</span><span class="term-host">:~$</span>
        <span class="term-user"> portfolio --init</span>
      </div>
      <div class="term-output">Terminal cleared. Type <span style="color:var(--amber)">help</span> to see available commands.</div>
      <form id="termForm" class="term-input-row" autocomplete="off" onsubmit="return false;">
        <span class="term-prompt">oussama@dev-system</span><span class="term-host">:~$</span>
        <input id="termInput" type="text" class="term-input-field" placeholder="type command..." spellcheck="false" />
      </form>
    `;
    // Re-bind submit
    const tf = document.getElementById('termForm');
    const ti = document.getElementById('termInput');
    if (tf && ti) {
      tf.addEventListener('submit', e => {
        e.preventDefault();
        const v = ti.value.trim();
        if (v) { runTermCmd(v); ti.value = ''; }
      });
      termBody.addEventListener('click', () => ti.focus());
      ti.focus();
    }
    return;
  }

  const formEl = document.getElementById('termForm');

  // Echo command line
  const cmdLine = document.createElement('div');
  cmdLine.className = 'term-line';
  cmdLine.style.marginTop = '10px';
  cmdLine.innerHTML = `<span class="term-prompt">oussama@dev-system</span><span class="term-host">:~$</span> <span class="term-user">${escHtml(cmd)}</span>`;

  // Output
  const outputEl = document.createElement('div');
  outputEl.className = 'term-output';

  if (TERM_CMDS[cmd]) {
    outputEl.innerHTML = TERM_CMDS[cmd]
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>')
      .replace(/  /g, '&nbsp;&nbsp;');
  } else {
    outputEl.innerHTML = `Command not recognized: '<span style="color:#f87171">${escHtml(cmd)}</span>'. Type '<span style="color:var(--amber)">help</span>' for available commands.`;
  }

  if (formEl) {
    termBody.insertBefore(cmdLine, formEl);
    termBody.insertBefore(outputEl, formEl);
  } else {
    termBody.appendChild(cmdLine);
    termBody.appendChild(outputEl);
  }

  termBody.scrollTop = termBody.scrollHeight;
  if (termInput) termInput.focus();
}

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
