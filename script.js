// =========================================================================
// MAHESH NANDIGAM — CLIENT ENGINE
// Live GitHub Data, Exact Apna College Delta Skills, Clickable Project Repos
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const data = typeof PORTFOLIO_DATA !== 'undefined' ? PORTFOLIO_DATA : null;
  if (!data) return;

  initTheme();
  initEmailTrigger();
  initDiscordCopy();
  renderProjects(data.projects);
  fetchLiveGitHubActivity(data.github);
  renderSkills(data.skills);
  renderBlogs(data.blogs);
});

// Email & Intro Call Triggers (Directly opens Gmail compose with To prefilled)
function initEmailTrigger() {
  const emailBtn = document.getElementById('btn-email');
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=nandigammahesh595@gmail.com', '_blank');
    });
  }

  const callBtn = document.getElementById('btn-call');
  if (callBtn) {
    callBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://topmate.io/mahesh_nandigam', '_blank');
    });
  }
}

// Discord Copy Handle Helper
function initDiscordCopy() {
  const discordPill = document.getElementById('discord-pill');
  if (discordPill) {
    discordPill.addEventListener('click', () => {
      navigator.clipboard.writeText('nandigammaheshbabu').then(() => {
        showToast('Discord tag copied: nandigammaheshbabu');
      }).catch(() => {
        showToast('Discord: nandigammaheshbabu');
      });
    });
  }
}

// 1. Two-Button Theme Switcher (Dark Mode / Light Mode)
function initTheme() {
  const btnDark = document.getElementById('btn-theme-dark');
  const btnLight = document.getElementById('btn-theme-light');

  const saved = localStorage.getItem('theme') || 'dark';
  apply(saved);

  if (btnDark) {
    btnDark.addEventListener('click', () => {
      apply('dark');
      localStorage.setItem('theme', 'dark');
    });
  }

  if (btnLight) {
    btnLight.addEventListener('click', () => {
      apply('light');
      localStorage.setItem('theme', 'light');
    });
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      if (btnLight) btnLight.classList.add('active');
      if (btnDark) btnDark.classList.remove('active');
    } else {
      if (btnDark) btnDark.classList.add('active');
      if (btnLight) btnLight.classList.remove('active');
    }
  }
}


// 2. Render Projects (Shipped with Live Demo and GitHub Repo links)
function renderProjects(projects) {
  const container = document.getElementById('projects-list');
  if (!container || !projects) return;

  container.innerHTML = projects.map(p => {
    const tagsHtml = (p.tags || []).map(t => `<span class="project-tag">${escapeHtml(t)}</span>`).join('');
    const demoLink = p.demoUrl ? `
      <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-ext-link" title="Open Live Demo">
        <span>Live Demo</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    ` : '';
    const repoLink = p.repoUrl ? `
      <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-ext-link" title="Open GitHub Repo">
        <span>GitHub</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    ` : '';

    return `
      <article class="project-item">
        <div class="project-head">
          <h3 class="project-name">${escapeHtml(p.title)}</h3>
          <div class="project-action-links">
            ${demoLink}
            ${repoLink}
          </div>
        </div>
        <p class="project-desc">${escapeHtml(p.description)}</p>
        <div class="project-tag-row">${tagsHtml}</div>
      </article>
    `;
  }).join('');
}

// 3. Live Real GitHub Heatmap Fetcher
async function fetchLiveGitHubActivity(ghConfig) {
  const grid = document.getElementById('gh-grid');
  const tooltip = document.getElementById('gh-tooltip');
  const totalCountEl = document.getElementById('gh-total-count');
  if (!grid) return;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  try {
    const res = await fetch(ghConfig.apiUrl);
    if (!res.ok) throw new Error('Network response not ok');
    const apiData = await res.json();

    const days = apiData.contributions || [];
    
    // Calculate total contributions from last 365 days
    let totalReal = 0;
    days.forEach(d => { totalReal += (d.count || 0); });
    
    if (totalCountEl) {
      totalCountEl.textContent = `${totalReal} contributions`;
    }

    grid.innerHTML = '';

    days.forEach(day => {
      const cell = document.createElement('div');
      cell.className = 'gh-cell';
      cell.setAttribute('data-level', day.level || 0);
      cell.setAttribute('data-count', day.count || 0);

      const dObj = new Date(day.date);
      const dateStr = `${months[dObj.getMonth()]} ${dObj.getDate()}, ${dObj.getFullYear()}`;
      cell.setAttribute('data-date', dateStr);

      cell.addEventListener('mouseenter', (e) => {
        if (!tooltip) return;
        const c = e.target.getAttribute('data-count');
        const d = e.target.getAttribute('data-date');
        tooltip.textContent = c === '0' ? `No contributions on ${d}` : `${c} contribution${c === '1' ? '' : 's'} on ${d}`;
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 6}px`;
        tooltip.style.opacity = '1';
      });

      cell.addEventListener('mouseleave', () => {
        if (tooltip) tooltip.style.opacity = '0';
      });

      cell.addEventListener('click', () => {
        window.open(ghConfig.profileUrl, '_blank');
      });

      grid.appendChild(cell);
    });

  } catch (err) {
    console.warn('Falling back to local calculated heatmap:', err.message);
    renderFallbackHeatmap(grid, tooltip, months);
  }
}

function renderFallbackHeatmap(grid, tooltip, months) {
  grid.innerHTML = '';
  const totalDays = 52 * 7;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - totalDays);

  for (let i = 0; i < totalDays; i++) {
    const current = new Date(startDate);
    current.setDate(startDate.getDate() + i);

    const isWeekend = current.getDay() === 0 || current.getDay() === 6;
    const seed = Math.abs((Math.sin(i * 9.123 + 45.67) * 10000) % 1);

    let level = 0;
    let count = 0;

    if (isWeekend) {
      if (seed > 0.72) { level = 1; count = 1; }
      else if (seed > 0.88) { level = 2; count = 2; }
    } else {
      if (seed > 0.85) { level = 3; count = 4; }
      else if (seed > 0.65) { level = 2; count = 2; }
      else if (seed > 0.35) { level = 1; count = 1; }
    }

    const cell = document.createElement('div');
    cell.className = 'gh-cell';
    cell.setAttribute('data-level', level);
    cell.setAttribute('data-count', count);

    const dateStr = `${months[current.getMonth()]} ${current.getDate()}, ${current.getFullYear()}`;
    cell.setAttribute('data-date', dateStr);

    cell.addEventListener('mouseenter', (e) => {
      if (!tooltip) return;
      const c = e.target.getAttribute('data-count');
      const d = e.target.getAttribute('data-date');
      tooltip.textContent = c === '0' ? `No contributions on ${d}` : `${c} contribution${c === '1' ? '' : 's'} on ${d}`;
      const rect = e.target.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - 6}px`;
      tooltip.style.opacity = '1';
    });

    cell.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.style.opacity = '0';
    });

    grid.appendChild(cell);
  }
}

// 4. Render Skills (Exact groups: Full Stack & Languages)
function renderSkills(skills) {
  const container = document.getElementById('skills-list');
  if (!container || !skills) return;

  container.innerHTML = skills.map(sec => {
    const groupsHtml = (sec.groups || []).map(g => {
      const itemsHtml = (g.items || []).map(it => `
        <div class="skill-pill">
          <i class="${escapeHtml(it.icon)}"></i>
          <span>${escapeHtml(it.name)}</span>
        </div>
      `).join('');

      return `
        <div style="margin-bottom: 12px;">
          <h4 class="skill-cat-title">${escapeHtml(g.name)}</h4>
          <div class="skill-chips-row">${itemsHtml}</div>
        </div>
      `;
    }).join('');

    return `
      <div style="margin-bottom: 16px;">
        <h3 style="font-size: 13.5px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.05em;">${escapeHtml(sec.section)}</h3>
        ${groupsHtml}
      </div>
    `;
  }).join('');
}

// 5. Render Blogs
function renderBlogs(blogs) {
  const container = document.getElementById('blogs-list');
  if (!container || !blogs) return;

  container.innerHTML = blogs.map(b => `
    <a href="${b.url}" target="_blank" rel="noopener noreferrer" class="blog-item">
      <div class="blog-meta-top">
        <span>${escapeHtml(b.platform)}</span>
        <span>•</span>
        <span>${escapeHtml(b.readTime)}</span>
      </div>
      <h3 class="blog-heading">${escapeHtml(b.title)} ↗</h3>
      <p class="blog-snippet">${escapeHtml(b.excerpt)}</p>
    </a>
  `).join('');
}

// 6. Clipboard & Toast
function copyEmail(email) {
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Copied ${email} to clipboard`);
  }).catch(() => {
    showToast('Copied email to clipboard');
  });
}

function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

