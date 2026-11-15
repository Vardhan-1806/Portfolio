const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9245;

const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  '--window-size=1440,900',
  '--user-data-dir=C:\\Users\\dell\\.gemini\\antigravity\\scratch\\portfolio-vardhan\\.chrome_debug_tmp'
], { detached: true, stdio: 'ignore' });

chromeProc.unref();

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

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

async function debugErrors() {
  await delay(1200);
  try {
    const list = await getJson(`http://127.0.0.1:${port}/json/list`);
    const wsUrl = list[0]?.webSocketDebuggerUrl;
    if (!wsUrl) {
      console.log('No wsUrl found');
      return;
    }

    const WS = globalThis.WebSocket;
    const ws = new WS(wsUrl);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        const onMsg = (evt) => {
          const msg = JSON.parse(evt.data);
          if (msg.id === curId) {
            ws.removeEventListener('message', onMsg);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', onMsg);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    const errors = [];
    ws.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.method === 'Runtime.exceptionThrown') {
        errors.push(msg.params.exceptionDetails);
      }
      if (msg.method === 'Log.entryAdded') {
        if (msg.params.entry.level === 'error') {
          errors.push(msg.params.entry.text);
        }
      }
    });

    await new Promise(r => ws.addEventListener('open', r));
    await send('Runtime.enable');
    await send('Log.enable');

    console.log('=== TESTING index.html ===');
    await send('Page.navigate', { url: 'http://localhost:3847/' });
    await delay(1500);

    const indexRes = await send('Runtime.evaluate', {
      expression: `({
        errors: window.__errors || [],
        countersText: Array.from(document.querySelectorAll('.hstat-n, .proof-n')).map(e => e.textContent.trim()),
        hasHud: !!document.querySelector('.ai-hud-ribbon'),
        hasBlueprint: !!document.querySelector('.ai-blueprint-bg'),
        hasDeck: !!document.querySelector('#deckStage'),
        deckPanelsCount: document.querySelectorAll('.deck-panel').length
      })`,
      returnByValue: true
    });
    console.log('index.html evaluation:', JSON.stringify(indexRes?.result?.value, null, 2));

    console.log('=== TESTING about.html ===');
    await send('Page.navigate', { url: 'http://localhost:3847/about.html' });
    await delay(1500);

    const aboutRes = await send('Runtime.evaluate', {
      expression: `({
        hasTechView: !!document.querySelector('#techUniverseView'),
        techTilesCount: document.querySelectorAll('.tech-3d-tile').length,
        hasSandbox: !!document.querySelector('#techSandboxView')
      })`,
      returnByValue: true
    });
    console.log('about.html evaluation:', JSON.stringify(aboutRes?.result?.value, null, 2));

    console.log('Logged errors:', errors);

    ws.close();
  } catch (e) {
    console.error('Debug script error:', e);
  }
}

debugErrors();
