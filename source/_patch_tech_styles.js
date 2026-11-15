const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

const techStyles = `
/* ==========================================================================
   3D TECH STACK UNIVERSE & INTERACTIVE PHYSICS SANDBOX (Screenshots 2 & 3)
   ========================================================================== */

.tech-view-controls {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 36px;
}

.tech-mode-switcher {
  display: inline-flex;
  align-self: flex-start;
  background: var(--bg);
  padding: 5px;
  border-radius: 50px;
  border: 1px solid var(--border);
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}

.tech-mode-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 50px;
  border: none;
  background: transparent;
  color: var(--ink2);
  font-family: var(--sans);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.tech-mode-btn.is-active {
  background: var(--olive);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(104, 135, 77, 0.35);
}

.tech-mode-btn:hover:not(.is-active) {
  color: var(--ink);
  background: rgba(0,0,0,0.04);
}

.tech-category-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-cat-block {
  margin-bottom: 44px;
}

.tech-cat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.tech-cat-indicator {
  width: 4px;
  height: 24px;
  border-radius: 2px;
  background: var(--olive);
}

.tech-cat-title {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
  line-height: 1.2;
}

.tech-cat-subtitle {
  font-family: var(--sans);
  font-size: 13px;
  color: var(--ink3);
  margin: 2px 0 0 0;
}

/* 3D Dimensional Grid & Tiles */
.tech-3d-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
}

.tech-3d-tile {
  perspective: 900px;
}

.tech-tile-inner {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02);
  transform-style: preserve-3d;
  will-change: transform;
  overflow: hidden;
  transition: box-shadow 0.35s ease, border-color 0.35s ease;
  cursor: pointer;
}

.tech-3d-tile:hover .tech-tile-inner {
  border-color: var(--tech-accent, var(--olive));
  box-shadow: 0 16px 36px rgba(0,0,0,0.08), 0 0 0 1px var(--tech-accent, var(--olive));
}

.tech-tile-glare {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  border-radius: 16px;
  z-index: 3;
}

.tech-tile-logo {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid transparent;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.tech-3d-tile:hover .tech-tile-logo {
  transform: scale(1.1) translateZ(10px);
}

.tech-tile-info {
  flex: 1;
  min-width: 0;
}

.tech-tile-name {
  font-family: var(--sans);
  font-size: 15.5px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 4px;
}

.tech-tile-scope {
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--ink2);
  line-height: 1.45;
}

.tech-tile-badge {
  font-family: var(--mono);
  font-size: 9.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 3px 8px;
  border-radius: 20px;
  background: var(--bg2);
  color: var(--ink3);
  position: absolute;
  top: 14px;
  right: 14px;
  opacity: 0.7;
}

/* Physics Sandbox (Screenshot 3 Replication) */
.tech-sandbox-view {
  animation: fadeIn 0.4s ease;
}

.sandbox-card-frame {
  background: #121417;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 20px;
  padding: 24px 28px 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.35);
  overflow: hidden;
}

.sandbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sandbox-tag {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #8c9ba5;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.sandbox-title {
  font-family: var(--sans);
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.sandbox-reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: #ffffff;
  font-family: var(--sans);
  font-size: 13.5px;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.sandbox-reset-btn:hover {
  background: rgba(255,255,255,0.18);
  border-color: rgba(255,255,255,0.3);
  transform: scale(1.04);
}

.sandbox-reset-btn.is-spinning svg {
  animation: spin 0.6s linear;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.sandbox-canvas-wrapper {
  position: relative;
  background: #0d0e11;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
}

#sandboxCanvas {
  display: block;
  width: 100%;
}

.sandbox-hint {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(8px);
  padding: 5px 14px;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.1);
  color: #cbd5e1;
  font-family: var(--mono);
  font-size: 11px;
  pointer-events: none;
  white-space: nowrap;
}

/* ==========================================================================
   INTERACTIVE RESUME 3D DOCUMENT CARD & TRIO ACTIONS
   ========================================================================== */
.resume-3d-card {
  perspective: 1000px;
  margin-bottom: 24px;
}

.resume-3d-inner {
  background: var(--card);
  border: 1.5px solid var(--border);
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 12px 36px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.02);
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
}

.resume-3d-inner:hover {
  transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) translateY(-4px);
  box-shadow: 0 20px 48px rgba(0,0,0,0.12), 0 0 0 1px var(--olive);
}

.resume-action-trio {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .tech-3d-grid {
    grid-template-columns: 1fr;
  }
  .tech-mode-switcher {
    width: 100%;
    display: flex;
  }
  .tech-mode-btn {
    flex: 1;
    justify-content: center;
    padding: 8px 12px;
    font-size: 12px;
  }
  .sandbox-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .sandbox-reset-btn {
    align-self: flex-start;
  }
}
`;

if (!css.includes('3D TECH STACK UNIVERSE')) {
  css += '\n' + techStyles;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Appended 3D Tech Stack & Sandbox CSS to style.css successfully.');
} else {
  console.log('Tech stack styles already present in style.css');
}
