const fs = require('fs');
const path = require('path');

const sharedPath = path.join(__dirname, 'shared.js');
let shared = fs.readFileSync(sharedPath, 'utf8');

const codeExamplesData = `
/* ============================================================
   7. 2026 AI AMBIENT CANVAS SYSTEM & STACK CODE INSPECTOR
   ============================================================ */

const REAL_STACK_EXAMPLES = {
  'java': {
    title: 'Java (OOP & DSA)',
    file: 'AlgoMotion/src/engine/TreeTraversalEngine.java',
    repo: 'https://github.com/Vardhan-1806/Tree_Traversal',
    scope: 'Algorithmic Optimization · Iterative Traversal · O(N) Space & Time',
    code: \`// AlgoMotion Execution Engine — Iterative DFS Traversal
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
}\`,
    rationale: 'Engineered with clean Object-Oriented principles, explicit memory control, and optimal iterative stack state management avoiding call-stack overflows on deep binary trees.'
  },
  'c / c++': {
    title: 'C / C++ (Systems & DSA)',
    file: 'Core/GraphAlgorithms/BinarySearchTree.cpp',
    repo: 'https://github.com/Vardhan-1806/Tree_Traversal',
    scope: 'Pointer Semantics · Direct Memory Control · Cache Locality',
    code: \`// Direct pointer manipulation for minimal heap allocation overhead
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
}\`,
    rationale: 'Used for bare-metal algorithmic problem solving on LeetCode and competitive programming, maximizing cache locality and zero-overhead memory operations.'
  },
  'python': {
    title: 'Python (RAG & NLP)',
    file: 'LexAssist/backend/services/rag_service.py',
    repo: 'https://github.com/Vardhan-1806/LexAssist',
    scope: 'Sub-2s Vector Search · Context Chunking · Gemini / OpenAI Orchestration',
    code: \`# LexAssist Sub-2s Legal Retrieval Pipeline
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
    return await vector_collection.aggregate(pipeline).to_list(top_k)\`,
    rationale: 'Powers LexAssist\\'s statutory inquiry pipeline, achieving sub-2-second retrieval times through cosine vector similarity indexing against Indian legal precedent collections.'
  },
  'javascript': {
    title: 'JavaScript (ES6+ & Async)',
    file: 'Socially/frontend/src/utils/eventStream.js',
    repo: 'https://github.com/Vardhan-1806/Socially',
    scope: 'Event Loop · Async/Await · Closure Encapsulation',
    code: \`// High-performance asynchronous event debouncer with AbortController
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
}\`,
    rationale: 'Clean modern ES6+ asynchronous programming handling event loop queues, cancellation tokens, and avoiding memory leaks in complex client-side applications.'
  },
  'react.js': {
    title: 'React.js (Hooks & UI State)',
    file: 'Socially/frontend/src/hooks/useSocialFeed.jsx',
    repo: 'https://github.com/Vardhan-1806/Socially',
    scope: 'Optimistic UI Updates · Custom Hooks · Reconciliation Optimization',
    code: \`// Socially Custom Hook with Zero-Latency Optimistic UI Feedback
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
}\`,
    rationale: 'Eliminates user-perceived network latency by applying instant optimistic state updates with seamless background verification and fault-tolerant rollback mechanisms.'
  },
  'node.js': {
    title: 'Node.js (Backend Runtime)',
    file: 'TravelMate/backend/src/server.js',
    repo: 'https://github.com/Vardhan-1806/TravelMate',
    scope: 'Non-Blocking I/O · Socket.IO WebSocket Engine · Cluster Ready',
    code: \`// Modular Monolith HTTP & WebSocket Unified Server
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
});\`,
    rationale: 'Powers concurrent multi-user group chat and trip tracking with minimal memory overhead and ultra-low WebSocket broadcast latency.'
  },
  'express.js': {
    title: 'Express.js (RESTful APIs)',
    file: 'LexAssist/backend/middleware/authGuard.js',
    repo: 'https://github.com/Vardhan-1806/LexAssist',
    scope: 'Middleware Pipeline · Granular RBAC · Error Handling',
    code: \`// Role-Based Access Control Guard Middleware
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
};\`,
    rationale: 'Enforces strict defense-in-depth security across Citizen, Lawyer, and Administrator tiers in LexAssist.'
  },
  'mongodb': {
    title: 'MongoDB (Aggregations & Atlas)',
    file: 'TravelMate/backend/src/algorithms/debtSettlement.js',
    repo: 'https://github.com/Vardhan-1806/TravelMate',
    scope: 'Multi-Stage Pipelines · Complex Settlement Graph · Indexing',
    code: \`// TravelMate Greedy Debt Settlement Algorithm
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
}\`,
    rationale: 'Solves the minimal transaction settlement problem in O(N log N) time, calculating net pairwise settlements dynamically for multi-participant travel itineraries.'
  },
  'git & github': {
    title: 'Git & GitHub (CI/CD)',
    file: '.github/workflows/deploy.yml',
    repo: 'https://github.com/Vardhan-1806',
    scope: 'Automated CI/CD · Quality Gates · Production Rollouts',
    code: \`name: Production Deployment Pipeline
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
          vercel-args: '--prod'\`,
    rationale: 'Clean automated delivery pipeline ensuring zero-downtime rollouts, lint gates, and continuous deployment across all personal systems.'
  },
  'html5 & css3': {
    title: 'HTML5 & CSS3 (Architecture & a11y)',
    file: 'portfolio/style.css',
    repo: 'https://github.com/Vardhan-1806',
    scope: 'CSS 3D Transforms · WCAG Contrast · CSS Grid & Custom Properties',
    code: \`/* 2026 Perspective Layering & Glassmorphic Surface */
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
}\`,
    rationale: 'GPU-accelerated CSS 3D transforms creating tangible depth and perspective without heavy WebGL engine overhead.'
  },
  'sql': {
    title: 'SQL (Relational Schemas)',
    file: 'Database/Schemas/ecommerce_schema.sql',
    repo: 'https://github.com/Vardhan-1806',
    scope: 'ACID Transactions · Indexes · Foreign Keys · Aggregations',
    code: \`-- Optimized Relational Query with Execution Plan Indexing
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
LIMIT 25;\`,
    rationale: 'Structured relational data modeling with composite B-tree indexes, foreign key referential integrity, and efficient joins.'
  },
  'jwt security': {
    title: 'JWT Security & Auth Architecture',
    file: 'Socially/backend/middleware/tokenService.js',
    repo: 'https://github.com/Vardhan-1806/Socially',
    scope: 'Dual-Token Refresh · HTTP-Only Cookies · CSRF & XSS Mitigation',
    code: \`// Secure Dual-Token Generation Pipeline
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
};\`,
    rationale: 'Mitigates XSS attack vectors by storing long-lived refresh tokens strictly in HTTP-only browser cookies while keeping short-lived access tokens in memory.'
  },
  'rag systems': {
    title: 'RAG Systems (AI Engineering)',
    file: 'LexAssist/backend/rag/embeddings.py',
    repo: 'https://github.com/Vardhan-1806/LexAssist',
    scope: 'Vector Embeddings · Context Augmentation · Grounded LLM Generation',
    code: \`# Grounded Legal Synthesis with Statutory Context Injection
async def synthesize_grounded_answer(user_prompt: str, statutes: List[Dict]) -> str:
    context_str = "\\n\\n".join([
        f"[Statute: {s['title']} Section {s.get('section', '')}]\\n{s['content']}"
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
            {"role": "user", "content": f"Contexts:\\n{context_str}\\n\\nQuery: {user_prompt}"}
        ],
        temperature=0.1
    )
    return response.choices[0].message.content\`,
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
    hud.innerHTML = \`
      <div class="ai-hud-left">
        <span class="ai-hud-pulse"></span>
        <span>SYSTEM KERNEL // ALISAM SRIVARDHAN &middot; B.TECH CSE &middot; CLASS OF 2028</span>
      </div>
      <div class="ai-hud-right">
        <span>⚡ EDGE LATENCY: 14MS</span>
        <span class="ai-hud-badge">2026 AI-AUGMENTED</span>
      </div>
    \`;
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
    modal.innerHTML = \`
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
    \`;
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
`;

// Append to shared.js and wire into DOMContentLoaded
if (!shared.includes('initAiAmbientSystem')) {
  // Find document.addEventListener('DOMContentLoaded', ...
  const domLoadedIdx = shared.lastIndexOf("document.addEventListener('DOMContentLoaded', () => {");
  if (domLoadedIdx !== -1) {
    const beforeDom = shared.substring(0, domLoadedIdx);
    const afterDom = shared.substring(domLoadedIdx);
    
    // Insert function definitions before DOMContentLoaded
    let updated = beforeDom + codeExamplesData + '\n' + afterDom;
    // Insert calls inside DOMContentLoaded
    updated = updated.replace(
      'initFloatingIdCard();',
      'initFloatingIdCard();\n  initAiAmbientSystem();\n  initStackCodeInspector();'
    );
    fs.writeFileSync(sharedPath, updated, 'utf8');
    console.log('Appended 2026 AI Ambient System & Code Inspector to shared.js!');
  } else {
    fs.writeFileSync(sharedPath, shared + '\n' + codeExamplesData, 'utf8');
    console.log('Appended to end of shared.js');
  }
} else {
  console.log('Already in shared.js');
}
