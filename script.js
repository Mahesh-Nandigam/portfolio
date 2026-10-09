/**
 * Mahesh Nandigam Portfolio Scripts
 * Real projects from github.com/Mahesh-Nandigam
 * Pure vanilla, zero bloat.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initEmailCopy();
  initModals();
  initContactForm();
});

/* Theme Handling */
function initTheme() {
  const btn = document.getElementById('theme-btn');
  const body = document.body;

  const saved = localStorage.getItem('mn-theme') || 'dark';
  if (saved === 'light') {
    body.setAttribute('data-theme', 'light');
    if (btn) btn.textContent = 'dark';
  } else {
    body.removeAttribute('data-theme');
    if (btn) btn.textContent = 'light';
  }

  if (btn) {
    btn.addEventListener('click', () => {
      const isLight = body.getAttribute('data-theme') === 'light';
      if (isLight) {
        body.removeAttribute('data-theme');
        localStorage.setItem('mn-theme', 'dark');
        btn.textContent = 'light';
      } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('mn-theme', 'light');
        btn.textContent = 'dark';
      }
    });
  }
}

/* Copy Email */
function initEmailCopy() {
  const btn = document.getElementById('copy-btn');
  const email = 'mahesh@nandigam.dev';

  if (!btn) return;

  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(email).then(() => {
      showToast('email copied: ' + email);
      btn.textContent = 'copied!';
      setTimeout(() => { btn.textContent = 'copy email'; }, 2000);
    }).catch(() => {
      showToast(email);
    });
  });
}

function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = text;
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2500);
}

/* Real Case Studies from Mahesh's GitHub (Clean Engineering Focus) */
const CASE_STUDIES = {
  hirepanel: {
    title: 'HirePanel — Automated Recruiting & Screening Platform',
    type: 'Automated Evaluation Platform (7X Hackathon Winner)',
    problem: 'Technical recruiters and founders waste dozens of hours skimming through hundreds of resumes, missing great engineering talent due to keyword matching bias.',
    solution: 'Engineered an automated recruitment system that ingests PDF resumes, checks GitHub commit history, and evaluates candidate fit in real-time in under 30 seconds.',
    details: [
      'Structured evaluation criteria assessing candidate code quality, stack fit, and project depth.',
      'Deterministic PDF extraction with automated validation guardrails.',
      'Live deployed on Vercel with FastAPI backend and Next.js frontend.'
    ],
    live: 'https://hire-panel-ai.vercel.app',
    github: 'https://github.com/Mahesh-Nandigam/HirePanel.Ai',
    stack: 'Python, FastAPI, Next.js, PostgreSQL, Vercel'
  },
  foundercopilot: {
    title: 'FounderCopilot.os — Operating System for Solo Founders',
    type: 'Full-Stack Productivity Platform & Founder Workspace',
    problem: 'Non-technical founders struggle to structure engineering roadmaps, define MVP specs, and execute development without burning capital on fractional CTOs.',
    solution: 'Built an interactive founder dashboard that transforms product ideas into technical architecture, user flow diagrams, and weekly development tasks ready for execution.',
    details: [
      'Interactive architecture generator for database schemas and system blueprints.',
      'Sprint planner breaking product visions into manageable commits and tasks.',
      'Sleek responsive web app built with React, Next.js, and modern Tailwind CSS.'
    ],
    live: 'https://founder-copilot-os.vercel.app',
    github: 'https://github.com/Mahesh-Nandigam/FounderCopilot.os',
    stack: 'React, Next.js, TypeScript, Tailwind CSS, Vercel'
  },
  applyjack: {
    title: 'ApplyJack — Autonomous Job Application Assistant',
    type: 'Career Automation & Application Personalizer',
    problem: 'Applying to tech jobs with generic mass applications results in automated ATS rejections. Tailoring applications manually takes hours per role.',
    solution: 'An automated application assistant that analyzes company job descriptions, extracts key technical requirements, and customizes candidate applications and outreach copy.',
    details: [
      'Instant job-to-resume matching algorithm highlighting relevant proof-of-work.',
      'Personalized pitch generator tailored to founder and engineering manager styles.',
      'Lightweight web interface built for speed and seamless daily job hunting.'
    ],
    live: 'https://apply-jack.vercel.app',
    github: 'https://github.com/Mahesh-Nandigam/ApplyJack',
    stack: 'JavaScript, HTML5, CSS3, Node.js, Vercel'
  },
  redrob: {
    title: 'Redrob Candidate Ranker — High-Scale Retrieval Pipeline',
    type: 'Data Retrieval & Scoring Engine',
    problem: 'Processing and ranking 100,000+ candidate profiles in real-time breaks under external API costs and high network latency.',
    solution: 'Designed a deterministic two-stage hybrid retrieval pipeline that scores and ranks massive applicant pools locally in sub-seconds with zero external API dependencies.',
    details: [
      'Two-stage retrieval combining lexical indexing with dense semantic embeddings.',
      'Processed 100,000+ candidate records with sub-second retrieval benchmark.',
      'Zero external API rate-limit bottlenecks.'
    ],
    github: 'https://github.com/Mahesh-Nandigam/redrob-candidate-ranker',
    stack: 'Python, Information Retrieval, Fast Parsing, Vector Scoring'
  },
  alertgrid: {
    title: 'AlertGrid — Real-Time Emergency Coordination Engine',
    type: 'Emergency Response & Automated Alert Dispatch',
    problem: 'During critical infrastructure failures or safety emergencies, manual coordination creates delays that risk operations and lives.',
    solution: 'An emergency response system that pairs automated incident severity scoring with instant multi-channel voice calls and SMS alerts using the Twilio API.',
    details: [
      'Real-time incident ingestion and automated priority classification.',
      'Twilio API integration for high-throughput voice dispatches and SMS cascades.',
      'Built in TypeScript and Node.js for low latency and zero downtime.'
    ],
    github: 'https://github.com/Mahesh-Nandigam/Alertgrid-ai',
    stack: 'TypeScript, Node.js, Twilio API, Webhooks'
  }
};

function initModals() {
  const modal = document.getElementById('case-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close');
  const openBtns = document.querySelectorAll('[data-modal]');

  if (!modal || !modalBody) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-modal');
      const item = CASE_STUDIES[key];
      if (!item) return;

      modalBody.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: var(--muted); background: var(--bg-tag); padding: 0.2rem 0.5rem; border-radius: 4px;">${item.type}</span>
          <h2 style="font-size: 1.45rem; font-weight: 700; margin: 0.75rem 0 0.5rem; letter-spacing: -0.02em;">${item.title}</h2>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <strong style="display: block; font-size: 0.92rem; color: var(--text); margin-bottom: 0.25rem;">the problem:</strong>
          <p style="font-size: 0.95rem; color: var(--muted); line-height: 1.6;">${item.problem}</p>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <strong style="display: block; font-size: 0.92rem; color: var(--text); margin-bottom: 0.25rem;">the solution:</strong>
          <p style="font-size: 0.95rem; color: var(--muted); line-height: 1.6;">${item.solution}</p>
        </div>

        <div style="margin-bottom: 1.25rem; background: var(--bg-card); padding: 1rem; border-radius: 6px; border: 1px solid var(--border);">
          <strong style="display: block; font-size: 0.85rem; color: var(--text); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem;">engineering details:</strong>
          <ul style="list-style: disc; padding-left: 1.25rem; font-size: 0.92rem; color: var(--muted); line-height: 1.6;">
            ${item.details.map(d => `<li style="margin-bottom: 0.35rem;">${d}</li>`).join('')}
          </ul>
        </div>

        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; color: var(--muted); margin-bottom: 1.5rem;">
          stack: <span style="color: var(--text);">${item.stack}</span>
        </div>

        <div style="border-top: 1px solid var(--border); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; gap: 1rem;">
            ${item.live ? `<a href="${item.live}" target="_blank" rel="noopener noreferrer" style="font-weight: 600; color: var(--accent-green); text-decoration: underline;">view live app &nearr;</a>` : ''}
            ${item.github ? `<a href="${item.github}" target="_blank" rel="noopener noreferrer" style="font-weight: 600; color: var(--link); text-decoration: underline;">github repo &nearr;</a>` : ''}
          </div>
          <a href="#contact" style="font-weight: 600; text-decoration: underline;" onclick="document.getElementById('case-modal').classList.remove('open');">hire me for a project &rarr;</a>
        </div>
      `;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* Contact Form */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const sendBtn = document.getElementById('send-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const msg = form.message.value.trim();

    if (!name || !email || !msg) {
      status.style.color = '#ef4444';
      status.textContent = 'please fill in all fields.';
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'sending...';

    setTimeout(() => {
      sendBtn.disabled = false;
      sendBtn.textContent = 'send message →';
      status.style.color = 'var(--accent-green)';
      status.innerHTML = `thanks ${name}! your message was sent. i will reply to <em>${email}</em> shortly.`;
      form.reset();
      showToast('message sent to mahesh!');
    }, 600);
  });
}
