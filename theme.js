/* ═══════════════════════════════════════════════════════════════
   OUSSAMA BOUKHALFA PORTFOLIO — THEME SWITCHER ENGINE
   Dual Theme: Dark Obsidian <-> Beige Liquid Glass
   Feature: Automatic Intro Radial Expansion Transition from Dark to Light/Beige
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio_theme';

  // Always start initial render in DARK mode so user experiences the opening transition
  let currentTheme = 'dark';
  document.documentElement.setAttribute('data-theme', 'dark');

  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');

    // Automatic Intro Opening Transition: Dark -> Beige
    setTimeout(() => {
      if (toggleBtn) {
        toggleBtn.classList.add('switching');
        setTimeout(() => toggleBtn.classList.remove('switching'), 600);
      }

      animateThemeSwitch(null, 'beige', () => {
        currentTheme = 'beige';
        document.documentElement.setAttribute('data-theme', 'beige');
        localStorage.setItem(STORAGE_KEY, 'beige');
      });
    }, 650);

    // Manual toggle on button click
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        const nextTheme = currentTheme === 'dark' ? 'beige' : 'dark';

        toggleBtn.classList.add('switching');
        setTimeout(() => toggleBtn.classList.remove('switching'), 600);

        animateThemeSwitch(e, nextTheme, () => {
          currentTheme = nextTheme;
          document.documentElement.setAttribute('data-theme', currentTheme);
          localStorage.setItem(STORAGE_KEY, currentTheme);
        });
      });
    }
  });

  function animateThemeSwitch(event, nextTheme, applyThemeCallback) {
    const toggleBtn = document.getElementById('theme-toggle');
    const rippleOverlay = document.getElementById('theme-ripple');

    // Calculate center coordinates originating from the toggle button (or viewport center if unavailable)
    let x, y;
    if (toggleBtn) {
      const rect = toggleBtn.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else if (event) {
      x = event.clientX || window.innerWidth / 2;
      y = event.clientY || window.innerHeight / 2;
    } else {
      x = window.innerWidth / 2;
      y = window.innerHeight / 2;
    }

    // Maximum radius to cover entire viewport
    const maxDistX = Math.max(x, window.innerWidth - x);
    const maxDistY = Math.max(y, window.innerHeight - y);
    const endRadius = Math.hypot(maxDistX, maxDistY);

    // Native View Transitions API support
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        applyThemeCallback();
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 700,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
      return;
    }

    // Fallback radial clip-path animation for standard browsers
    if (!rippleOverlay) {
      applyThemeCallback();
      return;
    }

    const targetBg = nextTheme === 'beige'
      ? 'linear-gradient(150deg, #f7f0e4 0%, #ede3d2 55%, #f2ebe0 100%)'
      : '#080c12';

    rippleOverlay.style.background = targetBg;
    rippleOverlay.style.display = 'block';

    const animation = rippleOverlay.animate(
      [
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` }
      ],
      {
        duration: 700,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards'
      }
    );

    animation.onfinish = () => {
      applyThemeCallback();
      rippleOverlay.style.display = 'none';
      rippleOverlay.style.clipPath = 'none';
    };
  }
})();
