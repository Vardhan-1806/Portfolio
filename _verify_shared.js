// Headless verification of shared.js execution
const http = require('http');
const { execSync } = require('child_process');

// Simple fetch
function fetch(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

async function main() {
  // Load shared.js and check it's valid
  const sharedJs = await fetch('http://localhost:3847/shared.js');
  console.log('shared.js loaded, size:', sharedJs.length, 'bytes');
  
  // Check key functions exist
  const functions = [
    'initScrollProgress', 'initNav', 'initMobileMenu', 'initReveal',
    'initCounters', 'initCopyButtons', 'initYear', 'initFloatingIdCard',
    'initAiAmbientSystem', 'initStackCodeInspector'
  ];
  
  for (const fn of functions) {
    console.log(`  ${fn}: ${sharedJs.includes(`function ${fn}`) ? '✓' : '✗'}`);
  }
  
  // Check REAL_STACK_EXAMPLES keys
  const exampleKeys = [
    'java', 'c / c++', 'python', 'javascript', 'react.js', 'node.js',
    'express.js', 'mongodb', 'git & github', 'html5 & css3', 'sql',
    'jwt security', 'rag systems'
  ];
  
  console.log('\nStack Examples:');
  for (const key of exampleKeys) {
    console.log(`  '${key}': ${sharedJs.includes(`'${key}'`) ? '✓' : '✗'}`);
  }
  
  // Check that ${} is properly escaped
  const unescaped = sharedJs.match(/(?<!\\)\$\{[^}]+\}/g);
  if (unescaped) {
    console.log('\n⚠ Remaining unescaped ${} in code blocks:');
    unescaped.forEach(m => console.log('  ', m));
  } else {
    console.log('\n✓ No unescaped ${} template expressions found outside proper template literals');
  }
  
  // Load about.html and check tech tiles
  const aboutHtml = await fetch('http://localhost:3847/about.html');
  const tileNames = aboutHtml.match(/class="tech-tile-name"[^>]*>([^<]+)/g);
  console.log('\nTech tiles found:', tileNames ? tileNames.length : 0);
  if (tileNames) {
    tileNames.forEach(t => console.log('  ', t.replace(/class="tech-tile-name"[^>]*>/, '')));
  }
  
  // Check index page for deck controller
  const indexHtml = await fetch('http://localhost:3847/');
  console.log('\nIndex page:');
  console.log('  Has deck-controller.js:', indexHtml.includes('deck-controller.js'));
  console.log('  Has deck panels:', (indexHtml.match(/deck-panel/g) || []).length, 'references');
  console.log('  Has floating-id-card:', indexHtml.includes('floating-id-card'));
}

main().catch(console.error);
