const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

const ai2026Styles = `
/* ==========================================================================
   2026 AI-AUGMENTED PORTFOLIO DESIGN SYSTEM & AMBIENT CANVAS (Phase 4 Upgrade)
   ========================================================================== */

:root {
  --ai-glow-olive: rgba(104, 135, 77, 0.14);
  --ai-glow-gold: rgba(212, 175, 55, 0.09);
  --ai-glow-blue: rgba(56, 139, 253, 0.08);
  --ai-grid-dot: rgba(104, 135, 77, 0.16);
}

/* 1. Dynamic Cursor Spotlight across all pages */
body {
  position: relative;
  background-color: #f7f3ec;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(850px circle at var(--cursor-x, 50vw) var(--cursor-y, 30vh), 
              rgba(104, 135, 77, 0.12) 0%, 
              rgba(212, 175, 55, 0.06) 40%, 
              transparent 70%);
  z-index: 1;
  transition: opacity 0.3s ease;
}

/* 2. 2026 AI Blueprint Grid Canvas */
.ai-blueprint-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: 
    radial-gradient(rgba(104, 135, 77, 0.15) 1px, transparent 1px),
    linear-gradient(to right, rgba(104, 135, 77, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(104, 135, 77, 0.04) 1px, transparent 1px);
  background-size: 32px 32px, 96px 96px, 96px 96px;
  opacity: 0.9;
}

/* 3. Floating Ambient Aurora Orbs */
.ai-aurora-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.55;
  animation: auroraFloat 22s infinite alternate ease-in-out;
}
.ai-aurora-orb-1 {
  width: 550px;
  height: 550px;
  background: radial-gradient(circle, rgba(104, 135, 77, 0.25) 0%, transparent 70%);
  top: -80px;
  right: -60px;
}
.ai-aurora-orb-2 {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, transparent 70%);
  bottom: 8%;
  left: -120px;
  animation-duration: 28s;
  animation-delay: -7s;
}
.ai-aurora-orb-3 {
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(104, 135, 77, 0.18) 0%, transparent 70%);
  top: 45%;
  right: 12%;
  animation-duration: 24s;
  animation-delay: -12s;
}

@keyframes auroraFloat {
  0% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(55px, 40px, 0) scale(1.12); }
  100% { transform: translate3d(-35px, 65px, 0) scale(0.95); }
}

/* 4. 2026 AI System HUD Ribbon */
.ai-hud-ribbon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;
  background: rgba(28, 25, 23, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-family: var(--mono);
  font-size: 11px;
  color: #d1c7bc;
  position: relative;
  z-index: 100;
}
.ai-hud-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.ai-hud-pulse {
  display: inline-block;
  width: 7.5px;
  height: 7.5px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 10px #34d399;
  animation: pulseBeacon 2s infinite;
}
@keyframes pulseBeacon {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}
.ai-hud-right {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #94a3b8;
}
.ai-hud-badge {
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.4);
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(245, 158, 11, 0.1);
}

/* 5. Glassmorphic 2026 Cards Enhancement across all pages */
.proof-card, .dcc-card, .deck-panel, .tech-3d-tile .tech-tile-inner, 
.resume-sidebar-card, .resume-3d-inner, .bstat, .pencil-graph-card, .heatmap-card {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.82) !important;
  border: 1.5px solid rgba(104, 135, 77, 0.2) !important;
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.85) !important;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease, border-color 0.35s ease !important;
}

.proof-card:hover, .tech-3d-tile:hover .tech-tile-inner, .bstat:hover {
  border-color: rgba(104, 135, 77, 0.5) !important;
  box-shadow: 0 18px 48px rgba(104, 135, 77, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.95) !important;
}

/* 6. Interactive Stack Code Inspector Modal / Drawer */
.stack-inspector-modal {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(18, 16, 14, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.25s ease;
}

.stack-inspector-dialog {
  background: #14161a;
  border: 1.5px solid rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  width: 100%;
  max-width: 780px;
  box-shadow: 0 24px 72px rgba(0, 0, 0, 0.65);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: popIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes popIn {
  from { transform: scale(0.95) translateY(12px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}

.inspector-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #1c1f26;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.inspector-title-group {
  display: flex;
  align-items: center;
  gap: 14px;
}

.inspector-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
}

.inspector-title {
  font-family: var(--sans);
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.inspector-subtitle {
  font-family: var(--mono);
  font-size: 11.5px;
  color: #94a3b8;
  margin-top: 2px;
}

.inspector-close-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.inspector-close-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

.inspector-body {
  padding: 22px 24px;
  max-height: 70vh;
  overflow-y: auto;
}

.inspector-meta-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  font-family: var(--mono);
  font-size: 11.5px;
}

.inspector-file-tag {
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid rgba(96, 165, 250, 0.25);
}

.inspector-repo-link {
  color: #d4af37;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.inspector-code-block {
  background: #0b0c0e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 18px 20px;
  font-family: 'DM Mono', Consolas, Monaco, monospace;
  font-size: 12.5px;
  line-height: 1.6;
  color: #e2e8f0;
  overflow-x: auto;
  white-space: pre;
  margin: 0 0 18px 0;
}

.inspector-rationale {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 13.5px;
  line-height: 1.6;
  color: #cbd5e1;
}

.inspector-rationale strong {
  color: #ffffff;
}

/* Tile Inspect Button Trigger */
.tech-inspect-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--olive);
  background: rgba(104, 135, 77, 0.1);
  border: 1px solid rgba(104, 135, 77, 0.25);
  padding: 3px 8px;
  border-radius: 50px;
  margin-top: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tech-3d-tile:hover .tech-inspect-badge {
  background: var(--olive);
  color: #ffffff;
  border-color: var(--olive);
  transform: translateY(-1px);
}
`;

if (!css.includes('2026 AI-AUGMENTED PORTFOLIO DESIGN SYSTEM')) {
  css += '\n' + ai2026Styles;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Appended 2026 AI-Augmented Design System & Stack Inspector styles to style.css!');
} else {
  console.log('2026 styles already present in style.css');
}
