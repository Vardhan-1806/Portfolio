// Script to generate the 3D Tech Stack & Interactive Physics Sandbox for about.html
const fs = require('fs');
const path = require('path');

// Verified SVG icons and stack from Reference Screenshot 2 + 2026 AI Stack
const TECH_CATEGORIES = [
  {
    id: 'programming',
    title: 'Programming Languages',
    subtitle: 'Core algorithmic & systems foundation',
    items: [
      {
        name: 'Java',
        scope: 'Language · OOP · Concurrency · DSA',
        color: '#E76F00',
        bg: 'rgba(231,111,0,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><path fill="#5382A1" d="M8.8 19.3c3.4.2 6.5-.4 9.1-1.6.4-.2.9.2.6.6-1.5 2.1-4.8 3.1-8.5 2.7-3.9-.4-5.3-2.3-5-2.6.4-.3 1.9.8 3.8.9z"/><path fill="#E76F00" d="M12.9 14.8c1.9 1.9-1.2 3.6-1.2 3.6s3.3-.9 2.2-3.1c-1-2.1-3.1-3.1-4.2-4.8-.8-1.3-.4-2.5-.4-2.5s-.8 1.4-.4 2.8c.6 1.8 2.3 2.3 4 4z"/><path fill="#5382A1" d="M17.4 15.6c.4-.2.8.2.5.6-1.1 1.4-3.1 2.3-5.7 2.3-3.1 0-5.5-1.2-5.5-1.2s1.4.6 3.9.6c3.2 0 5.4-1.2 6.8-2.3z"/><path fill="#E76F00" d="M8.2 11.2c-.4 1.1-.3 2.1.2 2.8.8 1 2.1 1.2 3.3 1.7 1.7.7 3.3 1.6 3.3 3.6 0 0 .5-1.5-1.1-2.8-1.5-1.1-2.9-1.4-4-2.1-1-1-1.3-1.9-1.7-3.2z"/><path fill="#5382A1" d="M19.4 18.2c-.8.9-2.1 1.7-3.8 2.2-3.2.9-7.5.8-10.2-.4-.3-.1-.5-.5-.1-.7.4-.2 1.4.4 3.7.6 3.6.3 7.8-.3 9.7-1.4.3-.2.7.2.7.5z"/></svg>`
      },
      {
        name: 'C / C++',
        scope: 'DSA · Systems · Memory Management',
        color: '#00599C',
        bg: 'rgba(0,89,156,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><rect width="24" height="24" rx="5" fill="#00599C"/><text x="50%" y="62%" dominant-baseline="middle" text-anchor="middle" font-family="'DM Mono', monospace" font-size="11" font-weight="bold" fill="#ffffff">C++</text></svg>`
      },
      {
        name: 'Python',
        scope: 'NLP · RAG · Automation · Data Structures',
        color: '#3776AB',
        bg: 'rgba(55,118,171,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><path fill="#3776AB" d="M11.9 2c-4.5 0-4.2 1.9-4.2 1.9l.01 2h4.3v.6H5.9S3.5 6.2 3.5 10.7c0 4.5 2.1 4.3 2.1 4.3h1.2v-1.8c0-2.1 1.8-2.1 1.8-2.1h4.2s1.7 0 1.7-1.7V4.2S14.9 2 11.9 2zm-1.2 1.2a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z"/><path fill="#FFD43B" d="M12.1 22c4.5 0 4.2-1.9 4.2-1.9l-.01-2h-4.3v-.6h6.1s2.4.3 2.4-4.2c0-4.5-2.1-4.3-2.1-4.3h-1.2v1.8c0 2.1-1.8 2.1-1.8 2.1H11.2s-1.7 0-1.7 1.7v5.2s-.4 2.2 2.6 2.2zm1.2-1.2a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z"/></svg>`
      },
      {
        name: 'JavaScript',
        scope: 'ES6+ · Asynchronous · DOM · V8 Runtimes',
        color: '#F7DF1E',
        bg: 'rgba(247,223,30,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path fill="#000000" d="M6.5 18.2c.4.7 1.1 1.2 2.1 1.2 1.2 0 2-.6 2-1.9v-6.9h-1.9v6.8c0 .5-.2.8-.7.8-.4 0-.6-.2-.8-.6l-.7.6zm6.8 0c.5.8 1.4 1.3 2.7 1.3 1.8 0 2.8-1 2.8-2.4 0-1.5-1-2.1-2.3-2.6-.9-.4-1.3-.7-1.3-1.3 0-.5.4-.9 1.1-.9.6 0 1.1.3 1.4.8l1.4-.9c-.6-1-1.6-1.5-2.8-1.5-1.7 0-2.8 1-2.8 2.3 0 1.4.9 2 2.2 2.5 1 .4 1.4.8 1.4 1.4 0 .6-.5 1-1.3 1-.8 0-1.3-.4-1.7-1l-1.3.8z"/></svg>`
      }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    subtitle: 'Responsive architectures & state management',
    items: [
      {
        name: 'React.js',
        scope: 'Hooks · State · UI · Virtual DOM',
        color: '#61DAFB',
        bg: 'rgba(97,218,251,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><ellipse cx="12" cy="12" rx="3.5" ry="9.5" fill="none" stroke="#61DAFB" stroke-width="1.2" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="3.5" ry="9.5" fill="none" stroke="#61DAFB" stroke-width="1.2" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="3.5" ry="9.5" fill="none" stroke="#61DAFB" stroke-width="1.2" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="1.8" fill="#61DAFB"/></svg>`
      },
      {
        name: 'HTML5 & CSS3',
        scope: 'Semantic UI · Flex/Grid · 3D Transforms',
        color: '#E34F26',
        bg: 'rgba(227,79,38,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><path fill="#E34F26" d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3zm15.1 5.3l-.2 2.1H8.8l.2 2.2h8.7l-.6 6.3-4.1 1.1-4.1-1.1-.3-3.1h2.1l.1 1.4 2.2.6 2.2-.6.2-2.5H6.5L5.8 4.7h12.5l-.2 2.6z"/></svg>`
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    subtitle: 'Server runtimes, RESTful APIs & services',
    items: [
      {
        name: 'Node.js',
        scope: 'Backend Runtime · Event Loop · Streams',
        color: '#339933',
        bg: 'rgba(51,153,51,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><path fill="#339933" d="M12 2.2l8.5 4.9v9.8L12 21.8 3.5 16.9V7.1L12 2.2zm0 2.2L5.4 8.2v7.6L12 19.6l6.6-3.8V8.2L12 4.4z"/><path fill="#339933" d="M12 7.5a4.5 4.5 0 0 1 4.5 4.5c0 2.5-2 4.5-4.5 4.5a4.5 4.5 0 0 1-4.5-4.5c0-2.5 2-4.5 4.5-4.5z"/></svg>`
      },
      {
        name: 'Express.js',
        scope: 'RESTful APIs · Routing · Middleware Pipeline',
        color: '#444444',
        bg: 'rgba(68,68,68,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="'DM Mono', monospace" font-size="14" font-weight="bold" fill="#362c24">ex</text><rect x="2" y="4" width="20" height="16" rx="4" fill="none" stroke="#362c24" stroke-width="1.8"/></svg>`
      },
      {
        name: 'Spring Boot',
        scope: 'Enterprise Microservices · Spring Data · REST',
        color: '#6DB33F',
        bg: 'rgba(109,179,63,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><path fill="#6DB33F" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.5 14.5c-.8.8-2 .9-2.9.2a6 6 0 0 1-2.8-4.7c0-2.1 1.3-4.2 3.3-5.2.4-.2.8.2.6.6a5 5 0 0 0 1.2 5.5c.9.9 1.1 2.3.6 3.6z"/></svg>`
      }
    ]
  },
  {
    id: 'database',
    title: 'Database Architecture',
    subtitle: 'Relational schemas & document stores',
    items: [
      {
        name: 'MongoDB',
        scope: 'Aggregations · Atlas · Document Models',
        color: '#47A248',
        bg: 'rgba(71,162,72,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><path fill="#47A248" d="M12 2.2C11.5 3.5 7.5 9.7 7.5 13.5c0 4.1 2.8 6.9 4.5 7.8 1.7-.9 4.5-3.7 4.5-7.8 0-3.8-4-10-4.5-11.3zm0 17.6c-.2-.1-3-1.6-3-6.3 0-2.8 2.3-6.8 3-7.9.7 1.1 3 5.1 3 7.9 0 4.7-2.8 6.2-3 6.3z"/></svg>`
      },
      {
        name: 'SQL',
        scope: 'Relational Schemas · Indexing · Complex Joins',
        color: '#00758F',
        bg: 'rgba(0,117,143,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><ellipse cx="12" cy="6" rx="8" ry="3" fill="#00758F"/><path fill="#00758F" d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6c0 1.66-3.58 3-8 3S4 7.66 4 6z"/><path fill="#00758F" d="M4 11v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4c0 1.66-3.58 3-8 3s-8-1.34-8-3z"/><path fill="#00758F" d="M4 16v2c0 1.66 3.58 3 8 3s8-1.34 8-3v-2c0 1.66-3.58 3-8 3s-8-1.34-8-3z"/></svg>`
      },
      {
        name: 'PostgreSQL',
        scope: 'ACID Transactions · Normalized Relations',
        color: '#336791',
        bg: 'rgba(51,103,145,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><path fill="#336791" d="M12 2C6.5 2 2 6.5 2 12c0 4.8 3.4 8.8 8 9.8V15h-2v-3h2v-2c0-2.2 1.3-3.4 3.3-3.4 1 0 1.9.1 2.1.1v2.4h-1.4c-1.1 0-1.4.5-1.4 1.3v1.6h2.7l-.4 3h-2.3v6.8c4.6-1 8-5 8-9.8 0-5.5-4.5-10-10-10z"/></svg>`
      }
    ]
  },
  {
    id: 'tools',
    title: 'Tools, DevOps & Security',
    subtitle: 'Version workflows, containerization & authentication',
    items: [
      {
        name: 'Git & GitHub',
        scope: 'Version Control · CI/CD · Actions Pipeline',
        color: '#F05032',
        bg: 'rgba(240,80,50,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><path fill="#F05032" d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L9.1 4.3l2.7 2.7c.6-.2 1.4 0 1.9.5.5.5.7 1.3.5 1.9l2.6 2.6c.6-.2 1.4 0 1.9.5.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.6-.6-.7-1.4-.4-2.1l-2.4-2.4v5.3c.2.2.3.5.3.8 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.5.2-.9.6-1.2V9.6c-.4-.3-.6-.7-.6-1.2 0-.6.3-1.1.8-1.4L8.7 4.3 2.4 10.6c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.6c.6-.5.6-1.4 0-1.7z"/></svg>`
      },
      {
        name: 'JWT Security',
        scope: 'Auth & RBAC · Dual-Token Cookies · Tokens',
        color: '#D63AFF',
        bg: 'rgba(214,58,255,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><path fill="#D63AFF" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>`
      },
      {
        name: 'Docker',
        scope: 'Containers · Images · Production Packaging',
        color: '#2496ED',
        bg: 'rgba(36,150,237,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><path fill="#2496ED" d="M13.9 11.2h2v2h-2zm-2.7 0h2v2h-2zm-2.6 0h2v2h-2zm5.3-2.6h2v2h-2zm-2.7 0h2v2h-2zm-2.6 0h2v2h-2zm-2.7 0h2v2h-2zm5.3-2.6h2v2h-2zm-2.7 0h2v2h-2zm12 8.7c-.5-.4-1.6-.4-2.5 0-.2-1.3-1.1-2.4-2.5-2.8l-.5-.2-.3.4c-.6.9-1.6 1.4-2.7 1.4H2.4c-.4 1.8.2 4.1 1.7 5.8 1.7 1.8 4.2 2.7 7.7 2.7 7.3 0 11.6-4.6 11.6-8.7 0-.4 0-.7-.1-1.1l-.3.2z"/></svg>`
      },
      {
        name: 'AWS',
        scope: 'Cloud Infrastructure · S3 · EC2 Foundations',
        color: '#FF9900',
        bg: 'rgba(255,153,0,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><path fill="#FF9900" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15.2c-2.9 0-5.1-1.3-6.5-3.3.3-.2.6-.4 1-.2 1.1 1.6 2.8 2.6 5.2 2.6 2.6 0 4.6-1.1 5.8-2.8.3-.4.8-.2.9.2-1.3 2.1-3.6 3.5-6.4 3.5zm4.8-5.4c-.4.5-1.1.7-1.9.7-.7 0-1.4-.2-1.8-.7-.4-.5-.6-1.2-.6-2.1 0-.9.2-1.6.6-2.1.4-.5 1.1-.7 1.8-.7.8 0 1.5.2 1.9.7.4.5.6 1.2.6 2.1 0 .9-.2 1.6-.6 2.1z"/></svg>`
      }
    ]
  },
  {
    id: 'ai-engineering',
    title: 'AI Engineering & Systems',
    subtitle: 'RAG pipelines, LLM orchestration & agents',
    items: [
      {
        name: 'RAG Systems',
        scope: 'Vector Search · Sub-2s Latency · LexAssist',
        color: '#7C3AED',
        bg: 'rgba(124,58,237,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><path fill="#7C3AED" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`
      },
      {
        name: 'LLMs',
        scope: 'Prompt Engineering · Structured JSON Schemas',
        color: '#2563EB',
        bg: 'rgba(37,99,235,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><circle cx="12" cy="12" r="3" fill="#2563EB"/><circle cx="12" cy="4" r="2" fill="#2563EB"/><circle cx="12" cy="20" r="2" fill="#2563EB"/><circle cx="4" cy="12" r="2" fill="#2563EB"/><circle cx="20" cy="12" r="2" fill="#2563EB"/><line x1="12" y1="6" x2="12" y2="9" stroke="#2563EB" stroke-width="1.8"/><line x1="12" y1="15" x2="12" y2="18" stroke="#2563EB" stroke-width="1.8"/><line x1="6" y1="12" x2="9" y2="12" stroke="#2563EB" stroke-width="1.8"/><line x1="15" y1="12" x2="18" y2="12" stroke="#2563EB" stroke-width="1.8"/></svg>`
      },
      {
        name: 'AI Agents',
        scope: 'Autonomous Tool Use · State Machines · Loops',
        color: '#059669',
        bg: 'rgba(5,150,105,0.08)',
        svg: `<svg viewBox="0 0 24 24" width="36" height="36"><circle cx="12" cy="12" r="9" fill="none" stroke="#059669" stroke-width="2"/><path d="M12 7v5l3 3" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="2" fill="#059669"/></svg>`
      }
    ]
  }
];

function generateTechSectionHtml() {
  let categoriesNav = `
    <div class="tech-view-controls rv d1">
      <div class="tech-mode-switcher" role="tablist" aria-label="Tech Stack presentation mode">
        <button class="tech-mode-btn is-active" id="btnModeUniverse" data-mode="universe">
          <span class="mode-icon">🌌</span> 3D Dimensional Universe
        </button>
        <button class="tech-mode-btn" id="btnModeSandbox" data-mode="sandbox">
          <span class="mode-icon">🎮</span> Interactive Physics Sandbox
        </button>
      </div>

      <div class="tech-category-pills" id="techCategoryPills" role="tablist">
        <button class="tech-pill active" data-cat="all">All Stack (18)</button>
        <button class="tech-pill" data-cat="programming">Programming</button>
        <button class="tech-pill" data-cat="frontend">Frontend</button>
        <button class="tech-pill" data-cat="backend">Backend</button>
        <button class="tech-pill" data-cat="database">Database</button>
        <button class="tech-pill" data-cat="tools">Tools & Security</button>
        <button class="tech-pill" data-cat="ai-engineering">AI Engineering</button>
      </div>
    </div>
  `;

  let universeHtml = `<div class="tech-universe-view" id="techUniverseView">`;

  TECH_CATEGORIES.forEach(cat => {
    universeHtml += `
      <div class="tech-cat-block" data-category="${cat.id}">
        <div class="tech-cat-header">
          <div class="tech-cat-indicator"></div>
          <div>
            <h3 class="tech-cat-title">${cat.title}</h3>
            <p class="tech-cat-subtitle">${cat.subtitle}</p>
          </div>
        </div>
        <div class="tech-3d-grid">
    `;

    cat.items.forEach(tech => {
      universeHtml += `
        <div class="tech-3d-tile" data-cat="${cat.id}" style="--tech-accent: ${tech.color};" onclick="window.openStackInspector && window.openStackInspector('${tech.name}')">
          <div class="tech-tile-inner">
            <div class="tech-tile-glare"></div>
            <div class="tech-tile-logo" style="background: ${tech.bg}; border-color: ${tech.color}22;">
              ${tech.svg}
            </div>
            <div class="tech-tile-info">
              <div class="tech-tile-name">${tech.name}</div>
              <div class="tech-tile-scope">${tech.scope}</div>
              <div class="tech-inspect-badge">
                <span>&lt;/&gt;</span> Inspect Real Code
              </div>
            </div>
            <div class="tech-tile-badge">Verified Stack</div>
          </div>
        </div>
      `;
    });

    universeHtml += `
        </div>
      </div>
    `;
  });

  universeHtml += `</div>`;

  // Sandbox HTML (Screenshot 3 style)
  let sandboxHtml = `
    <div class="tech-sandbox-view" id="techSandboxView" style="display: none;">
      <div class="sandbox-card-frame">
        <div class="sandbox-header">
          <div>
            <div class="sandbox-tag">INTERACTIVE SANDBOX</div>
            <h3 class="sandbox-title">Core Technologies &amp; Stack</h3>
          </div>
          <button type="button" class="sandbox-reset-btn" id="sandboxResetBtn" title="Reset Gravity and Drop Badges">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
            <span>Reset</span>
          </button>
        </div>

        <div class="sandbox-canvas-wrapper" id="sandboxCanvasWrapper">
          <canvas id="sandboxCanvas"></canvas>
          <div class="sandbox-hint">
            <span>💡 Grab and toss technology badges · Watch real-time physics collisions</span>
          </div>
        </div>
      </div>
    </div>
  `;

  return `
<!-- SECTION: 3D TECH STACK & INTERACTIVE PHYSICS SANDBOX -->
<section class="sec sec-alt" id="tech">
  <div class="wrap">
    <div class="sec-label rv">
      <span class="sl-n">02</span><span class="sl-bar"></span><span class="sl-t">Technology Stack</span>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; margin-bottom: 32px;">
      <div>
        <h2 class="sec-h rv" style="margin-bottom: 6px;">
          Tools &amp; technologies<br><em>I build with.</em>
        </h2>
        <div style="font-family: var(--mono); font-size: 11.5px; color: var(--olive); font-weight: 600;">
          Click any card to inspect verified production code &amp; architectural rationale &rarr;
        </div>
      </div>
      <div class="sec-sub rv" style="max-width: 480px; font-size: 15px; color: var(--ink2); line-height: 1.6;">
        Every technology represents verified hands-on production code, algorithm implementations, or architectural pipelines. No invented percentages.
      </div>
    </div>

    ${categoriesNav}
    ${universeHtml}
    ${sandboxHtml}
  </div>
</section>
  `;
}

module.exports = { TECH_CATEGORIES, generateTechSectionHtml };
