const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'projects.html');
let html = fs.readFileSync(filePath, 'utf8');

// Replace the filter buttons and deep projects list with the 3D Layered Deck Showcase
const oldSectionRegex = /<!-- MAIN PROJECTS SECTION -->[\s\S]*?<!-- ENGINEERING METHODOLOGY STRIP -->/;

const newDeckSection = `<!-- MAIN PROJECTS SECTION: 3D LAYERED DECK SHOWCASE -->
<section class="sec deck-showcase-section" id="deck">
  <div class="wrap">
    <div class="sec-label rv">
      <span class="sl-n">01</span><span class="sl-bar"></span><span class="sl-t">Interactive 3D Deck Showcase</span>
    </div>
    
    <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; margin-bottom: 36px;">
      <div>
        <h2 class="sec-h rv" style="font-size: clamp(32px, 4vw, 52px); margin-bottom: 8px;">
          Flagship Software.<br><em>Layered Architecture Showcase.</em>
        </h2>
        <p style="font-size: 15px; color: var(--ink2); max-width: 620px;">
          Explore verified systems through physical 3D perspective panels. Click <strong>Next</strong> or drag to flip between projects, and select <strong>Explore Specification</strong> for architectural deep dives.
        </p>
      </div>

      <!-- Quick Category Jump -->
      <div class="project-filter-bar rv" role="tablist" aria-label="Jump to project category">
        <button class="project-filter-btn active" data-deck-jump="0" role="tab" aria-selected="true">01 LexAssist</button>
        <button class="project-filter-btn" data-deck-jump="1" role="tab" aria-selected="false">02 TravelMate</button>
        <button class="project-filter-btn" data-deck-jump="2" role="tab" aria-selected="false">03 Socially</button>
        <button class="project-filter-btn" data-deck-jump="3" role="tab" aria-selected="false">04 AlgoMotion</button>
      </div>
    </div>

    <!-- 3D Perspective Stage -->
    <div class="deck-stage" id="deckStage" aria-roledescription="carousel" aria-label="Projects 3D Deck">
      <div class="deck-stack" id="deckStack">

        <!-- PANEL 01: LexAssist -->
        <article class="deck-panel is-active" data-index="0" data-id="lexassist" aria-label="Project 1 of 4: LexAssist">
          <div class="deck-preview-frame">
            <div class="deck-preview-chrome">
              <div class="deck-chrome-dots">
                <span></span><span></span><span></span>
              </div>
              <span class="deck-chrome-url">https://lexassist-six.vercel.app</span>
              <span class="deck-chrome-status">Railway · Production Live</span>
            </div>
            <div class="deck-preview-content">
              <div class="deck-preview-icon">⚖️</div>
              <div class="deck-preview-placeholder-text">Dedicated Project Preview Canvas</div>
              <p class="deck-preview-subtext">RAG-Powered Statutory Legal Assistant · Multi-Portal Architecture · Sub-2s Latency</p>
            </div>
          </div>

          <div class="deck-body">
            <div>
              <div class="deck-meta-top">
                <span class="deck-index-badge">01 // AI &amp; NLP SYSTEM</span>
                <span class="deck-category-badge">Generative AI · RAG</span>
              </div>
              <h3 class="deck-title">LexAssist — AI Legal Assistant &amp; Consultation Platform</h3>
              <p class="deck-desc">
                High-performance conversational legal intelligence assistant powered by Retrieval-Augmented Generation (RAG). Ingests Indian civil statutes, constitutional precedents, and procedures to provide statutory citations in under 2 seconds while automating attorney consultation booking.
              </p>
              <div class="deck-tag-row">
                <span class="deck-tag hi">NLP / RAG</span>
                <span class="deck-tag">Node.js</span>
                <span class="deck-tag">Express.js</span>
                <span class="deck-tag">MongoDB Atlas</span>
                <span class="deck-tag">JWT Security</span>
                <span class="deck-tag">Railway Cloud</span>
              </div>
            </div>

            <div class="deck-actions-row">
              <a href="project-lexassist.html" class="deck-detail-link">
                Explore Specification &rarr;
              </a>
              <a href="https://github.com/Vardhan-1806/LexAssist" target="_blank" rel="noopener" class="deck-repo-link" title="Open GitHub Repository">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub Repo &nearr;
              </a>
            </div>
          </div>
        </article>

        <!-- PANEL 02: TravelMate -->
        <article class="deck-panel is-next" data-index="1" data-id="travelmate" aria-label="Project 2 of 4: TravelMate">
          <div class="deck-preview-frame">
            <div class="deck-preview-chrome">
              <div class="deck-chrome-dots">
                <span></span><span></span><span></span>
              </div>
              <span class="deck-chrome-url">https://travelmate-bfqv.onrender.com</span>
              <span class="deck-chrome-status">Render · Backend Live</span>
            </div>
            <div class="deck-preview-content">
              <div class="deck-preview-icon">✈️</div>
              <div class="deck-preview-placeholder-text">Dedicated Project Preview Canvas</div>
              <p class="deck-preview-subtext">AI Social Travel Engine · Socket.IO Real-Time Chat · Minimal Debt Settlement</p>
            </div>
          </div>

          <div class="deck-body">
            <div>
              <div class="deck-meta-top">
                <span class="deck-index-badge">02 // SOCIAL TRAVEL PLATFORM</span>
                <span class="deck-category-badge">Real-Time · Full-Stack</span>
              </div>
              <h3 class="deck-title">TravelMate — Collaborative Social Travel Platform</h3>
              <p class="deck-desc">
                An AI-powered social travel application unifying compatibility-based traveler matching, group formation, room-based Socket.IO WebSocket chat, and an automated minimal-transaction expense settlement algorithm.
              </p>
              <div class="deck-tag-row">
                <span class="deck-tag hi">React + Vite</span>
                <span class="deck-tag">Node.js</span>
                <span class="deck-tag">Socket.IO</span>
                <span class="deck-tag">MongoDB Atlas</span>
                <span class="deck-tag">Gemini AI</span>
                <span class="deck-tag">Render Cloud</span>
              </div>
            </div>

            <div class="deck-actions-row">
              <a href="project-travelmate.html" class="deck-detail-link">
                Explore Specification &rarr;
              </a>
              <a href="https://github.com/Vardhan-1806/TravelMate" target="_blank" rel="noopener" class="deck-repo-link" title="Open GitHub Repository">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub Repo &nearr;
              </a>
            </div>
          </div>
        </article>

        <!-- PANEL 03: Socially -->
        <article class="deck-panel is-hidden" data-index="2" data-id="socially" aria-label="Project 3 of 4: Socially">
          <div class="deck-preview-frame">
            <div class="deck-preview-chrome">
              <div class="deck-chrome-dots">
                <span></span><span></span><span></span>
              </div>
              <span class="deck-chrome-url">https://socially-omega-seven.vercel.app</span>
              <span class="deck-chrome-status">Vercel · Live Deployed</span>
            </div>
            <div class="deck-preview-content">
              <div class="deck-preview-icon">🌐</div>
              <div class="deck-preview-placeholder-text">Dedicated Project Preview Canvas</div>
              <p class="deck-preview-subtext">MERN Social Platform · Cloudinary CDN · Optimistic UI Updates</p>
            </div>
          </div>

          <div class="deck-body">
            <div>
              <div class="deck-meta-top">
                <span class="deck-index-badge">03 // FULL-STACK MERN</span>
                <span class="deck-category-badge">Social Architecture</span>
              </div>
              <h3 class="deck-title">Socially — Full-Stack Scalable Social Network</h3>
              <p class="deck-desc">
                Production-grade social media platform engineered with React.js, Express.js, and MongoDB Atlas. Features rich media publishing with Cloudinary transformations, nested discussion threads, optimistic UI updates, and HTTP-only dual-token auth.
              </p>
              <div class="deck-tag-row">
                <span class="deck-tag hi">React.js</span>
                <span class="deck-tag">Node.js</span>
                <span class="deck-tag">Express.js</span>
                <span class="deck-tag">MongoDB Atlas</span>
                <span class="deck-tag">Cloudinary</span>
                <span class="deck-tag">Vercel</span>
              </div>
            </div>

            <div class="deck-actions-row">
              <a href="project-socially.html" class="deck-detail-link">
                Explore Specification &rarr;
              </a>
              <a href="https://github.com/Vardhan-1806/Socially" target="_blank" rel="noopener" class="deck-repo-link" title="Open GitHub Repository">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub Repo &nearr;
              </a>
            </div>
          </div>
        </article>

        <!-- PANEL 04: AlgoMotion -->
        <article class="deck-panel is-prev" data-index="3" data-id="algomotion" aria-label="Project 4 of 4: AlgoMotion">
          <div class="deck-preview-frame">
            <div class="deck-preview-chrome">
              <div class="deck-chrome-dots">
                <span></span><span></span><span></span>
              </div>
              <span class="deck-chrome-url">github.com/Vardhan-1806/Tree_Traversal</span>
              <span class="deck-chrome-status">Open Source Engine</span>
            </div>
            <div class="deck-preview-content">
              <div class="deck-preview-icon">🌳</div>
              <div class="deck-preview-placeholder-text">Dedicated Project Preview Canvas</div>
              <p class="deck-preview-subtext">Interactive Binary Tree Visualizer · DFS &amp; BFS Playback · 60 FPS Native DOM</p>
            </div>
          </div>

          <div class="deck-body">
            <div>
              <div class="deck-meta-top">
                <span class="deck-index-badge">04 // ALGORITHM VISUALIZATION</span>
                <span class="deck-category-badge">Vanilla JS · Data Structures</span>
              </div>
              <h3 class="deck-title">AlgoMotion — Algorithm &amp; Data Structure Engine</h3>
              <p class="deck-desc">
                An interactive algorithmic execution visualizer engineered in vanilla ES6+ JavaScript. Features real-time node highlighting for binary tree traversals (Inorder, Preorder, Postorder, BFS), step-by-step state playback, and call stack introspection.
              </p>
              <div class="deck-tag-row">
                <span class="deck-tag hi">JavaScript (ES6+)</span>
                <span class="deck-tag">DOM Manipulation</span>
                <span class="deck-tag">Binary Trees</span>
                <span class="deck-tag">Graph Algorithms</span>
                <span class="deck-tag">State Machine</span>
              </div>
            </div>

            <div class="deck-actions-row">
              <a href="project-algomotion.html" class="deck-detail-link">
                Explore Specification &rarr;
              </a>
              <a href="https://github.com/Vardhan-1806/Tree_Traversal" target="_blank" rel="noopener" class="deck-repo-link" title="Open GitHub Repository">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub Repo &nearr;
              </a>
            </div>
          </div>
        </article>

      </div>
    </div>

    <!-- 3D Deck Navigation Controls -->
    <div class="deck-controls rv">
      <button class="deck-nav-btn" id="deckPrevBtn" aria-label="Previous project panel">
        &larr; Previous
      </button>

      <span class="deck-counter-badge" id="deckCounter">01 / 04</span>

      <button class="deck-nav-btn" id="deckNextBtn" aria-label="Next project panel">
        Next Project &rarr;
      </button>
    </div>

  </div>
</section>

<!-- ENGINEERING METHODOLOGY STRIP -->`;

if (!oldSectionRegex.test(html)) {
  console.error("Could not find old section in projects.html!");
  process.exit(1);
}

html = html.replace(oldSectionRegex, newDeckSection);

// Update script at bottom of projects.html to handle 3D Deck logic
const oldScriptRegex = /<script>[\s\S]*?<\/script>\s*<\/body>/;

const newDeckScript = `<script>
  // ========================================================
  // 3D LAYERED PROJECT DECK CONTROLLER
  // ========================================================
  (function initProjects3DDeck() {
    const panels = document.querySelectorAll('.deck-panel');
    const prevBtn = document.getElementById('deckPrevBtn');
    const nextBtn = document.getElementById('deckNextBtn');
    const counter = document.getElementById('deckCounter');
    const jumpBtns = document.querySelectorAll('[data-deck-jump]');
    const total = panels.length;
    if (!total) return;

    // Read stored or hash index
    let current = 0;
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const idx = [...panels].findIndex(p => p.dataset.id === hash);
      if (idx !== -1) current = idx;
    } else {
      const saved = sessionStorage.getItem('asv_deck_active_idx');
      if (saved) current = parseInt(saved, 10) || 0;
    }

    function updateDeck(newIdx) {
      current = (newIdx + total) % total;
      sessionStorage.setItem('asv_deck_active_idx', current);

      panels.forEach((panel, i) => {
        panel.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden');
        if (i === current) {
          panel.classList.add('is-active');
          panel.setAttribute('aria-hidden', 'false');
        } else if (i === (current - 1 + total) % total) {
          panel.classList.add('is-prev');
          panel.setAttribute('aria-hidden', 'true');
        } else if (i === (current + 1) % total) {
          panel.classList.add('is-next');
          panel.setAttribute('aria-hidden', 'true');
        } else {
          panel.classList.add('is-hidden');
          panel.setAttribute('aria-hidden', 'true');
        }
      });

      if (counter) {
        counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
      }

      jumpBtns.forEach((btn, i) => {
        btn.classList.toggle('active', i === current);
        btn.setAttribute('aria-selected', i === current ? 'true' : 'false');
      });
    }

    // Direct clicks on panels
    panels.forEach((p, idx) => {
      p.addEventListener('click', (e) => {
        if (e.target.closest('a')) return; // Allow normal link clicks
        if (idx !== current) {
          e.preventDefault();
          updateDeck(idx);
        }
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => updateDeck(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateDeck(current + 1));

    jumpBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = parseInt(btn.dataset.deckJump, 10);
        if (!isNaN(target)) updateDeck(target);
      });
    });

    // Keyboard arrow navigation
    document.addEventListener('keydown', (e) => {
      const deckEl = document.getElementById('deckStage');
      if (!deckEl) return;
      const rect = deckEl.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        updateDeck(current + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        updateDeck(current - 1);
      }
    });

    // Touch / Pointer Swipe Support
    let startX = 0;
    let isSwiping = false;
    const stage = document.getElementById('deckStage');
    if (stage) {
      stage.addEventListener('pointerdown', (e) => {
        if (e.target.closest('a')) return;
        startX = e.clientX;
        isSwiping = true;
      });
      stage.addEventListener('pointerup', (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        const diffX = e.clientX - startX;
        if (diffX < -50) updateDeck(current + 1);
        else if (diffX > 50) updateDeck(current - 1);
      });
    }

    updateDeck(current);
  })();
</script>
</body>`;

html = html.replace(oldScriptRegex, newDeckScript);

// Also replace footer in projects.html with the universal persistent footer with verified profiles
const oldFooterRegex = /<!-- FOOTER -->[\s\S]*?<\/footer>/;
const universalFooter = `<!-- UNIVERSAL PERSISTENT FOOTER -->
<footer>
  <div class="foot-inner">
    <div class="foot-copy">
      Alisam Srivardhan &middot; <span class="current-year"></span> &middot; Verified Developer Portfolio
    </div>

    <!-- Persistent Verified Social & Coding Profiles -->
    <div class="persistent-foot-socials" aria-label="Professional and Coding Profiles">
      <a href="https://github.com/Vardhan-1806" target="_blank" rel="noopener" class="pfoot-link" title="GitHub Profile">
        <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        GitHub
      </a>
      <a href="https://linkedin.com/in/alisam-srivardhan-291124332" target="_blank" rel="noopener" class="pfoot-link" title="LinkedIn Profile">
        <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        LinkedIn
      </a>
      <a href="https://leetcode.com/u/Vardhann13/" target="_blank" rel="noopener" class="pfoot-link" title="LeetCode Profile">
        <svg viewBox="0 0 24 24"><path d="M13.48 2.34a1.37 1.37 0 0 0-1.94 0L5.7 8.18a4.42 4.42 0 0 0 0 6.24l4.44 4.44a4.42 4.42 0 0 0 6.24 0l2.02-2.02a1.37 1.37 0 1 0-1.94-1.94l-2.02 2.02a1.68 1.68 0 0 1-2.37 0l-4.44-4.44a1.68 1.68 0 0 1 0-2.37l5.84-5.84a1.37 1.37 0 0 0 0-1.93ZM9.36 14.5a1.37 1.37 0 0 0 0 2.74h8.9a1.37 1.37 0 0 0 0-2.74h-8.9Z"/></svg>
        LeetCode (325+)
      </a>
      <a href="https://www.codechef.com/users/vardhann18" target="_blank" rel="noopener" class="pfoot-link" title="CodeChef Profile">
        <span>👨‍🍳</span>
        CodeChef (1036★)
      </a>
      <a href="mailto:alisamsrivardhan72@gmail.com" class="pfoot-link" title="Send Email">
        <span>✉️</span>
        Email
      </a>
    </div>

    <div class="foot-actions">
      <button onclick="window.replayAsvIntro()" class="foot-replay-btn" title="Replay Cinematic Intro">🎬 Replay Intro</button>
      <a href="#" class="foot-top">&uarr; Top</a>
    </div>
  </div>
</footer>`;

html = html.replace(oldFooterRegex, universalFooter);

fs.writeFileSync(filePath, html, 'utf8');
console.log("Successfully replaced projects.html with 3D Layered Deck and universal footer!");
