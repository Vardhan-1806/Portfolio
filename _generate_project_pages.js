const fs = require('fs');
const path = require('path');

const projects = [
  {
    id: 'lexassist',
    num: '01',
    badge: 'Generative AI · NLP · Retrieval-Augmented Generation',
    title: 'LexAssist — AI Legal Intelligence & Consultation Platform',
    lead: 'A high-throughput conversational legal intelligence assistant powered by Retrieval-Augmented Generation (RAG). Ingests Indian legal statutes, constitutional precedents, and civil codes to answer complex citizen queries in under 2 seconds while automating attorney consultation workflows.',
    liveUrl: 'https://lexassist-six.vercel.app',
    repoUrl: 'https://github.com/Vardhan-1806/LexAssist',
    status: 'Live & Deployed on Railway / Vercel',
    telemetry: [
      { label: 'Query Latency', val: '< 2.0s' },
      { label: 'DB Schemas', val: '8 Collections' },
      { label: 'Concurrency', val: '50+ Sessions' },
      { label: 'Cloud Hosting', val: 'Railway + Vercel' },
      { label: 'Auth Security', val: 'JWT + RBAC' },
      { label: 'Target Users', val: 'Citizens & Lawyers' }
    ],
    tags: ['NLP / RAG', 'Node.js', 'Express.js', 'MongoDB Atlas', 'JWT Auth', 'Railway', 'REST API', 'Vector Embeddings'],
    problemStatement: 'Access to accurate legal advice in India is historically bottlenecked by prohibitive consultation costs, convoluted legal terminology, and lack of transparency. Citizens face immense friction understanding fundamental civil rights, statutory remedies, and legal procedures before determining whether formal litigation is even warranted.',
    objectives: [
      'Democratize legal awareness by answering vernacular citizen inquiries grounded directly in verified penal codes, civil statutes, and procedural rules.',
      'Achieve sub-2-second contextual retrieval latency using dense vector semantic matching combined with keyword indexing.',
      'Provide a verified attorney consultation pipeline with seamless case filing and calendar scheduling.',
      'Maintain strict role-based access control (RBAC) across three isolated user dashboards: Citizens, Lawyers, and Administrators.'
    ],
    architectureDiagram: `┌────────────────────────────────────────────────────────┐
│               Client Interface (Vercel)                │
│    Citizen Dashboard  │  Lawyer Portal  │  Admin HUD   │
└───────────────────────────┬────────────────────────────┘
                            │ HTTPS / JWT Auth
┌───────────────────────────▼────────────────────────────┐
│              Express.js API Layer (Railway)            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Auth Guard   │  │ RAG Pipeline │  │ Appointments │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────┬─────────────────────────────┬────────────┘
              │                             │
┌─────────────▼─────────────┐ ┌─────────────▼────────────┐
│   MongoDB Atlas Cluster   │ │    Vector Knowledge Base │
│  8 Normalized Collections │ │    Civil Codes & Statutes│
│  Users, Cases, Feedback   │ │    Semantic Embeddings   │
└───────────────────────────┘ └──────────────────────────┘`,
    features: [
      'Context-Aware Statutory QA: Ingests user problem statements and retrieves precise statutory citations, penalty clauses, and landmark Supreme Court / High Court precedents.',
      'Automated Appointment Booking: Multi-step attorney consultation scheduling system with client case history briefing and status tracking.',
      'Three-Role Access Control: Distinct permission scopes ensuring lawyers only access accepted client dossiers and citizens cannot access privileged admin configurations.',
      'Case File Uploads & Telemetry: Structured case attachment storage with automated metadata indexing and query feedback loops.',
      'Stateless Dual-Token Authentication: Secure session management mitigating CSRF and XSS threats using HTTP-only cookies.'
    ],
    contributions: [
      'Architected the entire 8-collection MongoDB database schema, establishing foreign-key references, compound indexes, and validation rules.',
      'Engineered backend REST endpoints in Express.js handling auth, case submissions, booking dispatch, and lawyer verification.',
      'Implemented RAG prompt chaining and citation boundary enforcement to strictly prevent model hallucinations on sensitive legal topics.',
      'Conducted concurrency testing under 50+ simultaneous simulated chat sessions to optimize event-loop throughput on Railway.'
    ],
    challenges: [
      'Challenge: Legal terminology hallucinations when open-domain LLMs attempt to interpret specific jurisdictional Indian legal provisions.\nSolution: Implemented a strict Retrieval-Augmented Generation boundary prompt that mandates verbatim statutory section citation and explicitly declares when a query lies outside the verified knowledge corpus.',
      'Challenge: MongoDB query latency under multi-dashboard relational joins (Citizens, Lawyers, Appointments).\nSolution: Created compound indices on appointment dates and lawyer specialty IDs, cutting query retrieval times from 420ms down to under 38ms.'
    ],
    futureRoadmap: [
      'Multilingual Vernacular Support: Real-time translation into Hindi, Telugu, and Tamil for rural citizen outreach.',
      'Automated Document Drafting: One-click legal notice and consumer complaint PDF generator based on conversational inputs.'
    ]
  },
  {
    id: 'travelmate',
    num: '02',
    badge: 'Social Travel · Real-Time Collaboration · Modular Monolith',
    title: 'TravelMate — AI-Powered Social Travel & Group Trip Platform',
    lead: 'A full-stack collaborative social travel platform that unifies compatibility-based traveler discovery, atomic group formation, real-time WebSocket group chat, and an automated minimal-transaction expense settlement engine.',
    liveUrl: 'https://travelmate-bfqv.onrender.com',
    repoUrl: 'https://github.com/Vardhan-1806/TravelMate',
    status: 'Live Backend API on Render · Frontend Client in Active Development',
    telemetry: [
      { label: 'Architecture', val: 'Modular Monolith' },
      { label: 'Real-Time Engine', val: 'Socket.IO WSS' },
      { label: 'Matching Algorithm', val: 'Min-Heap Top-K' },
      { label: 'Expense Solver', val: 'Greedy O(N log N)' },
      { label: 'Backend API', val: 'Render Cloud' },
      { label: 'AI Partner', val: 'Google Gemini' }
    ],
    tags: ['React + Vite', 'Node.js', 'Express.js', 'Socket.IO', 'MongoDB Atlas', 'Gemini AI', 'Cloudinary', 'Nominatim Maps'],
    problemStatement: 'Coordinating group travel today is scattered across WhatsApp chats, shared spreadsheets, random Instagram DMs, and Splitwise logs. Finding compatible travelers outside immediate friend circles is fraught with lifestyle clashes, budget disagreements, and dropped commitments.',
    objectives: [
      'Unify the entire group travel lifecycle: discovery, compatibility matching, trip workspace, real-time chat, itinerary polls, and expense settlement into a single platform.',
      'Eliminate race-condition seat overbooking through atomic MongoDB transactions.',
      'Implement an algorithmic compatibility matching engine pairing travelers based on budget tiers, pace, and lifestyle preferences.',
      'Provide a mathematically provable minimal-transaction group debt settlement algorithm.'
    ],
    architectureDiagram: `┌────────────────────────────────────────────────────────┐
│                   React + Vite SPA                     │
│    Trip Discovery │ Chat Workspace │ Itinerary & Polls │
└───────────────────────────┬────────────────────────────┘
                            │ HTTPS (REST) + WSS (Socket.IO)
┌───────────────────────────▼────────────────────────────┐
│               Express API Layer (Render)               │
│                   Modular Monolith                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Auth & Users │  │ Matching Eng │  │ Chat Rooms   │  │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤  │
│  │ Trip Ledger  │  │ Itinerary    │  │ Gemini AI    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────┬─────────────┬─────────────┬──────────────┘
              │             │             │
┌─────────────▼──┐   ┌──────▼──────┐   ┌──▼──────────────┐
│  MongoDB Atlas │   │  Cloudinary │   │ Nominatim (Maps)│
│  Persistent DB │   │  CDN Assets │   │ Geocoding API   │
└────────────────┘   └─────────────┘   └─────────────────┘`,
    features: [
      'Compatibility Matching Engine: Rule-based multi-factor weighted scoring utilizing HashSet interest overlaps and a Min-Heap Top-K priority queue.',
      'Atomic Seat Management: Race-condition-safe join request handling ensuring trip capacity limits are strictly respected even under concurrent requests.',
      'Real-Time Trip Chat: Socket.IO WebSocket architecture with server-side trip membership verification and room isolation.',
      'Greedy Expense Settlement: Automated debt balancer computing the provably minimal number of payment transactions to balance group accounts.',
      'Gemini AI Trip Itinerary Assistant: Generates destination highlights, weather preparedness advisories, and estimated packing checklists.'
    ],
    contributions: [
      'Engineered the modular monolith backend in Express.js with clean boundaries across auth, trips, chat, matching, and expense services.',
      'Implemented the weighted matching algorithm and Min-Heap Top-K selection logic.',
      'Configured WebSocket socket room security preventing non-members from eavesdropping or emitting chat packets into private trip rooms.',
      'Deployed live API services on Render connected to MongoDB Atlas and Nominatim geocoding.'
    ],
    challenges: [
      'Challenge: Concurrent traveler join requests causing trip overbooking beyond vehicle/hotel capacity.\nSolution: Implemented atomic MongoDB findOneAndUpdate operations with conditional $lt capacity checks, ensuring linearizable seat assignment.',
      'Challenge: Complex multi-party expense balancing with N participants generating excessive interpersonal transfers.\nSolution: Modeled net balances as debtor/creditor priority queues with a greedy matching algorithm, reducing transaction count from O(N^2) to at most N-1 transactions.'
    ],
    futureRoadmap: [
      'Frontend Production Launch: Complete React Vite client integration with interactive trip canvas.',
      'Offline-First Trip Mode: ServiceWorker caching for offline itinerary viewing in remote mountainous destinations.'
    ]
  },
  {
    id: 'socially',
    num: '03',
    badge: 'Full-Stack MERN · Cloud CDN · Dual-Token Auth',
    title: 'Socially — Full-Stack Scalable Social Networking Platform',
    lead: 'A responsive full-stack social network engineered with React.js, Express.js, and MongoDB Atlas. Features rich media publishing with Cloudinary CDN transformations, nested discussion threads, optimistic feed interactions, and dual-token JWT authentication.',
    liveUrl: 'https://socially-omega-seven.vercel.app',
    repoUrl: 'https://github.com/Vardhan-1806/Socially',
    status: 'Live & Deployed on Vercel + Render',
    telemetry: [
      { label: 'Frontend Stack', val: 'React.js (Vercel)' },
      { label: 'Backend Runtime', val: 'Node / Express (Render)' },
      { label: 'Database', val: 'MongoDB Atlas' },
      { label: 'Media CDN', val: 'Cloudinary Edge' },
      { label: 'Auth Model', val: 'Dual-Token JWT' },
      { label: 'Feed Architecture', val: 'Optimistic UI' }
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Cloudinary', 'Vercel', 'Render', 'JWT Auth'],
    problemStatement: 'Many modern web applications suffer from sluggish user interaction feedback, unoptimized media delivery causing high data bandwidth usage, and vulnerable authentication flows relying on insecure LocalStorage token persistence.',
    objectives: [
      'Deliver an instant, responsive social browsing experience with optimistic UI updates for likes and comments.',
      'Implement an automated media upload pipeline with on-the-fly image optimization and global CDN caching.',
      'Protect user accounts with secure dual-token authentication (Access Token + Refresh Token stored in HTTP-only cookies).',
      'Deploy a resilient multi-cloud architecture with Vercel edge hosting for the frontend and Render for API services.'
    ],
    architectureDiagram: `┌────────────────────────────────────────────────────────┐
│                   React.js SPA (Vercel)                │
│    Public Feed  │  Post Creator  │  Profile Timeline   │
└───────────────────────────┬────────────────────────────┘
                            │ HTTPS / HTTP-Only Cookies
┌───────────────────────────▼────────────────────────────┐
│              Express.js REST API (Render)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ JWT Refresh  │  │ Feed Service │  │ Media Upload │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────┬─────────────────────────────┬────────────┘
              │                             │
┌─────────────▼─────────────┐ ┌─────────────▼────────────┐
│   MongoDB Atlas Cluster   │ │    Cloudinary Image CDN  │
│  Users, Posts, Comments   │ │    Automatic WebP/AVIF   │
└───────────────────────────┘ └──────────────────────────┘`,
    features: [
      'Interactive Public Timelines: Real-time public feeds with client-side optimistic UI updates for instant heart/like feedback.',
      'Cloud Media Processing: Direct integration with Cloudinary providing automatic image compression, WebP conversion, and aspect ratio crop swatches.',
      'Nested Threaded Comments: Structured conversation trees allowing multi-level community discussions with pagination.',
      'Dual-Token Refresh Rotation: Secure access token expiration (15m) coupled with rotating refresh tokens stored in HTTP-only cookies.',
      'Personalized Profile Timelines: User activity aggregation displaying created posts, bookmarked items, and follower relationships.'
    ],
    contributions: [
      'Built modular React components with accessible form validation and responsive mobile drawer navigation.',
      'Implemented backend Express routes, controllers, and Mongoose schemas with indexed feed queries.',
      'Engineered the Cloudinary upload middleware handling file size sanitization, format conversion, and secure cloud storage.',
      'Configured multi-cloud deployment connecting Vercel frontend with containerized Render backend.'
    ],
    challenges: [
      'Challenge: High latency and UI freeze when users upload multi-megabyte mobile camera photos.\nSolution: Implemented asynchronous Cloudinary background transcoding with progressive image placeholder blurs and automatic format adaptation (AVIF/WebP).',
      'Challenge: Race conditions during high-volume simultaneous like/unlike requests.\nSolution: Replaced naive read-modify-write patterns with atomic MongoDB $addToSet and $pull operations to ensure counter integrity.'
    ],
    futureRoadmap: [
      'WebSocket Push Notifications: Real-time alert notifications when another user interacts with your posts.',
      'Direct Messaging: End-to-end encrypted 1-on-1 private messaging.'
    ]
  },
  {
    id: 'algomotion',
    num: '04',
    badge: 'Algorithms · Data Structures · Interactive Visualization',
    title: 'AlgoMotion — Interactive Algorithm & Data Structure Visualizer',
    lead: 'An interactive, zero-dependency algorithmic execution engine built in native vanilla ES6+ JavaScript. Visualizes binary tree and graph traversals (BFS, DFS, Inorder, Preorder, Postorder) step-by-step with real-time call stack tracking, state playback, and node inspection.',
    liveUrl: 'https://github.com/Vardhan-1806/Tree_Traversal',
    repoUrl: 'https://github.com/Vardhan-1806/Tree_Traversal',
    status: 'Public Open-Source System on GitHub',
    telemetry: [
      { label: 'Language', val: 'Vanilla JavaScript (ES6+)' },
      { label: 'Dependencies', val: 'Zero External Libs' },
      { label: 'Algorithms', val: 'BFS, DFS, Tree Orders' },
      { label: 'Visual Engine', val: 'DOM & SVG Transitions' },
      { label: 'Performance', val: '60 FPS Transitions' },
      { label: 'Repository', val: 'Vardhan-1806/Tree_Traversal' }
    ],
    tags: ['JavaScript (ES6+)', 'DOM Manipulation', 'Data Structures', 'Tree Algorithms', 'Binary Trees', 'CSS Transitions'],
    problemStatement: 'Abstract algorithmic concepts like recursion, tree traversals, and call-stack unwinding are notoriously difficult for computer science students to visualize from static whiteboard diagrams or raw terminal printouts.',
    objectives: [
      'Demystify binary tree and graph traversal mechanics through color-coded, step-by-step visual node highlighting.',
      'Demonstrate real-time queue vs. stack mechanics powering Breadth-First Search (BFS) and Depth-First Search (DFS).',
      'Achieve 60 FPS animation smoothness with zero external framework dependencies (pure native ES6+).',
      'Provide interactive playback controls (Play, Pause, Step-Forward, Reset, Speed Adjustment).'
    ],
    architectureDiagram: `┌────────────────────────────────────────────────────────┐
│               Interactive Control Console              │
│    Algorithm Selector │ Playback Speed │ Step Controls │
└───────────────────────────┬────────────────────────────┘
                            │ Event Dispatchers
┌───────────────────────────▼────────────────────────────┐
│          AlgoMotion Execution Engine (Vanilla JS)      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ State Parser │  │ Step Queue   │  │ Call Stack   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└───────────────────────────┬────────────────────────────┘
                            │ DOM Mutation / SVG Lines
┌───────────────────────────▼────────────────────────────┐
│                 Visual Binary Tree Canvas              │
│      Active Node (Glow) │ Visited (Olive) │ Edge Paths │
└────────────────────────────────────────────────────────┘`,
    features: [
      'Multi-Algorithm Traversal Suite: Supports Inorder (L-Root-R), Preorder (Root-L-R), Postorder (L-R-Root), and Level-Order / BFS.',
      'Step-by-Step State Playback: Users can step forwards or backwards one node at a time to inspect variable states and call stack depth.',
      'Call Stack & Output Path Display: Real-time textual accumulator tracking the exact sequence of processed values.',
      'Locking Control State Machine: Prevents conflicting concurrent algorithm executions during active animations.',
      'Zero Bloat: Engineered with 100% native Web APIs for instantaneous zero-latency page loading.'
    ],
    contributions: [
      'Designed the complete tree node coordinate geometry and layout hierarchy in CSS/HTML.',
      'Implemented recursive traversal functions decoupled from UI rendering using async step delay promises.',
      'Created button state management preventing concurrent traversal execution and race conditions.',
      'Optimized CSS transitions ensuring buttery-smooth 60 FPS visual state transitions.'
    ],
    challenges: [
      'Challenge: Synchronizing JavaScript recursive calls with asynchronous visual CSS transition timings without locking the browser UI thread.\nSolution: Decoupled traversal computation into an ordered queue of discrete state snapshots, played back via an async requestAnimationFrame loop with dynamic delay timers.',
      'Challenge: Handling rapid button clicking causing scrambled tree highlighting.\nSolution: Built a strict state lock (lockButtons state machine) that disallows new traversal triggers until the current execution completes or is explicitly reset.'
    ],
    futureRoadmap: [
      'Graph Traversal Expansion: Add Dijkstra Shortest Path and A* algorithm visualizers on interactive grid maps.',
      'Custom Node Tree Input: Allow users to input arbitrary arrays/BST values to dynamically generate and test custom tree structures.'
    ]
  }
];

function generateProjectPageHtml(p) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${p.title} — Alisam Srivardhan</title>
  <link rel="icon" type="image/svg+xml" href="asv-monogram.svg"/>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
<div class="noise"></div>
<div class="scroll-prog" id="scrollProg"></div>

<!-- NAVIGATION -->
<nav id="nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-brand" aria-label="Alisam Srivardhan Home">
      <img src="asv-logo.png" alt="ASV Logo" class="brand-logo" width="48" height="36" />
    </a>

    <div class="nav-links" aria-label="Main navigation">
      <a href="about.html">About</a>
      <a href="projects.html" class="active">Projects</a>
      <a href="coding.html">Coding</a>
      <a href="certifications.html">Achievements</a>
      <a href="resume.html">Resume</a>
      <a href="contact.html">Contact</a>
    </div>

    <a href="mailto:alisamsrivardhan72@gmail.com?subject=Inquiry%20regarding%20${encodeURIComponent(p.title)}" class="nav-cta">
      Email Me
    </a>

    <button class="burger" id="burger" aria-label="Toggle navigation menu" aria-expanded="false">
      <span></span><span></span>
    </button>
  </div>
</nav>

<!-- MOBILE NAVIGATION -->
<div class="mob-nav" id="mobNav" aria-hidden="true">
  <a href="about.html">About</a>
  <a href="projects.html" class="active">Projects</a>
  <a href="coding.html">Coding</a>
  <a href="certifications.html">Achievements</a>
  <a href="resume.html">Resume</a>
  <a href="contact.html">Contact</a>
  <a href="mailto:alisamsrivardhan72@gmail.com?subject=Inquiry%20regarding%20${encodeURIComponent(p.title)}" class="mob-nav-cta">
    Email Me &rarr;
  </a>
</div>

<!-- PROJECT DETAIL HERO -->
<header class="pdetail-hero">
  <div class="wrap">
    <a href="projects.html#${p.id}" class="pdetail-back-link">
      &larr; Back to Projects Deck
    </a>

    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <span style="font-family: var(--mono); font-size: 13px; color: var(--olive); font-weight: 700; letter-spacing: 0.1em;">${p.num} // SPECIFICATION</span>
      <span style="font-family: var(--mono); font-size: 11px; color: var(--ink3); background: var(--bg2); padding: 3px 12px; border-radius: 50px; border: 1px solid var(--border);">${p.badge}</span>
    </div>

    <h1 class="pdetail-h1">${p.title}</h1>
    <p class="pdetail-lead">${p.lead}</p>

    <!-- Project Action Controls -->
    <div class="pdetail-actions-bar">
      ${p.liveUrl !== p.repoUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn-primary" style="gap: 8px;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        View Live Project &nearr;
      </a>` : ''}

      <a href="${p.repoUrl}" target="_blank" rel="noopener" class="btn-outline" style="gap: 8px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        View GitHub Repository &nearr;
      </a>

      <span style="font-family: var(--mono); font-size: 11.5px; color: var(--olive); margin-left: auto; display: flex; align-items: center; gap: 6px;">
        <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--olive); display: inline-block;"></span>
        ${p.status}
      </span>
    </div>
  </div>
</header>

<!-- MAIN CONTENT & TELEMETRY -->
<main class="sec">
  <div class="wrap">
    <div class="pdetail-layout">
      <!-- Deep Technical Narrative -->
      <div class="pdetail-main-content">

        <!-- Visual Screenshot Gallery Frame -->
        <div class="pdetail-section-card" style="padding: 0; overflow: hidden;">
          <div class="deck-preview-chrome" style="position: relative;">
            <div class="deck-chrome-dots">
              <span></span><span></span><span></span>
            </div>
            <span class="deck-chrome-url">${p.liveUrl}</span>
            <span class="deck-chrome-status">Production Verified</span>
          </div>

          <div style="background: linear-gradient(145deg, #1f1c19 0%, #151311 100%); padding: 60px 32px; text-align: center; color: #f2eee4;">
            <div style="font-size: 48px; margin-bottom: 12px;">🖼️</div>
            <div style="font-family: var(--mono); font-size: 13px; color: #d4af37; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">
              Architectural Screenshot &amp; UI Preview Frame
            </div>
            <p style="font-size: 13px; color: rgba(255,255,255,0.6); max-width: 520px; margin: 0 auto; line-height: 1.6;">
              Dedicated capture canvas for ${p.title}. Configured for live interactive screenshots.
            </p>
          </div>
        </div>

        <!-- 1. Problem Statement -->
        <article class="pdetail-section-card">
          <h2>Problem Statement</h2>
          <p>${p.problemStatement}</p>
        </article>

        <!-- 2. Project Objectives -->
        <article class="pdetail-section-card">
          <h2>Project Objectives</h2>
          <ul>
            ${p.objectives.map(o => `<li>${o}</li>`).join('\n            ')}
          </ul>
        </article>

        <!-- 3. System Architecture & Workflow -->
        <article class="pdetail-section-card">
          <h2>System Architecture &amp; Workflow</h2>
          <p>
            The platform is structured with distinct separation of concerns, decoupling state storage, authentication validation, business domain services, and client interface layers:
          </p>
          <pre class="pdetail-diagram-box"><code>${p.architectureDiagram}</code></pre>
        </article>

        <!-- 4. Features & Functionality -->
        <article class="pdetail-section-card">
          <h2>Key Features &amp; Functionality</h2>
          <ul>
            ${p.features.map(f => `<li>${f}</li>`).join('\n            ')}
          </ul>
        </article>

        <!-- 5. Individual Engineering Ownership -->
        <article class="pdetail-section-card">
          <h2>My Engineering Contributions</h2>
          <p>
            As sole developer / lead contributor on this system, my core engineering responsibilities included:
          </p>
          <ul>
            ${p.contributions.map(c => `<li>${c}</li>`).join('\n            ')}
          </ul>
        </article>

        <!-- 6. Challenges Faced & Solutions -->
        <article class="pdetail-section-card">
          <h2>Engineering Challenges &amp; Solutions</h2>
          <ul>
            ${p.challenges.map(ch => `<li>${ch.replace('\n', '<br><span style="color: var(--ink3); font-size: 13.5px;">') + '</span>'}</li>`).join('\n            ')}
          </ul>
        </article>

        <!-- 7. Future Enhancements -->
        <article class="pdetail-section-card">
          <h2>Future Scalability Roadmap</h2>
          <ul>
            ${p.futureRoadmap.map(r => `<li>${r}</li>`).join('\n            ')}
          </ul>
        </article>

      </div>

      <!-- Sticky Telemetry Sidebar -->
      <aside class="pdetail-sidebar">
        <!-- Telemetry Card -->
        <div class="pdetail-stat-card">
          <div style="font-family: var(--mono); font-size: 11px; color: var(--olive); letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; margin-bottom: 12px;">
            System Telemetry
          </div>
          ${p.telemetry.map(t => `
          <div class="pdetail-stat-row">
            <span class="pdetail-stat-label">${t.label}</span>
            <span class="pdetail-stat-val">${t.val}</span>
          </div>`).join('')}
        </div>

        <!-- Technology Stack Card -->
        <div class="pdetail-stat-card">
          <div style="font-family: var(--mono); font-size: 11px; color: var(--olive); letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; margin-bottom: 12px;">
            Technologies Deployed
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('\n            ')}
          </div>
        </div>

        <!-- Direct Actions Card -->
        <div class="pdetail-stat-card" style="background: var(--bg2);">
          <div style="font-family: var(--mono); font-size: 11px; color: var(--ink); font-weight: 700; margin-bottom: 8px;">
            Inquire About This System
          </div>
          <p style="font-size: 12.5px; color: var(--ink2); margin-bottom: 14px; line-height: 1.5;">
            Interested in architecture review, code walkthrough, or collaboration?
          </p>
          <a href="mailto:alisamsrivardhan72@gmail.com?subject=Inquiry%20regarding%20${encodeURIComponent(p.title)}" class="btn-primary" style="width: 100%; justify-content: center; padding: 10px 16px; font-size: 13px;">
            Email About Project &rarr;
          </a>
        </div>
      </aside>
    </div>
  </div>
</main>

<!-- UNIVERSAL PERSISTENT FOOTER -->
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
      <a href="#" class="foot-top">&uarr; Top</a>
    </div>
  </div>
</footer>

<script src="shared.js"></script>
</body>
</html>`;
}

// Write the 4 dedicated project pages
projects.forEach(p => {
  const fileName = 'project-' + p.id + '.html';
  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, generateProjectPageHtml(p), 'utf8');
  console.log('Generated ' + fileName);
});

// Also create a unified project-detail.html router that redirects or renders based on ?id=
const detailRouterHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Redirecting to Project...</title>
  <script>
    const params = new URLSearchParams(window.location.search);
    const id = (params.get('id') || params.get('p') || 'lexassist').toLowerCase();
    const map = {
      'lexassist': 'project-lexassist.html',
      'travelmate': 'project-travelmate.html',
      'socially': 'project-socially.html',
      'algomotion': 'project-algomotion.html',
      'tree_traversal': 'project-algomotion.html',
      'vanskart': 'project-socially.html'
    };
    window.location.replace(map[id] || 'project-lexassist.html');
  </script>
</head>
<body>
  <p>Loading project specification...</p>
</body>
</html>`;
fs.writeFileSync(path.join(__dirname, 'project-detail.html'), detailRouterHtml, 'utf8');
console.log("Generated project-detail.html router");
