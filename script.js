/**
 * Exact Target Cursor Component, Activity Grid & Micro-Interactions from pragnyanramtha.dev
 * Extracted from production chunk 0jy0j_8lq417c.js
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTargetCursor();
  initContributionsGrid();
  initBackToTop();
});

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const moonIcon = document.getElementById('theme-icon-moon');
  const sunIcon = document.getElementById('theme-icon-sun');
  const html = document.documentElement;

  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);

  function applyTheme(theme) {
    if (theme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
      html.style.colorScheme = 'dark';
      if (moonIcon && sunIcon) {
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
      }
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      html.style.colorScheme = 'light';
      if (moonIcon && sunIcon) {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
      }
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = html.classList.contains('dark');
      const next = isDark ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }
}

/* ==========================================================================
   EXACT REVOLVING GSAP TARGET CURSOR (Chunk 0jy0j_8lq417c.js)
   ========================================================================== */
function initTargetCursor() {
  const cursor = document.getElementById('target-cursor');
  if (!cursor) return;

  // Immediately deactivate on mobile & touch devices
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768) {
    cursor.style.display = 'none';
    return;
  }

  if (typeof gsap === 'undefined') return;

  document.body.style.cursor = 'none';

  const corners = cursor.querySelectorAll('.target-cursor-corner');
  if (!corners || corners.length !== 4) return;

  gsap.set(cursor, {
    xPercent: -50,
    yPercent: -50,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });

  const quickX = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3.out' });
  const quickY = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3.out' });

  // 360-degree continuous rotation
  const spinDuration = 2;
  let spinTimeline = gsap.timeline({ repeat: -1 }).to(cursor, {
    rotation: '+=360',
    duration: spinDuration,
    ease: 'none'
  });

  window.addEventListener('mousemove', (e) => {
    quickX(e.clientX);
    quickY(e.clientY);
  });

  let activeTarget = null;
  let moveListener = null;
  let leaveListener = null;

  function removeTargetListeners(t) {
    if (moveListener) t.removeEventListener('mousemove', moveListener);
    if (leaveListener) t.removeEventListener('mouseleave', leaveListener);
    moveListener = null;
    leaveListener = null;
  }

  window.addEventListener('mouseover', (e) => {
    let el = e.target;
    let target = null;
    while (el && el !== document.body) {
      if (el.matches && el.matches('.cursor-target') && !el.classList.contains('cursor-default')) {
        target = el;
        break;
      }
      el = el.parentElement;
    }

    if (!target || target === activeTarget) return;
    if (activeTarget) removeTargetListeners(activeTarget);
    activeTarget = target;

    gsap.killTweensOf(cursor, 'rotation');
    spinTimeline.pause();
    gsap.set(cursor, { rotation: 0 });

    const cornerSize = 10;
    const borderWidth = 3;
    const parallaxStrength = 0.05;

    const updateCorners = (mouseX, mouseY) => {
      const r = target.getBoundingClientRect();
      const c = cursor.getBoundingClientRect();
      const cx = c.left + c.width / 2;
      const cy = c.top + c.height / 2;

      const [tl, tr, br, bl] = corners;
      let posTL = { x: r.left - cx - borderWidth, y: r.top - cy - borderWidth };
      let posTR = { x: r.right - cx + borderWidth - cornerSize, y: r.top - cy - borderWidth };
      let posBR = { x: r.right - cx + borderWidth - cornerSize, y: r.bottom - cy + borderWidth - cornerSize };
      let posBL = { x: r.left - cx - borderWidth, y: r.bottom - cy + borderWidth - cornerSize };

      if (mouseX !== undefined && mouseY !== undefined) {
        const tcX = r.left + r.width / 2;
        const tcY = r.top + r.height / 2;
        const sX = (mouseX - tcX) * parallaxStrength;
        const sY = (mouseY - tcY) * parallaxStrength;
        posTL.x += sX; posTL.y += sY;
        posTR.x += sX; posTR.y += sY;
        posBR.x += sX; posBR.y += sY;
        posBL.x += sX; posBL.y += sY;
      }

      const tAnim = gsap.timeline();
      const b = [posTL, posTR, posBR, posBL];
      [tl, tr, br, bl].forEach((corner, idx) => {
        tAnim.to(corner, { x: b[idx].x, y: b[idx].y, duration: 0.2, ease: 'power2.out' }, 0);
      });
    };

    updateCorners();

    let isTicking = false;
    moveListener = (evt) => {
      if (!isTicking) {
        requestAnimationFrame(() => {
          updateCorners(evt.clientX, evt.clientY);
          isTicking = false;
        });
        isTicking = true;
      }
    };

    leaveListener = () => {
      activeTarget = null;
      gsap.killTweensOf(corners);
      const eSize = cornerSize;
      const defaultPos = [
        { x: -(1.5 * eSize), y: -(1.5 * eSize) },
        { x: 0.5 * eSize, y: -(1.5 * eSize) },
        { x: 0.5 * eSize, y: 0.5 * eSize },
        { x: -(1.5 * eSize), y: 0.5 * eSize }
      ];
      const retTl = gsap.timeline();
      corners.forEach((corner, idx) => {
        retTl.to(corner, { x: defaultPos[idx].x, y: defaultPos[idx].y, duration: 0.3, ease: 'power3.out' }, 0);
      });

      setTimeout(() => {
        if (!activeTarget) {
          const curRot = gsap.getProperty(cursor, 'rotation') % 360;
          spinTimeline.kill();
          spinTimeline = gsap.timeline({ repeat: -1 }).to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
          gsap.to(cursor, {
            rotation: curRot + 360,
            duration: spinDuration * (1 - curRot / 360),
            ease: 'none',
            onComplete: () => { spinTimeline.restart(); }
          });
        }
      }, 50);

      removeTargetListeners(target);
    };

    target.addEventListener('mousemove', moveListener);
    target.addEventListener('mouseleave', leaveListener);
  }, { passive: true });
}

/* ==========================================================================
   GITHUB CONTRIBUTIONS GRID
   ========================================================================== */
function initContributionsGrid() {
  const container = document.getElementById('contrib-grid');
  if (!container) return;

  const weeks = 53;
  const days = 7;
  const cellSize = 14;
  const cellGap = 5;
  const startX = 0;
  const startY = 22;

  let html = '';
  // Generate a realistic high-activity contribution calendar
  for (let w = 0; w < weeks; w++) {
    const x = startX + w * (cellSize + cellGap);
    for (let d = 0; d < days; d++) {
      const y = startY + d * (cellSize + cellGap);
      // Determine activity level (0-4)
      const seed = Math.sin(w * 13 + d * 7);
      let level = 0;
      if (seed > 0.65) level = 4;
      else if (seed > 0.3) level = 3;
      else if (seed > -0.1) level = 2;
      else if (seed > -0.5) level = 1;

      // Class matching pragnyan Tailwind classes
      let fillClass = 'fill-muted-foreground/5';
      if (level === 1) fillClass = 'fill-muted-foreground/20';
      if (level === 2) fillClass = 'fill-muted-foreground/40';
      if (level === 3) fillClass = 'fill-muted-foreground/60';
      if (level === 4) fillClass = 'fill-muted-foreground/80';

      html += `<rect class="${fillClass} transition-colors" height="${cellSize}" width="${cellSize}" x="${x}" y="${y}" rx="2" ry="2" data-level="${level}"></rect>`;
    }
  }
  container.innerHTML = html;
}

/* ==========================================================================
   BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('elevate-top-btn');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}


