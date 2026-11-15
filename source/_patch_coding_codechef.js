const fs = require('fs');
const path = require('path');

const codingPath = path.join(__dirname, 'coding.html');
let html = fs.readFileSync(codingPath, 'utf8');

// Replace the 4 points in ccSvgGraph with 5 points and new curve
const oldSvgBlock = `<!-- Drawn Curve (5 Contests: 747 → 823 → 954 → 1119) -->
          <path id="ccCurvePath" d="M 120 171 Q 210 163, 310 156 Q 410 128, 500 101 Q 570 80, 640 63" class="pencil-curve cc-curve"/>

          <!-- 4 Data Points -->
          <g id="ccPointsGroup">
            <circle id="ccPt1" cx="120" cy="171" class="graph-point cc-point" data-tip="Starters 253 · Aug 26, 2026 · Rating: 747 (Rank: 18,290)" style="opacity: 0; transition: opacity 0.3s, r 0.2s;"/>
            <text id="ccTx1" x="120" y="202" font-family="'DM Mono', monospace" font-size="10" fill="#7a6d61" text-anchor="middle" style="opacity: 0;">Aug 26 (747)</text>

            <circle id="ccPt2" cx="310" cy="156" class="graph-point cc-point" data-tip="Starters 254 · Sep 2, 2026 · Rating: 823 (Rank: 18,195)" style="opacity: 0; transition: opacity 0.3s, r 0.2s;"/>
            <text id="ccTx2" x="310" y="202" font-family="'DM Mono', monospace" font-size="10" fill="#7a6d61" text-anchor="middle" style="opacity: 0;">Sep 2 (823)</text>

            <circle id="ccPt3" cx="500" cy="101" class="graph-point cc-point" data-tip="Starters 256 · Sep 16, 2026 · Rating: 954 (Rank: 9,303)" style="opacity: 0; transition: opacity 0.3s, r 0.2s;"/>
            <text id="ccTx3" x="500" y="202" font-family="'DM Mono', monospace" font-size="10" fill="#7a6d61" text-anchor="middle" style="opacity: 0;">Sep 16 (954)</text>

            <circle id="ccPt4" cx="640" cy="63" class="graph-point cc-point" data-tip="Starters 260 · Oct 14, 2026 · Rating: 1,119 (Peak · Rank: 11,307)" style="opacity: 0; transition: opacity 0.3s, r 0.2s;"/>
            <text id="ccTx4" x="640" y="202" font-family="'DM Mono', monospace" font-size="10" fill="#9B3828" font-weight="bold" text-anchor="middle" style="opacity: 0;">Oct 14 (1119 Peak)</text>
          </g>`;

const newSvgBlock = `<!-- Drawn Curve (5 Contests: 747 → 823 → 954 → 1036 → 1119 Peak) -->
          <path id="ccCurvePath" d="M 100 171 Q 170 165, 240 156 Q 310 145, 380 132 Q 450 120, 520 105 Q 590 85, 660 55" class="pencil-curve cc-curve"/>

          <!-- 5 Data Points -->
          <g id="ccPointsGroup">
            <circle id="ccPt1" cx="100" cy="171" class="graph-point cc-point" data-tip="Starters 253 · Aug 26, 2026 · Rating: 747 (Rank: 18,290)" style="opacity: 0; transition: opacity 0.3s, r 0.2s;"/>
            <text id="ccTx1" x="100" y="202" font-family="'DM Mono', monospace" font-size="10" fill="#7a6d61" text-anchor="middle" style="opacity: 0;">Aug 26 (747)</text>

            <circle id="ccPt2" cx="240" cy="156" class="graph-point cc-point" data-tip="Starters 254 · Sep 2, 2026 · Rating: 823 (Rank: 18,195)" style="opacity: 0; transition: opacity 0.3s, r 0.2s;"/>
            <text id="ccTx2" x="240" y="202" font-family="'DM Mono', monospace" font-size="10" fill="#7a6d61" text-anchor="middle" style="opacity: 0;">Sep 2 (823)</text>

            <circle id="ccPt3" cx="380" cy="132" class="graph-point cc-point" data-tip="Starters 256 · Sep 16, 2026 · Rating: 954 (Rank: 9,303)" style="opacity: 0; transition: opacity 0.3s, r 0.2s;"/>
            <text id="ccTx3" x="380" y="202" font-family="'DM Mono', monospace" font-size="10" fill="#7a6d61" text-anchor="middle" style="opacity: 0;">Sep 16 (954)</text>

            <circle id="ccPt4" cx="520" cy="105" class="graph-point cc-point" data-tip="Starters 260 · Oct 14, 2026 · Rating: 1,036 (Rank: 11,307)" style="opacity: 0; transition: opacity 0.3s, r 0.2s;"/>
            <text id="ccTx4" x="520" y="202" font-family="'DM Mono', monospace" font-size="10" fill="#7a6d61" text-anchor="middle" style="opacity: 0;">Oct 14 (1036)</text>

            <circle id="ccPt5" cx="660" cy="55" class="graph-point cc-point" data-tip="Starters 261 · Oct 2026 · Rating: 1,119 (Peak · 1★ Div 4)" style="opacity: 0; transition: opacity 0.3s, r 0.2s;"/>
            <text id="ccTx5" x="660" y="202" font-family="'DM Mono', monospace" font-size="10" fill="#9B3828" font-weight="bold" text-anchor="middle" style="opacity: 0;">Peak: 1119★</text>
          </g>`;

if (html.includes(oldSvgBlock)) {
  html = html.replace(oldSvgBlock, newSvgBlock);
} else {
  console.log('Old SVG block not exact match, using regex');
  html = html.replace(/<!-- Drawn Curve[\s\S]*?<\/g>/, newSvgBlock);
}

// Update ccAreaPath
html = html.replace(
  'd="M 120 185 L 120 171 L 310 156 L 500 101 L 640 63 L 640 185 Z"',
  'd="M 100 185 L 100 171 L 240 156 L 380 132 L 520 105 L 660 55 L 660 185 Z"'
);

// Update script points array in coding.html
const oldPoints = `const points = [
      { pt: document.getElementById('ccPt1'), tx: document.getElementById('ccTx1'), x: 120, y: 171 },
      { pt: document.getElementById('ccPt2'), tx: document.getElementById('ccTx2'), x: 310, y: 156 },
      { pt: document.getElementById('ccPt3'), tx: document.getElementById('ccTx3'), x: 500, y: 101 },
      { pt: document.getElementById('ccPt4'), tx: document.getElementById('ccTx4'), x: 640, y: 63 }
    ];`;

const newPoints = `const points = [
      { pt: document.getElementById('ccPt1'), tx: document.getElementById('ccTx1'), x: 100, y: 171 },
      { pt: document.getElementById('ccPt2'), tx: document.getElementById('ccTx2'), x: 240, y: 156 },
      { pt: document.getElementById('ccPt3'), tx: document.getElementById('ccTx3'), x: 380, y: 132 },
      { pt: document.getElementById('ccPt4'), tx: document.getElementById('ccTx4'), x: 520, y: 105 },
      { pt: document.getElementById('ccPt5'), tx: document.getElementById('ccTx5'), x: 660, y: 55 }
    ];`;

html = html.replace(oldPoints, newPoints);
html = html.replace('setPencil(120, 171, -25);', 'setPencil(100, 171, -25);');

fs.writeFileSync(codingPath, html, 'utf8');
console.log('Updated coding.html with 5 CodeChef points and 1119 rating!');
