const fs = require('fs');
const path = require('path');

// Read _build_tech_stack.js and fix the escaped backticks
const filePath = path.join(__dirname, '_build_tech_stack.js');
let src = fs.readFileSync(filePath, 'utf8');

// Replace all \` with ` and \${ with ${
src = src.replace(/\\`/g, '`').replace(/\\\${/g, '${');

fs.writeFileSync(filePath, src, 'utf8');
console.log('Fixed syntax in _build_tech_stack.js');
