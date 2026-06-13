/**
 * OUSSAMA BOUKHALFA PORTFOLIO — app.js
 * Minimal JS: scroll-reveal, sticky nav, form handling.
 * No canvas, no particles, no cursor gimmicks.
 */

'use strict';

/* ── Sticky nav ── */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 48) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Scroll-reveal via IntersectionObserver ── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
  );

  els.forEach((el, i) => {
    /* Stagger siblings within same parent */
    const siblings = el.parentElement
      ? el.parentElement.querySelectorAll('.reveal')
      : [];
    const idx = Array.from(siblings).indexOf(el);
    if (idx > 0) {
      el.style.transitionDelay = `${idx * 80}ms`;
    }
    io.observe(el);
  });
})();

/* ── Active nav link on scroll ── */
(function () {
  const anchors = document.querySelectorAll('.nav-anchors a[href^="#"]');
  const sections = Array.from(anchors)
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const highlight = () => {
    const y = window.scrollY + window.innerHeight / 3;
    let active = null;
    sections.forEach((s) => {
      if (s.offsetTop <= y) active = s;
    });
    anchors.forEach((a) => {
      const match = active && a.getAttribute('href') === `#${active.id}`;
      a.style.color = match ? 'var(--text)' : '';
    });
  };

  window.addEventListener('scroll', highlight, { passive: true });
  highlight();
})();

/* ── Smooth-scroll for in-page links ── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ── Contact form ── */
(function () {
  const form    = document.getElementById('contactForm');
  const btn     = document.getElementById('formSubmit');
  const confirm = document.getElementById('formConfirm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name  = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const brief = form.querySelector('#brief').value.trim();

    if (!name || !email || !brief) {
      /* Shake invalid fields */
      [form.querySelector('#name'), form.querySelector('#email'), form.querySelector('#brief')]
        .filter((f) => !f.value.trim())
        .forEach((f) => {
          f.style.borderColor = '#ef4444';
          setTimeout(() => (f.style.borderColor = ''), 2000);
        });
      return;
    }

    btn.textContent = 'Sending…';
    btn.disabled    = true;

    /* Simulate send — wire to your endpoint or EmailJS here */
    setTimeout(() => {
      btn.style.display    = 'none';
      confirm.style.display = 'block';
      form.reset();
    }, 900);
  });
})();

/* ── Console signature ── */
console.log(
  '%cOussama Boukhalfa%c\nSystems Engineer · boukhalfaoussama.dev@gmail.com',
  'font-weight:700;font-size:1rem;color:#2563EB',
  'font-weight:400;color:#94a3b8'
);
