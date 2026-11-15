const fs = require('fs');
let p = fs.readFileSync('projects.html', 'utf8');
const scriptIdx = p.indexOf('<script>\n  // ========================================================\n  // 3D LAYERED PROJECT DECK CONTROLLER');
if (scriptIdx !== -1) {
  p = p.substring(0, scriptIdx) + '<script src="deck-controller.js"></script>\n</body>\n</html>';
  fs.writeFileSync('projects.html', p, 'utf8');
  console.log('projects.html updated to use deck-controller.js');
} else {
  console.log('pattern not found');
}
