/* ============================================================
   ASV PORTFOLIO — SHARED SYSTEM SCRIPT
   Brand: Alisam Srivardhan
   Palette: Warm Ivory · Subtle Beige · Graphite Pencil · Muted Olive
   ============================================================ */
'use strict';

// DOM Utilities
const qs = (sel, parent = document) => parent.querySelector(sel);
const qsa = (sel, parent = document) => [...parent.querySelectorAll(sel)];
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/* ============================================================
   1. SCROLL PROGRESS
   ============================================================ */
function initScrollProgress() {
  const bar = qs('#scrollProg');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = clamp(progress, 0, 100) + '%';
  }, { passive: true });
}

/* ============================================================
   2. NAVIGATION — SCROLL STATE & ACTIVE LINK
   ============================================================ */
function initNav() {
  const nav = qs('#nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Set active link based on current page path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  qsa('.nav-links a, .mob-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ============================================================
   3. MOBILE NAVIGATION DRAWER
   ============================================================ */
function initMobileMenu() {
  const burger = qs('#burger');
  const mobNav = qs('#mobNav');
  if (!burger || !mobNav) return;

  let isOpen = false;

  function toggleMenu(force) {
    isOpen = typeof force === 'boolean' ? force : !isOpen;
    mobNav.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';

    const spans = qsa('span', burger);
    if (spans.length >= 2) {
      spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
      spans[1].style.transform = isOpen ? 'translateY(0) rotate(-45deg)' : '';
    }
  }

  burger.addEventListener('click', () => toggleMenu());

  // Close when clicking any link
  qsa('a', mobNav).forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) toggleMenu(false);
  });
}

/* ============================================================
   4. SCROLL REVEAL (INTERSECTION OBSERVER)
   ============================================================ */
window.initReveal = function () {
  const elements = qsa('.rv:not(.in)');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
};

/* ============================================================
   5. ANIMATED NUMBER COUNTERS
   ============================================================ */
function initCounters(selector = '[data-count]') {
  const counters = qsa(selector);
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const targetVal = parseFloat(el.dataset.count.replace(/,/g, ''));
        const isFloat = el.dataset.float !== undefined;
        const duration = 1200;
        const startTime = performance.now();

        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          // Ease-out cubic curve
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = easeProgress * targetVal;

          if (isFloat) {
            el.textContent = current.toFixed(2);
          } else if (targetVal >= 1000) {
            el.textContent = Math.round(current).toLocaleString();
          } else {
            el.textContent = Math.round(current);
          }

          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((c) => observer.observe(c));
}

/* ============================================================
   6. COPY EMAIL HELPER WITH VISUAL FEEDBACK
   ============================================================ */
function initCopyButtons() {
  qsa('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.dataset.copy || 'alisamsrivardhan72@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✓</span> Copied to clipboard!';
        btn.classList.add('copied');

        // Show toast if available
        const toast = qs('#toast');
        if (toast) {
          toast.textContent = '✓ Copied: ' + email;
          toast.style.opacity = '1';
          toast.style.transform = 'translateX(-50%) translateY(0)';
          setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(70px)';
          }, 2400);
        }

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('copied');
        }, 2200);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  });
}

/* ============================================================
   7. REPLAY INTRO HELPER
   ============================================================ */
window.replayAsvIntro = function () {
  const ALL_INTRO_KEYS = [
    'asv_cinematic_car_intro_v1',
    'asv_cinematic_story_intro_v9',
    'asv_cinematic_story_intro_v8',
    'asv_cinematic_story_intro_v7',
    'asv_cinematic_story_intro_v6',
    'asv_cinematic_story_intro_v5',
    'asv_cinematic_story_intro_v4',
    'asv_cinematic_story_intro_v3',
    'asv_spider_intro_seen_v1',
    'asv_intro_completed'
  ];
  ALL_INTRO_KEYS.forEach((k) => {
    try {
      sessionStorage.removeItem(k);
      localStorage.removeItem(k);
    } catch (_) {}
  });
  sessionStorage.setItem('asv_force_replay', '1');

  const isHomePage =
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname.endsWith('/') ||
    window.location.pathname === '';
  if (isHomePage && typeof window._triggerAsvIntro === 'function') {
    window._triggerAsvIntro(true);
  } else {
    window.location.href = 'index.html?replay=1';
  }
};
window.replayIntro = window.replayAsvIntro;

/* ============================================================
   8. FOOTER COPYRIGHT YEAR
   ============================================================ */

/* ============================================================
   9. INTERACTIVE FLOATING 3D PERSONAL ID CARD (Phase 7)
   ============================================================ */
function initFloatingIdCard() {
  if (document.getElementById('asvFloatingId')) return;

  const cardHtml = `
    <div id="asvFloatingId" class="asv-floating-id" role="button" tabindex="0" aria-label="Alisam Srivardhan Identity Card — Double click to expand" title="Double click to expand ID card">
      <div class="asv-id-inner" id="asvIdInner">
        <div class="asv-id-glare" id="asvIdGlare"></div>
        <div class="asv-id-hologram"></div>
        
        <div class="asv-id-header">
          <img src="asv-logo.png" alt="ASV Logo" class="asv-id-logo" width="22" height="18" />
          <span class="asv-id-badge-code">ASV-ID // 2026</span>
        </div>

        <div class="asv-id-body">
          <div class="asv-id-photo-frame">
            <img src="photo.jpg" alt="Alisam Srivardhan" class="asv-id-photo" />
          </div>
          <div class="asv-id-info">
            <div class="asv-id-name">Alisam Srivardhan</div>
            <div class="asv-id-role">Software Developer</div>
            <div class="asv-id-meta">BVRIT · 8.88 CGPA</div>
          </div>
        </div>

        <div class="asv-id-footer">
          <img src="signature-vardhan-gold.jpg" alt="Vardhan Signature" class="asv-id-sig" />
          <span class="asv-id-hint">2× Click</span>
        </div>
      </div>
    </div>

    <!-- Expanded Modal View -->
    <div id="asvIdModal" class="asv-id-modal" aria-hidden="true" role="dialog" aria-modal="true">
      <div class="asv-id-modal-backdrop" id="asvModalBackdrop"></div>
      <div class="asv-id-modal-card">
        <button class="asv-id-modal-close" id="asvIdModalClose" aria-label="Close Identity Card">&times;</button>
        
        <div class="asv-modal-header">
          <div class="asv-modal-brand">
            <img src="asv-logo.png" alt="ASV Logo" width="34" height="26" />
            <div>
              <div class="asv-modal-org">ENGINEERING IDENTITY</div>
              <div class="asv-modal-dept">Full-Stack &amp; Competitive Programming</div>
            </div>
          </div>
          <div class="asv-modal-serial">ID #ASV-2026-BVRIT</div>
        </div>

        <div class="asv-modal-content">
          <div class="asv-modal-photo-wrap">
            <img src="photo.jpg" alt="Alisam Srivardhan Portrait" class="asv-modal-photo" />
            <div class="asv-modal-verified-seal">✓ VERIFIED PROFILE</div>
          </div>

          <div class="asv-modal-details">
            <h3 class="asv-modal-name">Alisam Srivardhan</h3>
            <p class="asv-modal-title">Computer Science &amp; Engineering Undergraduate</p>
            <p class="asv-modal-institution">BVRIT Narsapur · Class of 2028 · <strong>8.88 CGPA</strong></p>

            <div class="asv-modal-metrics">
              <div class="asv-metric-pill">
                <span class="label">LeetCode</span>
                <span class="val">325+ Solved · 1,482 Rating</span>
              </div>
              <div class="asv-metric-pill">
                <span class="label">Honors</span>
                <span class="val">100 Days Badge 2026 · 50 Days</span>
              </div>
              <div class="asv-metric-pill">
                <span class="label">CodeChef</span>
                <span class="val">1,119★ (Div 4) · 5 Contests</span>
              </div>
              <div class="asv-metric-pill">
                <span class="label">GitHub</span>
                <span class="val">Vardhan-1806 · 7 Repositories</span>
              </div>
            </div>

            <div class="asv-modal-sig-row">
              <div>
                <div class="asv-sig-label">AUTHORIZED SIGNATURE</div>
                <img src="signature-vardhan-gold.jpg" alt="Alisam Vardhan Signature" class="asv-modal-sig-img" />
              </div>
              <div class="asv-modal-actions">
                <a href="resume.html" class="asv-modal-btn">Resume &rarr;</a>
                <a href="contact.html" class="asv-modal-btn outline">Contact &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', cardHtml);

  const card = document.getElementById('asvFloatingId');
  const inner = document.getElementById('asvIdInner');
  const glare = document.getElementById('asvIdGlare');
  const modal = document.getElementById('asvIdModal');
  const closeBtn = document.getElementById('asvIdModalClose');
  const backdrop = document.getElementById('asvModalBackdrop');

  if (!card || !inner || !modal) return;

  // Reveal controller: intro completion or page load
  const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
  const introSeen = sessionStorage.getItem('asv_intro_completed') || sessionStorage.getItem('asv_cinematic_car_intro_v1');

  function revealCard() {
    setTimeout(() => {
      card.classList.add('visible');
    }, isHomePage && !introSeen ? 500 : 350);
  }

  if (isHomePage && !introSeen) {
    window.addEventListener('asvIntroComplete', () => {
      revealCard();
    }, { once: true });
    // Safety fallback if intro completes or is skipped
    setTimeout(() => {
      if (!card.classList.contains('visible')) revealCard();
    }, 7000);
  } else {
    revealCard();
  }

  // Interactive 3D tilt on hover
  let isHovered = false;
  card.addEventListener('mouseenter', () => { isHovered = true; });
  card.addEventListener('mousemove', (e) => {
    if (!isHovered) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = ((y - 0.5) * -16).toFixed(2);
    const rotY = ((x - 0.5) * 16).toFixed(2);
    inner.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04, 1.04, 1.04)`;
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,255,255,0.22) 0%, transparent 65%)`;
    }
  });
  card.addEventListener('mouseleave', () => {
    isHovered = false;
    inner.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });

  window.addEventListener('scroll', () => {
    card.classList.toggle('scrolled', window.scrollY > 90);
  }, { passive: true });

  // Modal open / close interactions
  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  card.addEventListener('dblclick', (e) => {
    e.preventDefault();
    openModal();
  });

  // Accessibility: Enter or Space opens modal
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

function initYear() {
  qsa('.current-year, #yr').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

// Auto Initialize

/* ============================================================
   7. 2026 AI AMBIENT CANVAS SYSTEM & STACK CODE INSPECTOR
   ============================================================ */

const REAL_STACK_EXAMPLES = {
  'java': {
    title: 'Java (OOP & DSA)',
    file: 'AlgoMotion/src/engine/TreeTraversalEngine.java',
    repo: 'https://github.com/Vardhan-1806/Tree_Traversal',
    scope: 'Algorithmic Optimization · Iterative Traversal · O(N) Space & Time',
    code: `// AlgoMotion Execution Engine — Iterative DFS Traversal
public class TreeTraversalEngine {
    public List<Integer> inorderIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode current = root;
        
        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            result.add(current.val);
            current = current.right;
        }
        return result;
    }
}`,
    rationale: 'Engineered with clean Object-Oriented principles, explicit memory control, and optimal iterative stack state management avoiding call-stack overflows on deep binary trees.'
  },
  'c / c++': {
    title: 'C / C++ (Systems & DSA)',
    file: 'Core/GraphAlgorithms/BinarySearchTree.cpp',
    repo: 'https://github.com/Vardhan-1806/Tree_Traversal',
    scope: 'Pointer Semantics · Direct Memory Control · Cache Locality',
    code: `// Direct pointer manipulation for minimal heap allocation overhead
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* insert(TreeNode* root, int key) {
    if (!root) return new TreeNode(key);
    if (key < root->val) root->left = insert(root->left, key);
    else if (key > root->val) root->right = insert(root->right, key);
    return root;
}`,
    rationale: 'Used for bare-metal algorithmic problem solving on LeetCode and competitive programming, maximizing cache locality and zero-overhead memory operations.'
  },
  'python': {
    title: 'Python (RAG & NLP)',
    file: 'LexAssist/backend/services/rag_service.py',
    repo: 'https://github.com/Vardhan-1806/LexAssist',
    scope: 'Sub-2s Vector Search · Context Chunking · Gemini / OpenAI Orchestration',
    code: `# LexAssist Sub-2s Legal Retrieval Pipeline
async def retrieve_statutory_precedents(query: str, top_k: int = 5) -> List[Dict]:
    # 1. Generate text embeddings via vector model
    query_vector = await embedding_client.create_embedding(
        model="text-embedding-3-small", input=query
    )
    # 2. Atlas Vector Search with metadata projection
    pipeline = [
        {"$vectorSearch": {
            "queryVector": query_vector,
            "path": "embedding",
            "numCandidates": 50,
            "limit": top_k,
            "index": "legal_statutes_idx"
        }},
        {"$project": {
            "statute_id": 1, "title": 1, "section": 1,
            "score": {"$meta": "vectorSearchScore"}
        }}
    ]
    return await vector_collection.aggregate(pipeline).to_list(top_k)`,
    rationale: 'Powers LexAssist\'s statutory inquiry pipeline, achieving sub-2-second retrieval times through cosine vector similarity indexing against Indian legal precedent collections.'
  },
  'javascript': {
    title: 'JavaScript (ES6+ & Async)',
    file: 'Socially/frontend/src/utils/eventStream.js',
    repo: 'https://github.com/Vardhan-1806/Socially',
    scope: 'Event Loop · Async/Await · Closure Encapsulation',
    code: `// High-performance asynchronous event debouncer with AbortController
export function createDebouncedStream(fn, delay = 300) {
  let timerId = null;
  let abortController = null;

  return function debounced(...args) {
    if (timerId) clearTimeout(timerId);
    if (abortController) abortController.abort();
    
    abortController = new AbortController();
    return new Promise((resolve, reject) => {
      timerId = setTimeout(async () => {
        try {
          const res = await fn(...args, { signal: abortController.signal });
          resolve(res);
        } catch (err) {
          if (err.name !== 'AbortError') reject(err);
        }
      }, delay);
    });
  };
}`,
    rationale: 'Clean modern ES6+ asynchronous programming handling event loop queues, cancellation tokens, and avoiding memory leaks in complex client-side applications.'
  },
  'react.js': {
    title: 'React.js (Hooks & UI State)',
    file: 'Socially/frontend/src/hooks/useSocialFeed.jsx',
    repo: 'https://github.com/Vardhan-1806/Socially',
    scope: 'Optimistic UI Updates · Custom Hooks · Reconciliation Optimization',
    code: `// Socially Custom Hook with Zero-Latency Optimistic UI Feedback
export function useSocialFeed() {
  const [posts, setPosts] = useState([]);
  
  const handleOptimisticLike = useCallback(async (postId) => {
    // 1. Instant optimistic state update
    setPosts(prev => prev.map(p => 
      p._id === postId ? { 
        ...p, 
        isLiked: !p.isLiked, 
        likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1 
      } : p
    ));
    
    // 2. Background server sync with auto-rollback on network fault
    try {
      await api.post(\`/posts/\${postId}/like\`);
    } catch (err) {
      // Rollback on rejection
      setPosts(prev => prev.map(p => 
        p._id === postId ? { ...p, isLiked: !p.isLiked, likesCount: p.isLiked ? p.likesCount + 1 : p.likesCount - 1 } : p
      ));
    }
  }, []);

  return { posts, handleOptimisticLike };
}`,
    rationale: 'Eliminates user-perceived network latency by applying instant optimistic state updates with seamless background verification and fault-tolerant rollback mechanisms.'
  },
  'node.js': {
    title: 'Node.js (Backend Runtime)',
    file: 'TravelMate/backend/src/server.js',
    repo: 'https://github.com/Vardhan-1806/TravelMate',
    scope: 'Non-Blocking I/O · Socket.IO WebSocket Engine · Cluster Ready',
    code: `// Modular Monolith HTTP & WebSocket Unified Server
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN, credentials: true },
  pingTimeout: 20000,
  pingInterval: 25000
});

// Event-driven real-time travel coordination rooms
io.on('connection', (socket) => {
  socket.on('join_trip', (tripId) => socket.join(\`trip_\${tripId}\`));
  socket.on('send_message', (data) => {
    io.to(\`trip_\${data.tripId}\`).emit('receive_message', data);
  });
});`,
    rationale: 'Powers concurrent multi-user group chat and trip tracking with minimal memory overhead and ultra-low WebSocket broadcast latency.'
  },
  'express.js': {
    title: 'Express.js (RESTful APIs)',
    file: 'LexAssist/backend/middleware/authGuard.js',
    repo: 'https://github.com/Vardhan-1806/LexAssist',
    scope: 'Middleware Pipeline · Granular RBAC · Error Handling',
    code: `// Role-Based Access Control Guard Middleware
const jwt = require('jsonwebtoken');

const authorize = (...allowedRoles) => (req, res, next) => {
  const token = req.cookies.jwt_auth || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Session required' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!allowedRoles.includes(payload.role)) {
      return res.status(403).json({ error: 'Access denied for tier: ' + payload.role });
    }
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Expired or malformed token' });
  }
};`,
    rationale: 'Enforces strict defense-in-depth security across Citizen, Lawyer, and Administrator tiers in LexAssist.'
  },
  'mongodb': {
    title: 'MongoDB (Aggregations & Atlas)',
    file: 'TravelMate/backend/src/algorithms/debtSettlement.js',
    repo: 'https://github.com/Vardhan-1806/TravelMate',
    scope: 'Multi-Stage Pipelines · Complex Settlement Graph · Indexing',
    code: `// TravelMate Greedy Debt Settlement Algorithm
// Minimizes transaction count across N group travelers from balance netting
function settleDebts(balances) {
  const debtors = [], creditors = [];
  for (const [id, net] of Object.entries(balances)) {
    if (net < -0.01) debtors.push({ id, amt: -net });
    else if (net > 0.01) creditors.push({ id, amt: net });
  }
  debtors.sort((a, b) => b.amt - a.amt);
  creditors.sort((a, b) => b.amt - a.amt);

  const txs = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const settle = Math.min(debtors[i].amt, creditors[j].amt);
    txs.push({ from: debtors[i].id, to: creditors[j].id, amount: settle });
    debtors[i].amt -= settle;
    creditors[j].amt -= settle;
    if (debtors[i].amt < 0.01) i++;
    if (creditors[j].amt < 0.01) j++;
  }
  return txs;
}`,
    rationale: 'Solves the minimal transaction settlement problem in O(N log N) time, calculating net pairwise settlements dynamically for multi-participant travel itineraries.'
  },
  'git & github': {
    title: 'Git & GitHub (CI/CD)',
    file: '.github/workflows/deploy.yml',
    repo: 'https://github.com/Vardhan-1806',
    scope: 'Automated CI/CD · Quality Gates · Production Rollouts',
    code: `name: Production Deployment Pipeline
on:
  push:
    branches: [ master ]
jobs:
  validate-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Syntax & Lint Verification
        run: npm run test:ci
      - name: Deploy to Production CDN
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'`,
    rationale: 'Clean automated delivery pipeline ensuring zero-downtime rollouts, lint gates, and continuous deployment across all personal systems.'
  },
  'html5 & css3': {
    title: 'HTML5 & CSS3 (Architecture & a11y)',
    file: 'portfolio/style.css',
    repo: 'https://github.com/Vardhan-1806',
    scope: 'CSS 3D Transforms · WCAG Contrast · CSS Grid & Custom Properties',
    code: `/* 2026 Perspective Layering & Glassmorphic Surface */
.deck-panel.is-active {
  transform: translate3d(0, 0, 0) scale(1);
  opacity: 1;
  z-index: 10;
  box-shadow: 0 24px 64px rgba(0,0,0,0.14), 0 0 0 1px var(--olive);
}
.deck-panel.is-prev {
  transform: translate3d(-38px, 14px, -80px) rotateY(4deg) scale(0.94);
  opacity: 0.72;
  z-index: 5;
}
.deck-panel.is-next {
  transform: translate3d(38px, 14px, -80px) rotateY(-4deg) scale(0.94);
  opacity: 0.72;
  z-index: 5;
}`,
    rationale: 'GPU-accelerated CSS 3D transforms creating tangible depth and perspective without heavy WebGL engine overhead.'
  },
  'sql': {
    title: 'SQL (Relational Schemas)',
    file: 'Database/Schemas/ecommerce_schema.sql',
    repo: 'https://github.com/Vardhan-1806',
    scope: 'ACID Transactions · Indexes · Foreign Keys · Aggregations',
    code: `-- Optimized Relational Query with Execution Plan Indexing
SELECT 
  u.id AS user_id, 
  u.username, 
  COUNT(DISTINCT o.id) AS total_orders,
  COALESCE(SUM(o.total_amount), 0) AS lifetime_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'COMPLETED'
WHERE u.created_at >= NOW() - INTERVAL '1 YEAR'
GROUP BY u.id, u.username
HAVING COUNT(DISTINCT o.id) >= 3
ORDER BY lifetime_value DESC
LIMIT 25;`,
    rationale: 'Structured relational data modeling with composite B-tree indexes, foreign key referential integrity, and efficient joins.'
  },
  'jwt security': {
    title: 'JWT Security & Auth Architecture',
    file: 'Socially/backend/middleware/tokenService.js',
    repo: 'https://github.com/Vardhan-1806/Socially',
    scope: 'Dual-Token Refresh · HTTP-Only Cookies · CSRF & XSS Mitigation',
    code: `// Secure Dual-Token Generation Pipeline
const generateTokens = (res, user) => {
  const accessToken = jwt.sign(
    { sub: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { sub: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  // Set refresh token in HTTP-only, SameSite=Strict cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return accessToken;
};`,
    rationale: 'Mitigates XSS attack vectors by storing long-lived refresh tokens strictly in HTTP-only browser cookies while keeping short-lived access tokens in memory.'
  },
  'rag systems': {
    title: 'RAG Systems (AI Engineering)',
    file: 'LexAssist/backend/rag/embeddings.py',
    repo: 'https://github.com/Vardhan-1806/LexAssist',
    scope: 'Vector Embeddings · Context Augmentation · Grounded LLM Generation',
    code: `# Grounded Legal Synthesis with Statutory Context Injection
async def synthesize_grounded_answer(user_prompt: str, statutes: List[Dict]) -> str:
    context_str = "\n\n".join([
        f"[Statute: {s['title']} Section {s.get('section', '')}]\n{s['content']}"
        for s in statutes
    ])
    system_prompt = (
        "You are an AI statutory legal assistant. Base answers STRICTLY on the "
        "provided statutory contexts. Always cite statutory section numbers."
    )
    response = await llm_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Contexts:\n{context_str}\n\nQuery: {user_prompt}"}
        ],
        temperature=0.1
    )
    return response.choices[0].message.content`,
    rationale: 'Ensures legal reasoning is 100% grounded against statutory facts, eliminating generative hallucinations while maintaining sub-2-second total latency.'
  }
};

function initAiAmbientSystem() {
  // 1. Dynamic Cursor Spotlight
  let ticking = false;
  window.addEventListener('mousemove', (e) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
        document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // 2. Inject 2026 Blueprint Matrix & Ambient Aurora Orbs
  if (!document.querySelector('.ai-blueprint-bg')) {
    const bg = document.createElement('div');
    bg.className = 'ai-blueprint-bg';
    document.body.prepend(bg);

    const orb1 = document.createElement('div');
    orb1.className = 'ai-aurora-orb ai-aurora-orb-1';
    const orb2 = document.createElement('div');
    orb2.className = 'ai-aurora-orb ai-aurora-orb-2';
    const orb3 = document.createElement('div');
    orb3.className = 'ai-aurora-orb ai-aurora-orb-3';
    document.body.prepend(orb3);
    document.body.prepend(orb2);
    document.body.prepend(orb1);
  }

  // 3. Inject Top 2026 AI HUD Ribbon if not present
  if (!document.querySelector('.ai-hud-ribbon')) {
    const hud = document.createElement('div');
    hud.className = 'ai-hud-ribbon';
    hud.innerHTML = `
      <div class="ai-hud-left">
        <span class="ai-hud-pulse"></span>
        <span>SYSTEM KERNEL // ALISAM SRIVARDHAN &middot; B.TECH CSE &middot; CLASS OF 2028</span>
      </div>
      <div class="ai-hud-right">
        <span>⚡ EDGE LATENCY: 14MS</span>
        <span class="ai-hud-badge">2026 AI-AUGMENTED</span>
      </div>
    `;
    const nav = document.getElementById('nav');
    if (nav) nav.before(hud);
    else document.body.prepend(hud);
  }
}

function initStackCodeInspector() {
  // 1. Create Inspector Modal if missing
  let modal = document.getElementById('stackInspectorModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'stackInspectorModal';
    modal.className = 'stack-inspector-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="stack-inspector-dialog" role="dialog" aria-modal="true">
        <div class="inspector-header">
          <div class="inspector-title-group">
            <div class="inspector-icon" id="inspIcon">⚡</div>
            <div>
              <h3 class="inspector-title" id="inspTitle">Technology Implementation</h3>
              <div class="inspector-subtitle" id="inspSubtitle">Production Code Example</div>
            </div>
          </div>
          <button type="button" class="inspector-close-btn" id="inspCloseBtn" aria-label="Close Inspector">&times;</button>
        </div>
        <div class="inspector-body">
          <div class="inspector-meta-bar">
            <span class="inspector-file-tag" id="inspFile">filename.ext</span>
            <a href="#" target="_blank" rel="noopener" class="inspector-repo-link" id="inspRepo">
              View Repository &nearr;
            </a>
          </div>
          <pre class="inspector-code-block" id="inspCode"></pre>
          <div class="inspector-rationale" id="inspRationale"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('inspCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeInspector);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeInspector();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') closeInspector();
    });
  }

  function closeInspector() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  window.openStackInspector = function(techKey) {
    const key = (techKey || '').toLowerCase().trim();
    const data = REAL_STACK_EXAMPLES[key] || REAL_STACK_EXAMPLES['java'];

    document.getElementById('inspTitle').textContent = data.title;
    document.getElementById('inspSubtitle').textContent = data.scope;
    document.getElementById('inspFile').textContent = data.file;
    document.getElementById('inspCode').textContent = data.code;
    document.getElementById('inspRepo').setAttribute('href', data.repo);
    document.getElementById('inspRationale').innerHTML = '<strong>Architectural Rationale:</strong> ' + data.rationale;

    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  // Wire all tech tiles to open code inspector on click or badge click
  document.querySelectorAll('.tech-3d-tile').forEach(tile => {
    const nameEl = tile.querySelector('.tech-tile-name');
    if (!nameEl) return;
    const name = nameEl.textContent.trim().toLowerCase();

    // Add inspect badge if not already added
    if (!tile.querySelector('.tech-inspect-badge')) {
      const badge = document.createElement('div');
      badge.className = 'tech-inspect-badge';
      badge.innerHTML = '<span>&lt;/&gt;</span> Inspect Code';
      tile.querySelector('.tech-tile-info')?.appendChild(badge);
    }

    tile.addEventListener('click', () => {
      window.openStackInspector(name);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNav();
  initMobileMenu();
  window.initReveal();
  initCounters();
  initCopyButtons();
  initYear();
  initFloatingIdCard();
  initStackCodeInspector();
});

/* Normal Native Cursor (Precision Cursor disabled per user request) */
function initPrecisionCursor() {
  // Disabled: standard native browser cursor is restored
}
