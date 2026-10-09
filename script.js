/**
 * Mahesh Nandigam — Exact Technical Replica of pragnyanramtha.dev
 * Target Cursor Component + GSAP Continuous 360° Rotation + Snapping
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTargetCursor();
  initEmailCopy();
  initBackToTop();
  initContactForm();
});

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  const saved = localStorage.getItem('mn-theme') || 'dark';
  body.setAttribute('data-theme', saved);
  if (saved === 'light') {
    body.classList.add('light-theme');
  } else {
    body.classList.remove('light-theme');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = body.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', next);
      if (next === 'light') {
        body.classList.add('light-theme');
      } else {
        body.classList.remove('light-theme');
      }
      localStorage.setItem('mn-theme', next);
    });
  }
}

/* ==========================================================================
   TARGET CURSOR (Exact GSAP 360° Revolving Cursor from pragnyanramtha.dev)
   ========================================================================== */
function initTargetCursor() {
  const cursor = document.getElementById('target-cursor');
  if (!cursor) return;

  // Disable on touchscreen / coarse pointer devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    return;
  }

  // Ensure GSAP is available
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded, falling back');
    return;
  }

  const dot = cursor.querySelector('.target-cursor-dot');
  const tl = cursor.querySelector('.corner-tl');
  const tr = cursor.querySelector('.corner-tr');
  const br = cursor.querySelector('.corner-br');
  const bl = cursor.querySelector('.corner-bl');

  // Default corner box offsets (14px from center, 10px corner size)
  const defaultCorners = {
    tl: { x: -14, y: -14 },
    tr: { x: 4, y: -14 },
    br: { x: 4, y: 4 },
    bl: { x: -14, y: 4 }
  };

  // Set initial corner layout
  gsap.set(tl, defaultCorners.tl);
  gsap.set(tr, defaultCorners.tr);
  gsap.set(br, defaultCorners.br);
  gsap.set(bl, defaultCorners.bl);
  gsap.set(dot, { opacity: 1 });

  // Smooth position setters
  const setX = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power2.out' });
  const setY = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power2.out' });

  // Continuous 360-degree rotation (2s duration, linear, infinite repeat)
  const spinTween = gsap.to(cursor, {
    rotation: '+=360',
    duration: 2,
    ease: 'none',
    repeat: -1
  });

  let isHovering = false;
  let activeTarget = null;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isHovering) {
      setX(mouseX);
      setY(mouseY);
    }
  });

  // Attach snap behavior to all elements with .cursor-target
  function setupHoverTargets() {
    const targets = document.querySelectorAll('.cursor-target');

    targets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        isHovering = true;
        activeTarget = target;
        spinTween.pause();

        const rect = target.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const pad = 6;
        const halfW = rect.width / 2 + pad;
        const halfH = rect.height / 2 + pad;
        const cornerSize = 10;

        // Animate cursor container to target center & reset rotation to 0
        gsap.to(cursor, {
          x: cx,
          y: cy,
          rotation: 0,
          duration: 0.22,
          ease: 'power2.out'
        });

        // Expand corners to snap cleanly around target element
        gsap.to(tl, { x: -halfW, y: -halfH, duration: 0.22, ease: 'power2.out' });
        gsap.to(tr, { x: halfW - cornerSize, y: -halfH, duration: 0.22, ease: 'power2.out' });
        gsap.to(br, { x: halfW - cornerSize, y: halfH - cornerSize, duration: 0.22, ease: 'power2.out' });
        gsap.to(bl, { x: -halfW, y: halfH - cornerSize, duration: 0.22, ease: 'power2.out' });

        // Fade out center dot while enclosing target
        gsap.to(dot, { opacity: 0, scale: 0, duration: 0.15 });
      });

      target.addEventListener('mouseleave', () => {
        isHovering = false;
        activeTarget = null;

        // Snap back to current mouse position
        gsap.to(cursor, {
          x: mouseX,
          y: mouseY,
          duration: 0.2,
          ease: 'power2.out',
          onComplete: () => {
            if (!isHovering) {
              spinTween.play();
            }
          }
        });

        // Restore corners to default compact revolving square
        gsap.to(tl, { ...defaultCorners.tl, duration: 0.2, ease: 'power2.out' });
        gsap.to(tr, { ...defaultCorners.tr, duration: 0.2, ease: 'power2.out' });
        gsap.to(br, { ...defaultCorners.br, duration: 0.2, ease: 'power2.out' });
        gsap.to(bl, { ...defaultCorners.bl, duration: 0.2, ease: 'power2.out' });

        // Fade in center dot
        gsap.to(dot, { opacity: 1, scale: 1, duration: 0.2 });
      });
    });
  }

  setupHoverTargets();

  // Keep target cursor aligned during scroll if user is hovered over an element
  window.addEventListener('scroll', () => {
    if (isHovering && activeTarget) {
      const rect = activeTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      gsap.set(cursor, { x: cx, y: cy });
    }
  }, { passive: true });
}

/* ==========================================================================
   1-CLICK EMAIL COPY & TOAST
   ========================================================================== */
function initEmailCopy() {
  const email = 'nandigammahesh595@gmail.com';
  const heroBtn = document.getElementById('copy-email-btn');
  const cardBtn = document.getElementById('copy-email-btn-card');

  const copyAction = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      showToast('Copied: ' + email);
    }).catch(() => {
      showToast(email);
    });
  };

  if (heroBtn) heroBtn.addEventListener('click', copyAction);
  if (cardBtn) cardBtn.addEventListener('click', copyAction);
}

function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

/* ==========================================================================
   ELEVATE TO THE TOP
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
   CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.style.color = '#ef4444';
      status.textContent = 'Please fill out all fields.';
      return;
    }

    submitBtn.disabled = true;
    const origText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = origText;
      status.style.color = 'hsl(var(--primary))';
      status.innerHTML = `Thanks ${name}! Your message was dispatched. I will reply to <em>${email}</em> shortly.`;
      form.reset();
      showToast('Message sent to Mahesh!');
    }, 600);
  });
}
