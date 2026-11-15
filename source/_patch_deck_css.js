const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'style.css');

const deckCss = `
/* ===========================================================
   3D LAYERED PROJECT DECK SHOWCASE (Phase 1)
   =========================================================== */
.deck-showcase-section {
  position: relative;
  overflow: hidden;
  padding: 60px 0 100px;
}
.deck-stage {
  position: relative;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  perspective: 1400px;
  perspective-origin: 50% 38%;
  min-height: 640px;
  user-select: none;
}
.deck-stack {
  position: relative;
  width: 100%;
  height: 580px;
  transform-style: preserve-3d;
}
.deck-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--card);
  border: 1.5px solid var(--border);
  border-radius: 20px;
  box-shadow: 0 16px 48px rgba(30, 25, 21, 0.12), 0 4px 12px rgba(30, 25, 21, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  transform-style: preserve-3d;
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.6s ease,
              box-shadow 0.6s ease,
              border-color 0.4s ease;
  will-change: transform, opacity;
  cursor: pointer;
}

/* Deck Depth States */
.deck-panel.is-active {
  z-index: 30;
  opacity: 1;
  pointer-events: auto;
  transform: translate3d(0, 0, 0) scale(1) rotateX(0deg) rotateY(0deg);
  border-color: rgba(70, 92, 51, 0.35);
  box-shadow: 0 28px 70px rgba(30, 25, 21, 0.18), 0 8px 24px rgba(70, 92, 51, 0.12);
}
.deck-panel.is-prev {
  z-index: 10;
  opacity: 0.55;
  pointer-events: auto;
  transform: translate3d(-38px, 32px, -90px) scale(0.92) rotate(-2.5deg);
}
.deck-panel.is-prev:hover {
  opacity: 0.78;
  transform: translate3d(-24px, 20px, -60px) scale(0.94) rotate(-1.5deg);
}
.deck-panel.is-next {
  z-index: 20;
  opacity: 0.72;
  pointer-events: auto;
  transform: translate3d(48px, -18px, -70px) scale(0.94) rotate(2deg);
}
.deck-panel.is-next:hover {
  opacity: 0.9;
  transform: translate3d(32px, -10px, -40px) scale(0.96) rotate(1deg);
}
.deck-panel.is-hidden {
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  transform: translate3d(0, 60px, -180px) scale(0.85);
}

/* Card Top: Dedicated Preview Screenshot Frame */
.deck-preview-frame {
  position: relative;
  width: 100%;
  height: 270px;
  background: linear-gradient(135deg, #1d1a17 0%, #151311 60%, #1a1714 100%);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  flex-shrink: 0;
}
.deck-preview-chrome {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 32px;
  background: rgba(30, 27, 24, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 5;
}
.deck-chrome-dots {
  display: flex;
  gap: 6px;
}
.deck-chrome-dots span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.deck-chrome-dots span:nth-child(1) { background: #e06c56; }
.deck-chrome-dots span:nth-child(2) { background: #e6b44c; }
.deck-chrome-dots span:nth-child(3) { background: #68874d; }
.deck-chrome-url {
  font-family: var(--mono);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.04em;
  background: rgba(0, 0, 0, 0.35);
  padding: 2px 14px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.deck-chrome-status {
  font-family: var(--mono);
  font-size: 10px;
  color: #68874d;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}
.deck-chrome-status::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #68874d;
  box-shadow: 0 0 6px #68874d;
}

.deck-preview-content {
  position: absolute;
  inset: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 24px;
  color: #f2eee4;
  text-align: center;
  background-image:
    radial-gradient(circle at 50% 40%, rgba(212, 175, 55, 0.06) 0%, transparent 60%),
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 100% 100%, 32px 32px, 32px 32px;
}
.deck-preview-icon {
  font-size: 38px;
  margin-bottom: 8px;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
}
.deck-preview-placeholder-text {
  font-family: var(--mono);
  font-size: 12px;
  color: #d4af37;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 4px;
  font-weight: 600;
}
.deck-preview-subtext {
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.55);
  max-width: 420px;
}

/* Card Bottom: Project Information */
.deck-body {
  padding: 26px 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}
.deck-meta-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.deck-index-badge {
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--olive);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.deck-category-badge {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink3);
  background: var(--bg2);
  padding: 3px 10px;
  border-radius: 50px;
  border: 1px solid var(--border);
}
.deck-title {
  font-family: var(--serif);
  font-size: clamp(22px, 2.8vw, 30px);
  font-weight: 700;
  color: var(--ink);
  line-height: 1.25;
  margin-bottom: 10px;
}
.deck-desc {
  font-size: 14px;
  color: var(--ink2);
  line-height: 1.6;
  margin-bottom: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.deck-tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 22px;
}
.deck-tag {
  font-family: var(--mono);
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--bg2);
  border: 1px solid var(--border);
  color: var(--ink2);
  font-weight: 500;
}
.deck-tag.hi {
  background: var(--olive-wash);
  color: var(--olive);
  border-color: var(--olive-border);
}

.deck-actions-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border);
  padding-top: 18px;
  margin-top: auto;
}
.deck-detail-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: var(--olive);
  padding: 9px 20px;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(70,92,51,0.25);
}
.deck-detail-link:hover {
  background: var(--olive-d);
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(70,92,51,0.35);
}
.deck-repo-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink2);
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid var(--border);
  background: var(--card);
  text-decoration: none;
  transition: all 0.2s ease;
}
.deck-repo-link:hover {
  border-color: var(--ink);
  color: var(--ink);
  background: var(--bg2);
}

/* Deck Controls */
.deck-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 36px;
}
.deck-nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink);
  background: var(--card);
  border: 1px solid var(--border);
  padding: 10px 22px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.deck-nav-btn:hover {
  background: var(--olive);
  color: #fff;
  border-color: var(--olive);
  transform: translateY(-1px);
}
.deck-counter-badge {
  font-family: var(--mono);
  font-size: 13.5px;
  font-weight: 700;
  color: var(--olive);
  letter-spacing: 0.08em;
  padding: 6px 14px;
  background: var(--olive-wash);
  border: 1px solid var(--olive-border);
  border-radius: 50px;
}

/* ===========================================================
   PROJECT DETAIL PAGE STYLING
   =========================================================== */
.pdetail-hero {
  padding: calc(var(--nav-h) + 40px) 0 40px;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}
.pdetail-back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 12.5px;
  color: var(--olive);
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 22px;
  padding: 6px 14px;
  border-radius: 50px;
  background: var(--olive-wash);
  border: 1px solid var(--olive-border);
  transition: all 0.2s;
}
.pdetail-back-link:hover {
  background: var(--olive);
  color: #fff;
  transform: translateX(-3px);
}
.pdetail-h1 {
  font-family: var(--serif);
  font-size: clamp(34px, 4.8vw, 64px);
  font-weight: 700;
  color: var(--ink);
  line-height: 1.15;
  margin-bottom: 16px;
}
.pdetail-lead {
  font-size: 18px;
  color: var(--ink2);
  line-height: 1.7;
  max-width: 820px;
  margin-bottom: 28px;
}
.pdetail-actions-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

/* Detail Main Grid */
.pdetail-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 56px;
  align-items: start;
  padding: 60px 0 90px;
}
.pdetail-main-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
}
.pdetail-section-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px 36px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}
.pdetail-section-card h2 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.pdetail-section-card h2::before {
  content: '';
  width: 8px;
  height: 22px;
  background: var(--olive);
  border-radius: 4px;
}
.pdetail-section-card p {
  font-size: 15px;
  color: var(--ink2);
  line-height: 1.75;
  margin-bottom: 14px;
}
.pdetail-section-card p:last-child {
  margin-bottom: 0;
}
.pdetail-section-card ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 16px 0;
}
.pdetail-section-card li {
  position: relative;
  padding-left: 22px;
  font-size: 14.5px;
  color: var(--ink2);
  line-height: 1.65;
}
.pdetail-section-card li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--olive);
  font-weight: bold;
}

/* Architecture ASCII / Diagram Box */
.pdetail-diagram-box {
  background: #191613;
  border: 1px solid rgba(212, 175, 55, 0.35);
  border-radius: 12px;
  padding: 22px 24px;
  margin: 18px 0;
  overflow-x: auto;
  color: #eed9bd;
  font-family: var(--mono);
  font-size: 12.5px;
  line-height: 1.5;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.4);
}

/* Sidebar Telemetry */
.pdetail-sidebar {
  position: sticky;
  top: calc(var(--nav-h) + 24px);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.pdetail-stat-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 22px 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
}
.pdetail-stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  font-size: 13.5px;
}
.pdetail-stat-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.pdetail-stat-label {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.pdetail-stat-val {
  font-family: var(--mono);
  font-weight: 600;
  color: var(--ink);
}

/* Universal Persistent Footer */
.persistent-foot-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}
.pfoot-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--ink2);
  padding: 5px 12px;
  border-radius: 50px;
  border: 1px solid var(--border);
  background: var(--card);
  text-decoration: none;
  transition: all 0.2s ease;
}
.pfoot-link:hover {
  background: var(--olive);
  color: #fff;
  border-color: var(--olive);
  transform: translateY(-2px);
}
.pfoot-link svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
}

@media (max-width: 960px) {
  .deck-stage { min-height: 560px; }
  .deck-stack { height: 520px; }
  .deck-preview-frame { height: 210px; }
  .deck-body { padding: 18px 20px 20px; }
  .pdetail-layout { grid-template-columns: 1fr; gap: 36px; }
  .pdetail-sidebar { position: static; }
}
@media (max-width: 640px) {
  .deck-panel.is-prev { transform: translate3d(-18px, 20px, -60px) scale(0.92); }
  .deck-panel.is-next { transform: translate3d(24px, -12px, -45px) scale(0.94); }
  .deck-actions-row { flex-direction: column; gap: 12px; align-items: stretch; }
  .deck-detail-link, .deck-repo-link { justify-content: center; }
  .deck-controls { gap: 10px; }
  .deck-nav-btn { padding: 8px 14px; font-size: 11px; }
}
`;

fs.appendFileSync(cssPath, deckCss, 'utf8');
console.log("Appended 3D Layered Project Deck CSS to style.css");
