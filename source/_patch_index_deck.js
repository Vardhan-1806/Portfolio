const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const projectsPath = path.join(__dirname, 'projects.html');
const projectsHtml = fs.readFileSync(projectsPath, 'utf8');

// Extract the deck section from projects.html
const startTag = '<!-- MAIN PROJECTS SECTION: 3D LAYERED DECK SHOWCASE -->';
const endTag = '<!-- ENGINEERING METHODOLOGY STRIP -->';
const deckSectionMatch = projectsHtml.substring(
  projectsHtml.indexOf(startTag),
  projectsHtml.indexOf(endTag)
);

if (!deckSectionMatch) {
  console.error('Could not extract deck section from projects.html');
  process.exit(1);
}

// Target in index.html: from <!-- SECTION 2: SELECTED WORK --> to <!-- SECTION 3: CALL TO ACTION -->
const idxStart = indexHtml.indexOf('<!-- SECTION 2: SELECTED WORK -->');
const idxEnd = indexHtml.indexOf('<!-- SECTION 3: CALL TO ACTION -->');

if (idxStart === -1 || idxEnd === -1) {
  console.error('Could not find markers in index.html');
  process.exit(1);
}

// Modify deck section heading for index.html context
let adaptedDeck = deckSectionMatch
  .replace('<span class="sl-n">01</span><span class="sl-bar"></span><span class="sl-t">Interactive 3D Deck Showcase</span>',
           '<span class="sl-n">02</span><span class="sl-bar"></span><span class="sl-t">Featured Systems &amp; 3D Deck</span>')
  .replace('id="deck"', 'id="work"');

// Append CTA link at bottom of deck section on index.html
const ctaLink = `
    <div style="margin-top: 36px; text-align: center;" class="rv d2">
      <a href="projects.html" class="btn-ghost">
        Explore all specifications &amp; architecture documents &rarr;
      </a>
    </div>
  </div>
</section>
`;

adaptedDeck = adaptedDeck.trim();
if (adaptedDeck.endsWith('</section>')) {
  adaptedDeck = adaptedDeck.substring(0, adaptedDeck.lastIndexOf('</section>')) + ctaLink;
}

indexHtml = indexHtml.substring(0, idxStart) + adaptedDeck + '\n\n' + indexHtml.substring(idxEnd);

// Ensure deck-controller.js is included before </body>
if (!indexHtml.includes('deck-controller.js')) {
  indexHtml = indexHtml.replace('</body>', '<script src="deck-controller.js"></script>\n</body>');
}

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Successfully updated index.html with 3D Layered Deck showcase!');
