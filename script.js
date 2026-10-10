/**
 * Exact Target Cursor Component, Activity Grid & Micro-Interactions from pragnyanramtha.dev
 * Extracted from production chunk 0jy0j_8lq417c.js
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTargetCursor();
  initContributionsGrid();
  initBackToTop();
  initContactForm();
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
   GITHUB CONTRIBUTIONS GRID (Exact Real Activity: 425 Contributions)
   ========================================================================== */
function initContributionsGrid() {
  const container = document.getElementById('contrib-grid');
  if (!container) return;

  const weeks = 53;
  const days = 7;
  const cellSize = 10;
  const cellGap = 3;
  const step = cellSize + cellGap; // 13px

  // Real contributions map matching user's exact GitHub profile (Total: 425)
  const grid = Array.from({ length: 53 }, () => Array(7).fill(0));
  const levels = Array.from({ length: 53 }, () => Array(7).fill(0));

  function setCell(w, d, lvl, count) {
    levels[w][d] = lvl;
    grid[w][d] = count;
  }

  // Col 24 (Late March)
  setCell(24, 5, 2, 4);

  // Col 26 (Apr)
  setCell(26, 0, 3, 8);

  // Col 28
  setCell(28, 1, 2, 4);
  setCell(28, 4, 1, 2);
  setCell(28, 5, 2, 4);

  // Col 29
  setCell(29, 3, 2, 4);
  setCell(29, 4, 2, 4);
  setCell(29, 6, 1, 2);

  // Col 30 (May)
  setCell(30, 0, 2, 4);
  setCell(30, 3, 2, 4);
  setCell(30, 4, 2, 4);

  // Col 31
  setCell(31, 0, 2, 5);
  setCell(31, 3, 2, 4);
  setCell(31, 4, 2, 4);
  setCell(31, 5, 1, 2);

  // Col 32
  setCell(32, 5, 1, 2);

  // Col 33
  setCell(33, 1, 2, 5);
  setCell(33, 2, 2, 4);
  setCell(33, 3, 2, 5);
  setCell(33, 4, 2, 4);
  setCell(33, 5, 2, 5);

  // Col 34 (Jun)
  setCell(34, 0, 1, 2);
  setCell(34, 1, 1, 2);

  // Col 35
  setCell(35, 0, 2, 5);
  setCell(35, 4, 2, 4);
  setCell(35, 5, 1, 2);

  // Col 36
  setCell(36, 0, 2, 5);
  setCell(36, 4, 3, 8);

  // Col 37
  setCell(37, 0, 3, 8);
  setCell(37, 2, 2, 4);

  // Col 38 (Jul)
  setCell(38, 0, 4, 15);
  setCell(38, 6, 2, 4);

  // Col 39
  setCell(39, 0, 1, 3);
  setCell(39, 6, 1, 2);

  // Col 40
  setCell(40, 0, 2, 5);
  setCell(40, 4, 4, 15);
  setCell(40, 5, 3, 10);

  // Col 41 (Aug)
  setCell(41, 0, 4, 16);
  setCell(41, 1, 2, 8);
  setCell(41, 2, 2, 5);
  setCell(41, 3, 1, 3);
  setCell(41, 5, 3, 9);

  // Col 42
  setCell(42, 0, 3, 10);
  setCell(42, 1, 2, 5);
  setCell(42, 2, 2, 5);
  setCell(42, 3, 2, 4);

  // Col 43
  setCell(43, 0, 3, 9);
  setCell(43, 1, 2, 5);
  setCell(43, 2, 3, 8);
  setCell(43, 5, 1, 3);
  setCell(43, 6, 1, 2);

  // Col 44
  setCell(44, 1, 1, 3);
  setCell(44, 2, 4, 16);
  setCell(44, 4, 3, 11);
  setCell(44, 5, 1, 3);
  setCell(44, 6, 1, 2);

  // Col 45 (Sep)
  setCell(45, 0, 2, 5);
  setCell(45, 1, 2, 5);
  setCell(45, 2, 2, 4);
  setCell(45, 3, 2, 6);
  setCell(45, 4, 2, 5);
  setCell(45, 5, 1, 3);

  // Col 46
  setCell(46, 0, 2, 5);
  setCell(46, 1, 2, 4);
  setCell(46, 2, 2, 4);
  setCell(46, 3, 2, 4);
  setCell(46, 4, 1, 2);

  // Col 47
  setCell(47, 1, 1, 3);
  setCell(47, 2, 1, 2);
  setCell(47, 3, 2, 4);
  setCell(47, 4, 1, 2);

  // Col 48
  setCell(48, 0, 2, 4);
  setCell(48, 1, 2, 4);
  setCell(48, 2, 1, 3);
  setCell(48, 4, 1, 2);

  // Col 49
  setCell(49, 0, 2, 4);
  setCell(49, 2, 4, 16);
  setCell(49, 4, 1, 3);
  setCell(49, 5, 2, 5);

  // Col 50
  setCell(50, 5, 2, 4);
  setCell(50, 6, 2, 4);

  // Col 51
  setCell(51, 5, 2, 5);
  setCell(51, 6, 2, 4);

  // Col 52
  setCell(52, 5, 2, 4);

  const startDate = new Date('2025-10-05T00:00:00Z');
  let html = '';

  for (let w = 0; w < weeks; w++) {
    const x = w * step;
    for (let d = 0; d < days; d++) {
      const y = d * step;
      const lvl = levels[w][d];
      const count = grid[w][d];
      const dObj = new Date(startDate.getTime() + (w * 7 + d) * 86400000);
      const dateStr = dObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const tooltip = count === 0
        ? `No contributions on ${dateStr}`
        : `${count} contribution${count > 1 ? 's' : ''} on ${dateStr}`;

      html += `<rect class="contrib-cell contrib-lvl-${lvl}" width="${cellSize}" height="${cellSize}" x="${x}" y="${y}" rx="2" ry="2" data-count="${count}" data-date="${dateStr}"><title>${tooltip}</title></rect>`;
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

/* ==========================================================================
   REAL CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      if (status) {
        status.innerHTML = '<span style="color: #ef4444;">Please fill in all fields.</span>';
      }
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      <span>Sending...</span>
    `;
    if (status) status.innerHTML = '';

    try {
      const response = await fetch('https://formsubmit.co/ajax/nandigammahesh595@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `New Portfolio Message from ${name}`
        })
      });

      if (response.ok) {
        if (status) {
          status.innerHTML = '<span style="color: #10b981; font-weight: 500;">✓ Message sent to Mahesh! I will get back to you shortly.</span>';
        }
        form.reset();
      } else {
        throw new Error('Server returned error');
      }
    } catch (err) {
      // Fallback: open mailto directly so message is never lost
      if (status) {
        status.innerHTML = '<span style="color: #10b981;">✓ Opening your email client to send...</span>';
      }
      const mailtoUrl = `mailto:nandigammahesh595@gmail.com?subject=${encodeURIComponent('Portfolio Message from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
      window.location.href = mailtoUrl;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}


