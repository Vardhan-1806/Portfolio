/* ============================================================
   ASV PORTFOLIO — SIGNATURE ORGANIC INK / LIQUID THEME TRANSITION
   Brand: Alisam Srivardhan
   Inspired by: Japanese WebGL Sumi-e Ink Fluid Simulation
   
   Features:
   - Irregular organic ink-spread / liquid-mask transition originating
     directly from the theme-toggle click coordinates.
   - Procedural fractal harmonic noise perimeter + dynamic satellite droplets.
   - Smooth 60 FPS Canvas rendering with cubic easing.
   - Flawless dark / light theme coordination with persistent state.
   - Respects user's system preference (prefers-color-scheme).
   - Zero flash of unstyled theme on load.
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'asv_portfolio_theme';
  const TRANSITION_DURATION = 820; // milliseconds
  const SWITCH_THRESHOLD = 0.42;  // trigger theme switch at 42% progress

  // Determine initial theme
  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (_) {}

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    // Default to dark for automotive cinematic ambiance, or light if user preferred
    return 'dark';
  }

  let currentTheme = getPreferredTheme();
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Palette definition for the liquid ink bloom
  const THEME_PALETTES = {
    dark: {
      inkColor: '#090a0f',       // Deep obsidian charcoal spreading across
      fringeColor: '#e07038',    // Glowing racing copper edge
      satelliteColor: '#12141c',
      label: 'DARK'
    },
    light: {
      inkColor: '#fcfbf7',       // Warm fine-paper ivory spreading across
      fringeColor: '#c8632b',    // Terracotta edge
      satelliteColor: '#f5f0e6',
      label: 'LIGHT'
    }
  };

  let canvas = null;
  let ctx = null;
  let isAnimating = false;

  function ensureCanvas() {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'inkTransitionCanvas';
      canvas.style.cssText = `
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        z-index: 999998;
        pointer-events: none;
        display: none;
      `;
      document.body.appendChild(canvas);
      ctx = canvas.getContext('2d');
    }
  }

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    if (ctx) ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });

  // Cubic Out Easing
  function easeOutCubic(t) {
    return (--t) * t * t + 1;
  }
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  // Generate procedural organic ink contour
  function generateOrganicPerimeter(baseRadius, pointsCount, seed) {
    const points = [];
    const step = (Math.PI * 2) / pointsCount;
    for (let i = 0; i < pointsCount; i++) {
      const theta = i * step;
      // Multi-frequency harmonic disturbance to emulate viscous liquid & ink bleeding
      const n1 = Math.sin(theta * 3 + seed.s1) * 0.14;
      const n2 = Math.cos(theta * 5 + seed.s2) * 0.09;
      const n3 = Math.sin(theta * 7 + seed.s3) * 0.06;
      const n4 = Math.cos(theta * 11 + seed.s4) * 0.035;
      const variance = 1 + n1 + n2 + n3 + n4;
      const r = baseRadius * variance;
      points.push({
        x: Math.cos(theta) * r,
        y: Math.sin(theta) * r
      });
    }
    return points;
  }

  // Draw smooth spline through points
  function drawOrganicSpline(ctx, points, originX, originY) {
    if (points.length < 3) return;
    ctx.beginPath();
    const len = points.length;
    const firstX = originX + points[0].x;
    const firstY = originY + points[0].y;
    ctx.moveTo(firstX, firstY);

    for (let i = 0; i < len; i++) {
      const p0 = points[i];
      const p1 = points[(i + 1) % len];
      const midX = originX + (p0.x + p1.x) / 2;
      const midY = originY + (p0.y + p1.y) / 2;
      ctx.quadraticCurveTo(originX + p0.x, originY + p0.y, midX, midY);
    }
    ctx.closePath();
  }

  // Execute Organic Ink Theme Transition
  function triggerThemeTransition(targetTheme, originX, originY) {
    if (isAnimating) return;
    if (targetTheme === currentTheme) return;

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      currentTheme = targetTheme;
      document.documentElement.setAttribute('data-theme', targetTheme);
      try { localStorage.setItem(STORAGE_KEY, targetTheme); } catch (_) {}
      updateToggleButtons(targetTheme);
      return;
    }

    ensureCanvas();
    resizeCanvas();
    isAnimating = true;

    // Fallback origin coordinates if not provided (e.g. keyboard shortcut)
    if (typeof originX !== 'number' || typeof originY !== 'number') {
      originX = window.innerWidth - 80;
      originY = 34;
    }

    const maxRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    ) * 1.25;

    const palette = THEME_PALETTES[targetTheme];
    const startTime = performance.now();
    let themeApplied = false;

    // Seed randomized offsets for this specific ink splash
    const seed = {
      s1: Math.random() * Math.PI * 2,
      s2: Math.random() * Math.PI * 2,
      s3: Math.random() * Math.PI * 2,
      s4: Math.random() * Math.PI * 2
    };

    // Pre-calculate satellite droplets shooting ahead of the main ink front
    const dropletsCount = 10;
    const droplets = [];
    for (let d = 0; d < dropletsCount; d++) {
      const angle = (Math.PI * 2 * d) / dropletsCount + (Math.random() - 0.5) * 0.4;
      const speedMult = 1.05 + Math.random() * 0.35;
      const sizeMult = 0.08 + Math.random() * 0.14;
      droplets.push({ angle, speedMult, sizeMult });
    }

    canvas.style.display = 'block';
    canvas.style.opacity = '1';

    function renderFrame(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / TRANSITION_DURATION, 1);
      const easeT = easeInOutCubic(t);

      // Trigger DOM theme switch at threshold
      if (t >= SWITCH_THRESHOLD && !themeApplied) {
        themeApplied = true;
        currentTheme = targetTheme;
        document.documentElement.setAttribute('data-theme', targetTheme);
        try { localStorage.setItem(STORAGE_KEY, targetTheme); } catch (_) {}
        updateToggleButtons(targetTheme);
        window.dispatchEvent(new CustomEvent('asvThemeChanged', { detail: { theme: targetTheme } }));
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const currentRadius = maxRadius * easeT;
      const points = generateOrganicPerimeter(currentRadius, 96, seed);

      // Draw subtle outer organic capillary halo
      if (currentRadius > 10) {
        ctx.save();
        ctx.strokeStyle = palette.fringeColor;
        ctx.lineWidth = 4 * (1 - easeT);
        ctx.globalAlpha = 0.5 * (1 - easeT * 0.8);
        drawOrganicSpline(ctx, points, originX, originY);
        ctx.stroke();
        ctx.restore();
      }

      // Draw main organic liquid ink body
      ctx.save();
      ctx.fillStyle = palette.inkColor;
      ctx.globalAlpha = 1.0;
      drawOrganicSpline(ctx, points, originX, originY);
      ctx.fill();

      // Draw leading satellite ink droplets
      droplets.forEach(drop => {
        const dropDist = currentRadius * drop.speedMult;
        if (dropDist > 15 && dropDist < maxRadius * 1.1) {
          const dx = originX + Math.cos(drop.angle) * dropDist;
          const dy = originY + Math.sin(drop.angle) * dropDist;
          const dropR = Math.max(0, currentRadius * drop.sizeMult * (1 - easeT * 0.7));
          if (dropR > 1) {
            ctx.beginPath();
            ctx.arc(dx, dy, dropR, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
      ctx.restore();

      if (t < 1) {
        requestAnimationFrame(renderFrame);
      } else {
        // Conclude transition gracefully with a brief fade
        canvas.style.transition = 'opacity 0.2s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
          canvas.style.display = 'none';
          canvas.style.transition = 'none';
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          isAnimating = false;
        }, 220);
      }
    }

    requestAnimationFrame(renderFrame);
  }

  // Update theme toggle UI states
  function updateToggleButtons(theme) {
    const isDark = theme === 'dark';
    const toggleBtns = document.querySelectorAll('.theme-toggle, #themeToggleBtn, #mobThemeToggleBtn');
    toggleBtns.forEach(btn => {
      btn.setAttribute('aria-checked', isDark ? 'true' : 'false');
      btn.setAttribute('data-theme-current', theme);
      const label = btn.querySelector('.theme-toggle-label, .theme-toggle-text');
      if (label) {
        label.textContent = isDark ? 'DARK' : 'LIGHT';
      }
      const iconWrap = btn.querySelector('.theme-toggle-thumb, .theme-toggle-icon');
      if (iconWrap) {
        iconWrap.classList.toggle('is-dark', isDark);
        iconWrap.classList.toggle('is-light', !isDark);
      }
    });
  }

  // Theme Toggle Click Handler
  function handleToggleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (isAnimating) return;

    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    triggerThemeTransition(nextTheme, originX, originY);
  }

  // Attach listeners to any toggle buttons
  function bindToggleButtons() {
    const buttons = document.querySelectorAll('.theme-toggle, #themeToggleBtn, #mobThemeToggleBtn, [data-action="toggle-theme"]');
    buttons.forEach(btn => {
      btn.removeEventListener('click', handleToggleClick);
      btn.addEventListener('click', handleToggleClick);
    });
    updateToggleButtons(currentTheme);
  }

  // Automatically inject theme toggle into navigation if not present
  function ensureNavToggle() {
    const navInner = document.querySelector('#nav .nav-inner');
    if (navInner && !document.getElementById('themeToggleBtn')) {
      const emailBtn = document.getElementById('navEmailBtn') || navInner.querySelector('.nav-cta');
      const toggleBtn = document.createElement('button');
      toggleBtn.id = 'themeToggleBtn';
      toggleBtn.className = 'theme-toggle';
      toggleBtn.setAttribute('aria-label', 'Toggle Dark and Light Theme');
      toggleBtn.setAttribute('title', 'Switch Theme (Organic Liquid Transition)');
      toggleBtn.innerHTML = `
        <span class="theme-toggle-track">
          <span class="theme-toggle-thumb ${currentTheme === 'dark' ? 'is-dark' : 'is-light'}">
            <svg class="theme-icon-sun" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="theme-icon-moon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </span>
        </span>
        <span class="theme-toggle-label">${currentTheme.toUpperCase()}</span>
      `;
      if (emailBtn) {
        navInner.insertBefore(toggleBtn, emailBtn);
      } else {
        navInner.appendChild(toggleBtn);
      }
    }

    // Also inject into mobile drawer
    const mobNav = document.getElementById('mobNav');
    if (mobNav && !document.getElementById('mobThemeToggleBtn')) {
      const mobToggle = document.createElement('button');
      mobToggle.id = 'mobThemeToggleBtn';
      mobToggle.className = 'mob-theme-toggle';
      mobToggle.setAttribute('aria-label', 'Toggle Dark and Light Theme');
      mobToggle.innerHTML = `
        <span class="mob-toggle-label">Appearance</span>
        <span class="mob-toggle-badge">${currentTheme.toUpperCase()}</span>
      `;
      mobNav.appendChild(mobToggle);
    }

    bindToggleButtons();
  }

  // Listen for system theme changes if user hasn't explicitly set one
  try {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', e => {
      const hasStored = localStorage.getItem(STORAGE_KEY);
      if (!hasStored) {
        const newTheme = e.matches ? 'dark' : 'light';
        triggerThemeTransition(newTheme);
      }
    });
  } catch (_) {}

  // Expose API globally
  window.asvTheme = {
    getTheme: () => currentTheme,
    setTheme: (theme, x, y) => triggerThemeTransition(theme, x, y),
    toggleTheme: (x, y) => triggerThemeTransition(currentTheme === 'dark' ? 'light' : 'dark', x, y)
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureNavToggle);
  } else {
    ensureNavToggle();
  }
})();
