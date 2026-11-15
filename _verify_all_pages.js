// Verification script using puppeteer-core connecting to Chrome
const fs = require('fs');
const http = require('http');

async function testFetch(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      resolve({ status: res.statusCode, headers: res.headers });
    }).on('error', reject);
  });
}

async function verifyAll() {
  const pages = [
    '/',
    '/about.html',
    '/projects.html',
    '/project-lexassist.html',
    '/project-travelmate.html',
    '/project-socially.html',
    '/project-algomotion.html',
    '/coding.html',
    '/certifications.html',
    '/resume.html',
    '/contact.html'
  ];

  console.log('Testing all pages on dev server http://localhost:3847 ...');
  let hasError = false;

  for (const p of pages) {
    try {
      const res = await testFetch('http://localhost:3847' + p);
      if (res.status === 200) {
        console.log(`[PASS] http://localhost:3847${p} -> HTTP ${res.status}`);
      } else {
        console.error(`[FAIL] http://localhost:3847${p} -> HTTP ${res.status}`);
        hasError = true;
      }
    } catch (e) {
      console.error(`[ERR] http://localhost:3847${p} -> ${e.message}`);
      hasError = true;
    }
  }

  if (hasError) {
    process.exit(1);
  } else {
    console.log('ALL 11 PAGES RETURNED HTTP 200 OK!');
  }
}

verifyAll();
