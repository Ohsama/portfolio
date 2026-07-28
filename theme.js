/* ═══════════════════════════════════════════════════════════════
   OUSSAMA BOUKHALFA PORTFOLIO — THEME SWITCHER ENGINE
   Dual Theme: Dark Obsidian <-> Beige Liquid Glass
   Feature: Radial Ripple Clip-Path Expansion Animation from Toggle Button
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio_theme';
  const DEFAULT_THEME = 'dark';

  // Get initial theme
  function getSavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === 'dark' || saved === 'beige')) {
      return saved;
    }
    return DEFAULT_THEME;
  }

  // Apply theme immediately on load to prevent FLASH of wrong theme
  let currentTheme = getSavedTheme();
  document.documentElement.setAttribute('data-theme', currentTheme);

  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const rippleOverlay = document.getElementById('theme-ripple');

    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', (e) => {
      const nextTheme = currentTheme === 'dark' ? 'beige' : 'dark';

      // Trigger button spin animation class
      toggleBtn.classList.add('switching');
      setTimeout(() => toggleBtn.classList.remove('switching'), 600);

      // Perform smooth radial expansion transition
      animateThemeSwitch(e, nextTheme, () => {
        currentTheme = nextTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem(STORAGE_KEY, currentTheme);
      });
    });
  });

  function animateThemeSwitch(event, nextTheme, applyThemeCallback) {
    const toggleBtn = document.getElementById('theme-toggle');
    const rippleOverlay = document.getElementById('theme-ripple');

    // Get click or button center coordinates
    let x, y;
    if (toggleBtn) {
      const rect = toggleBtn.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else {
      x = event.clientX || window.innerWidth / 2;
      y = event.clientY || window.innerHeight / 2;
    }

    // Calculate maximum radius to cover the entire window
    const maxDistX = Math.max(x, window.innerWidth - x);
    const maxDistY = Math.max(y, window.innerHeight - y);
    const endRadius = Math.hypot(maxDistX, maxDistY);

    // If browser supports View Transitions API, use it for optimal native performance
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
            duration: 600,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
      return;
    }

    // Fallback: Custom ripple overlay animation for standard browsers
    if (!rippleOverlay) {
      applyThemeCallback();
      return;
    }

    // Set overlay background matching the target theme
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
        duration: 550,
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
