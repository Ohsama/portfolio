/**
 * OUSSAMA BOUKHALFA PORTFOLIO — app.js
 * Clean Executive Glassmorphism UI Logic:
 * - Scroll reveal animations
 * - Interactive Case Study Filter
 * - High-Res Image Lightbox Modal
 * - Fully Typable Developer Glass Terminal Simulator
 * - Quick Email Copy to Clipboard Toast
 * - Contact Form handling
 */

'use strict';

/* ── IntersectionObserver Scroll Reveal ── */
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach((el) => io.observe(el));
  }

  /* ── Active Nav Highlight ── */
  const navAnchors = document.querySelectorAll('.nav-anchors a[href^="#"]');
  const sections = Array.from(navAnchors).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  const onScrollNav = () => {
    const scrollPos = window.scrollY + 180;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        const id = sec.getAttribute('id');
        navAnchors.forEach(a => {
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active');
          } else {
            a.classList.remove('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ── Case Studies Filter Tabs ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-study-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      caseCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'grid';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ── Contact Form ── */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmit');
  const confirmMsg = document.getElementById('formConfirm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();

      if (!name || !email) {
        showToast('Please fill in required fields');
        return;
      }

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.style.display = 'none';
        confirmMsg.style.display = 'block';
        showToast('Project brief sent successfully!');
        form.reset();
      }, 900);
    });
  }

  /* ── Interactive Typable Terminal Form Setup ── */
  const termForm = document.getElementById('termForm');
  const termInput = document.getElementById('termInput');
  const termBody = document.getElementById('termBody');

  if (termForm && termInput) {
    termForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = termInput.value.trim();
      if (val) {
        runTermCmd(val);
        termInput.value = '';
      }
    });

    // Focus input on clicking anywhere inside terminal body
    if (termBody) {
      termBody.addEventListener('click', () => {
        termInput.focus();
      });
    }
  }
});

/* ── Lightbox Modal ── */
function openLightbox(imgSrc, captionText) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  
  if (modal && img) {
    img.src = imgSrc;
    caption.textContent = captionText || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox(e) {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

/* ── Toast Notification ── */
function showToast(message) {
  const toast = document.getElementById('toastMsg');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ── Copy Email to Clipboard ── */
function copyEmail() {
  const email = 'boukhalfaoussama02@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    const currentLang = localStorage.getItem('portfolio_lang') || 'en';
    const msg = (translations[currentLang] && translations[currentLang]['contact_copied']) 
      ? translations[currentLang]['contact_copied'] 
      : 'Email Copied to Clipboard!';
    showToast(msg);
  }).catch(() => {
    showToast('Email: boukhalfaoussama02@gmail.com');
  });
}

/* ── Developer Glass Terminal Commands Dictionary ── */
const termCommands = {
  help: `Available commands:
  - <span style="color:var(--accent-cyan)">whoami</span>     : Profile summary of Oussama Boukhalfa
  - <span style="color:var(--accent-cyan)">jibli</span>      : Jibli hyperlocal delivery platform architecture
  - <span style="color:var(--accent-cyan)">vsaas</span>      : VSaaS video surveillance architecture details
  - <span style="color:var(--accent-cyan)">rsmanager</span>  : POS & repair shop platform specs (rebranded)
  - <span style="color:var(--accent-cyan)">hcmonitor</span>  : Pediatric IoT telemetry architecture
  - <span style="color:var(--accent-cyan)">leadgen</span>    : Playwright Google Maps scraper specs
  - <span style="color:var(--accent-cyan)">docsguard</span>  : Medical round-robin on-call engine
  - <span style="color:var(--accent-cyan)">dzschools</span>  : Multi-tenant educational platform
  - <span style="color:var(--accent-cyan)">stack</span>      : Core technical stack breakdown
  - <span style="color:var(--accent-cyan)">contact</span>    : Direct email & profile links
  - <span style="color:var(--accent-cyan)">clear</span>      : Clear terminal screen`,

  whoami: `Oussama Boukhalfa — AI-Augmented Full-Stack Developer | Network Engineer | SaaS Architect
Location: Algeria
Specialization: High-scale backend infrastructure, cloud video pipelines, delivery logistics, multi-tenant SaaS.`,

  jibli: `[Jibli — Hyperlocal Delivery & Logistics Platform]
Scope: City-wide food & parcel delivery ecosystem
Channels: Real-time WebSockets order dispatching & live GPS courier routing
Stack: Flutter, Dart, FastAPI, Supabase PostgreSQL, WebSockets.`,

  vsaas: `[VSaaS — Video Surveillance as a Service]
Latency: < 2s Live HLS Feed
Queue: Thread-safe offline chunking (0% archive frame loss)
Stack: Python, FFmpeg, RTSP, MinIO (S3), Supabase PostgreSQL, React Native Expo.`,

  rsmanager: `[RSManager — Repair Shop & POS Platform]
Rebrand: Modernized POS UI with streamlined workflow
Roles: 4 RBAC Tiers (Owner, Manager, Technician, Cashier)
Stack: FastAPI, Async SQLAlchemy, PostgreSQL, React, Vite, TypeScript, Zustand.`,

  hcmonitor: `[HCMonitor — Wearable IoT Health Monitor]
Telemetry: Real-time temperature charts & GPS map telemetry
Alerts: Threshold triggers + AI plain-language interpretation
Stack: React Native (Expo SDK 54), TypeScript, react-native-maps, Chart-Kit.`,

  leadgen: `[DZ Lead Gen Pro — Automated Scraper]
Scope: Automated Google Maps scraping across 58 Algerian wilayas
Bypass: Playwright Chromium anti-bot traversal + Streamlit UI
Stack: Python, Playwright, Streamlit, Pandas, asyncio.`,

  docsguard: `[DocsGuards — Medical On-Call Engine]
Fairness: Stateful continuous round-robin algorithm with holiday memory
Exports: Auto-generated color-coded Excel rosters
Stack: Python, Flask, Round-Robin Engine, openpyxl, SQLite.`,

  dzschools: `[DZ Schools — Educational Administration Platform]
Scope: Multi-tenant student enrollment, financial tracking & academics
Isolation: Strict PostgreSQL row-level security (RLS) policies
Stack: React, TypeScript, Node.js, PostgreSQL, TailwindCSS, Zustand.`,

  stack: `[Core Tech Stack]
Mobile & Frontend: Flutter, Dart, React 18, TypeScript, Vite, Zustand, React Native, Expo SDK 54
Backend & Cloud: Python 3.12, FastAPI, Flask, Async SQLAlchemy, PostgreSQL, Supabase, MinIO
Infra & Streaming: Docker, Nginx, Cloudflare, WebSockets, FFmpeg, HLS/RTSP`,

  contact: `[Contact Details]
Email: boukhalfaoussama02@gmail.com
GitHub: https://github.com/Ohsama
LinkedIn: https://www.linkedin.com/in/oussama-it-boukhalfa/`
};

function runTermCmd(cmd) {
  const termBody = document.getElementById('termBody');
  const termInput = document.getElementById('termInput');
  if (!termBody) return;

  cmd = cmd.trim().toLowerCase();

  if (cmd === 'clear') {
    termBody.innerHTML = `
      <div class="term-line">System initialized. Type <span style="color:var(--accent-cyan);">help</span> or use prompt below to execute commands.</div>
      <form id="termForm" class="term-input-form" onsubmit="event.preventDefault(); const v=document.getElementById('termInput').value.trim(); if(v){runTermCmd(v); document.getElementById('termInput').value='';}">
        <span class="term-prompt">oussama@dev-system:~$</span>
        <input type="text" id="termInput" class="term-input-field" placeholder="Type command (e.g. help, jibli, vsaas)..." autocomplete="off" />
      </form>
    `;
    setTimeout(() => {
      const inp = document.getElementById('termInput');
      if (inp) inp.focus();
    }, 50);
    return;
  }

  /* Insert Command Output before the active input line */
  const formEl = document.getElementById('termForm');
  
  const cmdDiv = document.createElement('div');
  cmdDiv.className = 'term-line';
  cmdDiv.style.marginTop = '12px';
  cmdDiv.innerHTML = `<span class="term-prompt">oussama@dev-system:~$</span> <span class="term-command">${cmd}</span>`;

  const outputDiv = document.createElement('div');
  outputDiv.className = 'term-output';
  
  if (termCommands[cmd]) {
    outputDiv.innerHTML = termCommands[cmd].replace(/\n/g, '<br>');
  } else {
    outputDiv.innerHTML = `Command not recognized: '<span style="color:#ef4444;">${cmd}</span>'. Type '<span style="color:var(--accent-cyan);">help</span>' for available commands.`;
  }

  if (formEl) {
    termBody.insertBefore(cmdDiv, formEl);
    termBody.insertBefore(outputDiv, formEl);
  } else {
    termBody.appendChild(cmdDiv);
    termBody.appendChild(outputDiv);
  }
  
  termBody.scrollTop = termBody.scrollHeight;
  if (termInput) termInput.focus();
}
