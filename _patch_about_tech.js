const fs = require('fs');
const path = require('path');
const { generateTechSectionHtml } = require('./_build_tech_stack');

const aboutPath = path.join(__dirname, 'about.html');
let html = fs.readFileSync(aboutPath, 'utf8');

const targetStart = '<!-- SECTION: 3D TECH STACK & INTERACTIVE PHYSICS SANDBOX -->';
const targetEnd = '<!-- UNIVERSAL PERSISTENT FOOTER -->';

const startIndex = html.indexOf(targetStart);
const endIndex = html.indexOf(targetEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not locate target markers in about.html');
  process.exit(1);
}

const newTechSection = generateTechSectionHtml() + '\n';
const updatedHtml = html.substring(0, startIndex) + newTechSection + html.substring(endIndex);

fs.writeFileSync(aboutPath, updatedHtml, 'utf8');
console.log('Successfully updated about.html with complete 18 tech stack & code inspector triggers!');
