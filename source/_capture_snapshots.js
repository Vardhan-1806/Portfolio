const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9235;
const brainDir = 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\4c0d9590-e9ec-4d5c-846f-9f1fd70cd914';

// Check if chrome exists
if (!fs.existsSync(chromePath)) {
  console.log('Chrome binary not found at standard path.');
  process.exit(0);
}

// Launch Chrome in background
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  '--window-size=1440,1080',
  '--user-data-dir=C:\\Users\\dell\\.gemini\\antigravity\\scratch\\portfolio-vardhan\\.chrome_test_tmp'
], { detached: true, stdio: 'ignore' });

chromeProc.unref();

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

const WS = globalThis.WebSocket;

async function runCapture() {
  await delay(1500);
  try {
    const list = await getJson(`http://127.0.0.1:${port}/json/list`);
    const wsUrl = list[0]?.webSocketDebuggerUrl;
    if (!wsUrl) {
      console.log('No webSocketDebuggerUrl found, skipping automated screenshots.');
      return;
    }

    const ws = new WS(wsUrl);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        const onMsg = (evt) => {
          const msg = JSON.parse(evt.data || evt);
          if (msg.id === curId) {
            ws.removeEventListener('message', onMsg);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', onMsg);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await new Promise(r => ws.addEventListener('open', r));

    const targets = [
      { name: 'verify_index_deck.png', url: 'http://localhost:3847/#work' },
      { name: 'verify_about_tech_universe.png', url: 'http://localhost:3847/about.html#tech' },
      { name: 'verify_resume_3d.png', url: 'http://localhost:3847/resume.html' },
      { name: 'verify_project_lexassist.html.png', url: 'http://localhost:3847/project-lexassist.html' }
    ];

    for (const t of targets) {
      await send('Page.navigate', { url: t.url });
      await delay(2000);
      const snap = await send('Page.captureScreenshot', { format: 'png' });
      if (snap?.data) {
        const outPath = path.join(brainDir, t.name);
        fs.writeFileSync(outPath, Buffer.from(snap.data, 'base64'));
        console.log(`Saved screenshot: ${t.name}`);
      }
    }

    ws.close();
    console.log('Snapshots capture complete.');
  } catch (err) {
    console.log('Screenshot capture notice:', err.message);
  }
}

runCapture();
