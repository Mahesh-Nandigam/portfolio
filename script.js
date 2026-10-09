/**
 * Mahesh Nandigam Portfolio Scripts
 * Inspired by pragnyanramtha.dev
 * Fast, lightweight, pure vanilla.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initEmailCopy();
  initContactForm();
});

/* Theme Toggle (Dark Mode default, clean Light Mode option) */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  const saved = localStorage.getItem('mn-theme') || 'dark';
  body.setAttribute('data-theme', saved);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = body.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', next);
      localStorage.setItem('mn-theme', next);
    });
  }
}

/* 1-Click Clipboard Email Copy */
function initEmailCopy() {
  const email = 'mahesh@nandigam.dev';
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
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2400);
}

/* Contact Form Submission */
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
      status.style.color = 'var(--text-primary)';
      status.innerHTML = `Thanks ${name}! Your message was dispatched. I will reply to <em>${email}</em> shortly.`;
      form.reset();
      showToast('Message sent to Mahesh!');
    }, 600);
  });
}
