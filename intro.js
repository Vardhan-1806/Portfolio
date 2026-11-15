/* ============================================================
   ASV PORTFOLIO — CINEMATIC CAR-TO-LOGO INTRO ANIMATION
   Brand: Alisam Srivardhan
   Director / Motion Engineer: Advanced WebGL & Three.js Specialist

   Continuous Cinematic Sequence:
   1. Opening Scene — Cinematic Car Entrance:
      - Deep charcoal atmosphere (#08090c) with reflective tarmac.
      - 3D sports car emerges from distance (z = -36.0) driving toward viewer
        with realistic wheel rotation and smooth cubic deceleration (z = -1.8).
   2. Headlight Reveal:
      - Headlights progressively illuminate from warm amber to brilliant LED white.
      - Twin forward spotlights cast controlled illumination on the ground.
   3. Camera Push-In Through Windshield to Steering Wheel:
      - Smooth cubic spline camera path from exterior into the driver cockpit.
      - Softens windshield opacity to prevent clipping artifacts.
      - Cockpit ambient light intensifies, illuminating the steering wheel.
   4. Steering Wheel Center Logo & High-Speed Spin:
      - Authentic ASV brand logo proudly anchored on the center hub.
      - Steering wheel performs rapid, multi-rotation spin (1500ms).
      - Camera pushes in tight, narrowing FOV directly into the center logo.
   5. Seamless Next-Page Transition:
      - 3D cockpit gently dissolves into the centered radiant ASV logo.
      - Logo holds centered and pristine (no text, no outer rings).
      - Seamlessly glides and scales directly to the navbar logo position as the
        homepage gracefully fades in underneath.
   ============================================================ */

(function () {
  'use strict';

  const INTRO_SESSION_KEY = 'asv_cinematic_car_intro_v1';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isHomePage =
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname.endsWith('/') ||
    window.location.pathname === '';

  const ASSETS = {
    carModel: 'car-model.glb',
    logoImage: 'asv-logo.png'
  };

  const C = {
    bg: '#08090c',
    fog: '#08090c',
    tarmac: '#0c0d12',
    gold: '#c4a35a',
    goldGlow: 'rgba(196, 163, 90, 0.45)',
    olive: '#b8cca6',
    ivory: '#fcfbf7',
    headlightOff: 0x222222,
    headlightWarm: 0xffb74d,
    headlightWhite: 0xf4f8ff
  };

  const ease = {
    outQuad: t => t * (2 - t),
    inQuad: t => t * t,
    inOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    outCubic: t => (--t) * t * t + 1,
    inCubic: t => t * t * t,
    inOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    outSine: t => Math.sin((t * Math.PI) / 2)
  };

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function safeRemove(el) {
    if (!el) return;
    if (typeof el.remove === 'function') el.remove();
    else if (el.parentNode) el.parentNode.removeChild(el);
  }

    let activeIntroController = null;

  // ── DOM Creation & Styles ──────────────────────────────────
  function createIntroDOM() {
    const existing = document.getElementById('introOverlay');
    safeRemove(existing);

    const overlay = document.createElement('div');
    overlay.id = 'introOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Cinematic Car Introduction');

    overlay.innerHTML = `
      <canvas id="threeIntroCanvas"></canvas>
      <div id="cinematicVignette" class="cinematic-vignette"></div>
      <div id="headlightGlowOverlay" class="headlight-glow-overlay"></div>

      <!-- Minimal Preloader -->
      <div id="introPreloader" class="intro-preloader">
        <div class="preloader-bar-wrap">
          <div class="preloader-bar" id="preloaderBar"></div>
        </div>
        <div class="preloader-label">INITIALIZING EXPERIENCE</div>
      </div>

      <!-- Recruiter Brand & Telemetry HUD -->
      <div id="introTelemetryHud" class="intro-telemetry-hud">
        <div class="intro-brand-title">ALISAM SRIVARDHAN</div>
        <div class="intro-brand-sub">FULL-STACK DEVELOPER · SCALABLE SYSTEMS &amp; COMPETITIVE PROGRAMMING</div>
        <div class="intro-brand-meta">BVRIT COMPUTER SCIENCE · 8.88 CGPA · HYDERABAD</div>
      </div>

      <!-- Skip Button -->
      <button class="intro-skip-btn" id="introSkipBtn" aria-label="Skip introduction">
        Skip Intro <span class="skip-key-hint">[ESC]</span>
      </button>

      <!-- Pure Logo Stage (Clean Centered Logo, No Ring, No Text) -->
      <div id="introLogoStage" class="intro-logo-stage">
        <img src="${ASSETS.logoImage}" alt="ASV Logo" class="asv-hero-logo" id="asvHeroLogo" />
      </div>
    `;

    document.body.appendChild(overlay);

    let styleTag = document.getElementById('cinematicCarIntroStyles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'cinematicCarIntroStyles';
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = `
      #introOverlay {
        position: fixed; inset: 0; z-index: 999999;
        background: #08090c;
        display: flex; align-items: center; justify-content: center;
        overflow: hidden;
        user-select: none;
        transition: background 1.0s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
      }
      #introOverlay.fade-out {
        opacity: 0; pointer-events: none;
      }
      #threeIntroCanvas {
        position: absolute; inset: 0;
        width: 100%; height: 100%;
        display: block; z-index: 1;
        transition: opacity 1.0s ease;
      }
      .cinematic-vignette {
        position: absolute; inset: 0;
        pointer-events: none; z-index: 2;
        background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(8, 9, 12, 0.6) 80%, rgba(8, 9, 12, 0.95) 100%);
        transition: opacity 0.8s ease;
      }
      .headlight-glow-overlay {
        position: absolute; inset: 0;
        pointer-events: none; z-index: 3;
        background: radial-gradient(circle at 50% 62%, rgba(244, 248, 255, 0.18) 0%, rgba(196, 163, 90, 0.08) 35%, transparent 70%);
        opacity: 0;
        transition: opacity 0.6s ease;
      }
      .headlight-glow-overlay.active {
        opacity: 1;
      }

      /* Preloader */
      .intro-preloader {
        position: absolute; bottom: 38px; left: 50%;
        transform: translateX(-50%);
        display: flex; flex-direction: column; align-items: center; gap: 8px;
        z-index: 10; pointer-events: none;
        transition: opacity 0.4s ease;
      }
      .intro-preloader.hidden {
        opacity: 0; pointer-events: none;
      }
      .preloader-bar-wrap {
        width: 140px; height: 2px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px; overflow: hidden;
      }
      .preloader-bar {
        width: 35%; height: 100%;
        background: #c4a35a;
        animation: preloaderSweep 1.2s infinite ease-in-out;
      }
      @keyframes preloaderSweep {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
        100% { transform: translateX(300%); }
      }
      .preloader-label {
        font-family: var(--mono, monospace);
        font-size: 9.5px; letter-spacing: 0.18em;
        color: #8b7355; text-transform: uppercase;
      }

      /* Skip Control */
      .intro-skip-btn {
        position: fixed; top: 24px; right: 28px; z-index: 10000;
        font-family: var(--mono, monospace); font-size: 11.5px; letter-spacing: 0.08em;
        color: #fcfbf7; background: rgba(18, 20, 17, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.18); border-radius: 50px;
        padding: 8px 18px; cursor: pointer;
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        transition: all 0.25s ease;
      }
      .intro-skip-btn:hover {
        background: rgba(255, 255, 255, 0.16);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateY(-1px);
      }
      .skip-key-hint {
        opacity: 0.5; margin-left: 5px; font-size: 10.5px;
      }

      /* ── Pure Centered Logo Stage ── */
      .intro-logo-stage {
        position: absolute; inset: 0;
        display: flex; align-items: center; justify-content: center;
        z-index: 20; pointer-events: none;
      }
      .asv-hero-logo {
        position: fixed;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%) scale(0.65);
        width: 220px; height: auto; max-height: 130px; object-fit: contain;
        filter: brightness(0) invert(1) drop-shadow(0 0 32px rgba(196, 163, 90, 0.95)) drop-shadow(0 14px 40px rgba(0, 0, 0, 0.95));
        opacity: 0;
        z-index: 25; pointer-events: none;
        transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), top 1.1s cubic-bezier(0.16, 1, 0.3, 1), left 1.1s cubic-bezier(0.16, 1, 0.3, 1), width 1.1s cubic-bezier(0.16, 1, 0.3, 1), height 1.1s cubic-bezier(0.16, 1, 0.3, 1), filter 1.1s ease;
      }
      .asv-hero-logo.center-active {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      .asv-hero-logo.glide-to-nav {
        transform: none;
        opacity: 1;
      }

      @media (max-width: 680px) {
        .asv-hero-logo { width: 160px; max-height: 100px; }
      }
    `;

    return overlay;
  }

  // ── Helper: Pre-render High-Precision Steering Wheel Badge ──
  function createSteeringBadgeTexture() {
    return new Promise(resolve => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Deep liquid obsidian disc
      ctx.beginPath();
      ctx.arc(256, 256, 240, 0, Math.PI * 2);
      ctx.fillStyle = '#14161c';
      ctx.fill();

      // Metallic gold border rim
      ctx.lineWidth = 12;
      ctx.strokeStyle = '#c4a35a';
      ctx.stroke();

      // Subtle inner rim
      ctx.beginPath();
      ctx.arc(256, 256, 226, 0, Math.PI * 2);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(252, 251, 247, 0.35)';
      ctx.stroke();

      const img = new Image();
      img.onload = () => {
        // Draw logo centered in bright white / gold
        const tmp = document.createElement('canvas');
        tmp.width = img.width;
        tmp.height = img.height;
        const tctx = tmp.getContext('2d');
        tctx.drawImage(img, 0, 0);

        // Turn logo pixels to crisp gold-ivory (#fcfbf7)
        tctx.globalCompositeOperation = 'source-in';
        tctx.fillStyle = '#fcfbf7';
        tctx.fillRect(0, 0, tmp.width, tmp.height);

        // Draw onto badge
        const targetW = 330;
        const targetH = (img.height / img.width) * targetW;
        ctx.drawImage(tmp, (512 - targetW) / 2, (512 - targetH) / 2, targetW, targetH);

        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        resolve(tex);
      };
      img.onerror = () => {
        const tex = new THREE.CanvasTexture(canvas);
        resolve(tex);
      };
      img.src = ASSETS.logoImage;
    });
  }

  // ── Main Animation Execution ──────────────────────────────
  async function runCinematicIntro(force = false) {
    if (!isHomePage) return;
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded, skipping intro');
      return;
    }

    const forceReplay = force || sessionStorage.getItem('asv_force_replay') === '1' || window.location.search.includes('replay=1');
    if (forceReplay) {
      sessionStorage.removeItem('asv_force_replay');
      sessionStorage.removeItem(INTRO_SESSION_KEY);
      if (window.history && window.history.replaceState && window.location.search.includes('replay=1')) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

    if (!forceReplay && (prefersReduced || sessionStorage.getItem(INTRO_SESSION_KEY) === 'true')) {
      const existing = document.getElementById('introOverlay');
      safeRemove(existing);
      window.dispatchEvent(new CustomEvent('asvIntroComplete', { detail: { skipped: true } }));
      return;
    }

    // Abort and clean up any existing running intro
    if (activeIntroController) {
      activeIntroController.abort();
      activeIntroController = null;
    }

    const currentController = { aborted: false };
    currentController.abort = () => { currentController.aborted = true; };
    activeIntroController = currentController;

    const overlay = createIntroDOM();
    const canvas = document.getElementById('threeIntroCanvas');
    const skipBtn = document.getElementById('introSkipBtn');
    const preloader = document.getElementById('introPreloader');
    const headlightGlow = document.getElementById('headlightGlowOverlay');
    const asvHeroLogo = document.getElementById('asvHeroLogo');
    const telemetryHud = document.getElementById('introTelemetryHud');

    let isCancelled = false;
    let animId = null;

    // WebGL Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(C.bg);
    scene.fog = new THREE.FogExp2(C.fog, 0.035);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.05, 100);
    camera.position.set(0, 0.95, 3.2);
    camera.lookAt(0, 0.65, 0);

    // ── Lighting Architecture ────────────────────────────────
    const ambLight = new THREE.AmbientLight('#141720', 1.2);
    scene.add(ambLight);

    const keyLight = new THREE.DirectionalLight('#fdfbf7', 1.6);
    keyLight.position.set(3, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(C.gold, 1.8);
    rimLight.position.set(-4, 3, -6);
    scene.add(rimLight);

    const floorBounce = new THREE.PointLight('#2c3240', 0.6, 12);
    floorBounce.position.set(0, 0.3, 0);
    scene.add(floorBounce);

    // Interior Cockpit Accent Light
    const cockpitLight = new THREE.PointLight('#fff3db', 0.0, 4.0);
    cockpitLight.position.set(0.346, 1.15, -1.95);
    scene.add(cockpitLight);

    // ── Reflective Tarmac Ground Plane ───────────────────────
    const groundGeo = new THREE.PlaneGeometry(80, 80);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0c0d12,
      roughness: 0.35,
      metalness: 0.65
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    const runwayGeo = new THREE.PlaneGeometry(3.6, 70);
    const runwayMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.5,
      metalness: 0.3
    });
    const runway = new THREE.Mesh(runwayGeo, runwayMat);
    runway.rotation.x = -Math.PI / 2;
    runway.position.set(0, 0.002, -15);
    runway.receiveShadow = true;
    scene.add(runway);

    // ── Resize & Skip Cleanups ───────────────────────────────
    function onResize() {
      const W = window.innerWidth;
      const H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    }
    window.addEventListener('resize', onResize);

    let finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      isCancelled = true;
      currentController.abort();
      if (animId) cancelAnimationFrame(animId);
      sessionStorage.setItem(INTRO_SESSION_KEY, 'true');

      const navLogo = document.querySelector('.brand-logo');
      if (navLogo) navLogo.style.opacity = '1';

      overlay.classList.add('fade-out');
      window.dispatchEvent(new CustomEvent('asvIntroComplete', { detail: { skipped: false } }));

      setTimeout(() => {
        safeRemove(overlay);
        window.removeEventListener('resize', onResize);
        try {
          renderer.dispose();
        } catch (_) {}
      }, 750);
    }

    skipBtn.addEventListener('click', finish);
    function onKey(e) { if (e.key === 'Escape') finish(); }
    document.addEventListener('keydown', onKey);

    const wait = ms => new Promise(r => setTimeout(r, ms));
    const bail = () => isCancelled;

    function animateTime(durationMs, onTick) {
      return new Promise(resolve => {
        if (isCancelled) return resolve();
        const start = performance.now();
        function frame(now) {
          if (isCancelled) return resolve();
          const t = clamp((now - start) / durationMs, 0, 1);
          onTick(t);
          if (t < 1) requestAnimationFrame(frame);
          else resolve();
        }
        requestAnimationFrame(frame);
      });
    }

    function renderLoop() {
      if (isCancelled) return;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderLoop);
    }
    renderLoop();

    // ── Load 3D Car Model & Prepare Steering Wheel Badge ─────
    let carModel = null;
    let wheels = [];
    let steeringWheel = null;
    let steeringCentre = null;
    let headlightMeshes = [];
    let windshieldMesh = null;
    let spotLeft = null;
    let spotRight = null;
    let badgeTexture = null;

    try {
      if (typeof THREE.GLTFLoader === 'undefined') {
        throw new Error('GLTFLoader not loaded');
      }

      // Pre-generate high-precision badge texture concurrently
      const badgeTexPromise = createSteeringBadgeTexture();

      const loader = new THREE.GLTFLoader();
      const gltf = await new Promise((resolve, reject) => {
        loader.load(ASSETS.carModel, resolve, undefined, reject);
      });

      badgeTexture = await badgeTexPromise;

      if (bail()) return;

      carModel = gltf.scene;
      carModel.rotation.set(0, Math.PI, 0);
      carModel.position.set(0, 0, -36.0);
      scene.add(carModel);

      // Enhance materials
      carModel.traverse(node => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;

          const mat = node.material;
          if (mat) {
            if (mat.name === 'Body_Color') {
              mat.color.set(0x181a20);
              mat.metalness = 0.88;
              mat.roughness = 0.22;
            } else if (mat.name === 'Projector_Glass' || mat.name === 'Turn_Signal_LED') {
              mat.emissive = new THREE.Color(C.headlightOff);
              mat.emissiveIntensity = 0;
              headlightMeshes.push(node);
            } else if (mat.name === 'Glass_Gray') {
              mat.transparent = true;
              mat.opacity = 0.45;
              mat.roughness = 0.12;
              mat.metalness = 0.85;
              windshieldMesh = node;
            } else if (mat.name.includes('Leather')) {
              mat.color.set(0x1a191d);
              mat.roughness = 0.65;
            } else if (mat.name.includes('Carbon')) {
              mat.color.set(0x121316);
              mat.roughness = 0.28;
              mat.metalness = 0.7;
            } else if (mat.name.includes('chrome') || mat.name.includes('metal')) {
              mat.metalness = 0.95;
              mat.roughness = 0.18;
            }
          }
        }
      });

      // Retrieve wheels
      const wheelNames = ['wheel_fl', 'wheel_fr', 'wheel_rl', 'wheel_rr'];
      wheelNames.forEach(name => {
        const w = carModel.getObjectByName(name);
        if (w) wheels.push(w);
      });

      // Retrieve steering wheel & mount ASV logo on center hub
      steeringWheel = carModel.getObjectByName('steering_wheel');
      steeringCentre = carModel.getObjectByName('steering_centre');

      if (steeringCentre && badgeTexture) {
        // Deep obsidian base for steering_centre
        steeringCentre.material = new THREE.MeshStandardMaterial({
          color: 0x14161c,
          roughness: 0.5,
          metalness: 0.3
        });

        // Dedicated planar disc aligned with steering_centre X-Z plane, facing outwards (-Y)
        const hubDiscGeo = new THREE.CircleGeometry(0.021, 48);
        hubDiscGeo.rotateX(Math.PI / 2); // Align with X-Z plane, normal facing -Y
        const hubDiscMat = new THREE.MeshBasicMaterial({
          map: badgeTexture,
          transparent: true,
          side: THREE.DoubleSide,
          depthTest: true
        });
        const hubDisc = new THREE.Mesh(hubDiscGeo, hubDiscMat);
        hubDisc.position.set(0, -0.0016, 0); // Position slightly in front along normal (-Y)
        steeringCentre.add(hubDisc);
      }

      // Twin spotlights
      const spotTarget = new THREE.Object3D();
      spotTarget.position.set(0, 0.2, 8.0);
      scene.add(spotTarget);

      spotLeft = new THREE.SpotLight(C.headlightWarm, 0, 16, Math.PI / 7, 0.5, 1.2);
      spotLeft.position.set(-0.65, 0.62, 0.45);
      spotLeft.target = spotTarget;
      carModel.add(spotLeft);

      spotRight = new THREE.SpotLight(C.headlightWarm, 0, 16, Math.PI / 7, 0.5, 1.2);
      spotRight.position.set(0.65, 0.62, 0.45);
      spotRight.target = spotTarget;
      carModel.add(spotRight);

      if (preloader) preloader.classList.add('hidden');
    } catch (err) {
      console.warn('3D Car asset failed, executing direct graceful reveal:', err);
      if (preloader) preloader.classList.add('hidden');
      asvHeroLogo.classList.add('center-active');
      await wait(1800);
      asvHeroLogo.classList.add('glide-to-nav');
      overlay.style.background = 'transparent';
      await wait(1000);
      finish();
      return;
    }

    if (bail()) return;

    // ═══════════════════════════════════════════════════════════
    // STAGE 1 — CINEMATIC CAR ENTRANCE & SMOOTH DECELERATION
    // ═══════════════════════════════════════════════════════════
    const startZ = -36.0;
    const stopZ = -1.8;
    const wheelRadius = 0.358;
    const baseRotX = wheels.map(w => w.rotation.x);

    await animateTime(2800, t => {
      if (bail()) return;
      const p = ease.outCubic(t);
      const currZ = lerp(startZ, stopZ, p);
      carModel.position.z = currZ;

      const dist = currZ - startZ;
      const angle = -dist / wheelRadius;
      wheels.forEach((w, i) => {
        w.rotation.x = baseRotX[i] + angle;
      });

      const pitchDip = Math.sin(t * Math.PI) * (1 - t) * 0.018;
      carModel.rotation.x = pitchDip;
    });
    if (bail()) return;

    carModel.position.z = stopZ;
    carModel.rotation.x = 0;

    // ═══════════════════════════════════════════════════════════
    // STAGE 2 — PROGRESSIVE HEADLIGHT REVEAL & BRAND HUD
    // ═══════════════════════════════════════════════════════════
    await wait(180);
    if (bail()) return;

    headlightGlow.classList.add('active');
    if (telemetryHud) telemetryHud.classList.add('active');

    await animateTime(1000, t => {
      if (bail()) return;
      const p = ease.outQuad(t);

      const emissiveColor = new THREE.Color().lerpColors(
        new THREE.Color(C.headlightWarm),
        new THREE.Color(C.headlightWhite),
        p
      );
      const intensity = lerp(0, 2.4, p);

      headlightMeshes.forEach(mesh => {
        mesh.material.emissive.copy(emissiveColor);
        mesh.material.emissiveIntensity = intensity;
      });

      if (spotLeft && spotRight) {
        spotLeft.color.copy(emissiveColor);
        spotRight.color.copy(emissiveColor);
        spotLeft.intensity = lerp(0, 3.2, p);
        spotRight.intensity = lerp(0, 3.2, p);
      }
    });
    if (bail()) return;

    await wait(600);
    if (bail()) return;

    // Fade brand HUD before cockpit push-in
    if (telemetryHud) telemetryHud.classList.remove('active');

    // ═══════════════════════════════════════════════════════════
    // STAGE 3 — CAMERA PUSH-IN THROUGH WINDSHIELD TO STEERING WHEEL
    // ═══════════════════════════════════════════════════════════
    const camSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.95, 3.2),
      new THREE.Vector3(0.18, 1.05, 0.8),
      new THREE.Vector3(0.28, 1.08, -0.4),
      new THREE.Vector3(0.346, 1.05, -1.25),
      new THREE.Vector3(0.346, 0.932, -1.853) // Perfectly aligned driver POV facing steering hub
    ]);

    const lookSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.65, 0),
      new THREE.Vector3(0.18, 0.72, -0.6),
      new THREE.Vector3(0.346, 0.799, -1.454) // Focused dead-center on steering hub
    ]);

    await animateTime(2200, t => {
      if (bail()) return;
      const p = ease.inOutCubic(t);

      const camPt = camSpline.getPoint(p);
      const lookPt = lookSpline.getPoint(p);

      camera.position.copy(camPt);
      camera.lookAt(lookPt);

      if (windshieldMesh) {
        if (p > 0.35 && p <= 0.8) {
          windshieldMesh.material.opacity = lerp(0.45, 0.04, (p - 0.35) / 0.45);
        } else if (p > 0.8) {
          windshieldMesh.visible = false;
        }
      }

      cockpitLight.intensity = lerp(0, 2.6, p);

      if (p > 0.5) {
        headlightGlow.style.opacity = (1 - (p - 0.5) / 0.5).toFixed(2);
      }
    });
    if (bail()) return;

    headlightGlow.classList.remove('active');

    // ═══════════════════════════════════════════════════════════
    // STAGE 4 — FAST STEERING WHEEL SPIN & CAMERA TIGHT ZOOM
    // ═══════════════════════════════════════════════════════════
    await wait(150);
    if (bail()) return;

    const columnAxis = new THREE.Vector3(0, 1, 0);
    let prevAngle = 0;

    const camZoomStart = new THREE.Vector3(0.346, 0.932, -1.853);
    const camZoomEnd = new THREE.Vector3(0.346, 0.840, -1.56);
    const lookTarget = new THREE.Vector3(0.346, 0.799, -1.454);

    const totalRotations = 4;
    const spinDuration = 1500;

    await animateTime(spinDuration, t => {
      if (bail()) return;
      const p = ease.inOutCubic(t);

      const totalAngle = p * Math.PI * 2 * totalRotations;
      const deltaAngle = totalAngle - prevAngle;
      prevAngle = totalAngle;

      if (steeringWheel) {
        steeringWheel.rotateOnAxis(columnAxis, deltaAngle);
      }

      camera.position.lerpVectors(camZoomStart, camZoomEnd, ease.outQuad(t));
      camera.lookAt(lookTarget);

      camera.fov = lerp(45, 20, ease.outQuad(t));
      camera.updateProjectionMatrix();

      cockpitLight.intensity = lerp(2.6, 4.8, p);
    });
    if (bail()) return;

    // ═══════════════════════════════════════════════════════════
    // STAGE 5 — PURE LOGO HOLD (CLEAN CENTERED EMBLEM)
    // ─────────────────────────────────────────────────────────────────────────
    canvas.style.opacity = '0';
    overlay.style.background = '#08090c';

    const navLogo = document.querySelector('.brand-logo');
    if (navLogo) navLogo.style.opacity = '0';

    // Ensure page scroll is at top so calculations are exact
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Calculate exact start centered bounds
    const startW = window.innerWidth <= 680 ? 160 : 220;
    const startH = Math.round(startW * (130 / 220));
    const startX = Math.round((window.innerWidth - startW) / 2);
    const startY = Math.round((window.innerHeight - startH) / 2);

    asvHeroLogo.style.position = 'fixed';
    asvHeroLogo.style.left = startX + 'px';
    asvHeroLogo.style.top = startY + 'px';
    asvHeroLogo.style.width = startW + 'px';
    asvHeroLogo.style.height = startH + 'px';
    asvHeroLogo.style.transform = 'none';
    asvHeroLogo.style.opacity = '0';
    asvHeroLogo.style.filter = 'brightness(0) invert(1) drop-shadow(0 0 32px rgba(196, 163, 90, 0.95)) drop-shadow(0 14px 40px rgba(0, 0, 0, 0.95))';

    await wait(80);
    if (bail()) return;

    asvHeroLogo.style.transition = 'opacity 0.6s ease';
    asvHeroLogo.style.opacity = '1';

    // Hold centered logo for 1.8 seconds (no text, no ring)
    await wait(1800);
    if (bail()) return;

    // ─────────────────────────────────────────────────────────────────────────
    // STAGE 6 — SMOOTH LOGO-TO-NEXT-PAGE TRANSITION (ZERO-GLITCH WAAPI)
    // ─────────────────────────────────────────────────────────────────────────
    // Dissolve dark backdrop so homepage emerges underneath
    overlay.style.transition = 'background 1.05s cubic-bezier(0.16, 1, 0.3, 1)';
    overlay.style.background = 'rgba(8, 9, 12, 0)';

    const targetRect = navLogo ? navLogo.getBoundingClientRect() : null;
    const endX = targetRect ? Math.round(targetRect.left) : (window.innerWidth <= 680 ? 24 : 48);
    const endY = targetRect ? Math.round(targetRect.top) : 24;
    const endW = targetRect ? Math.round(targetRect.width) : 48;
    const endH = targetRect ? Math.round(targetRect.height) : 36;

    asvHeroLogo.style.transition = 'none';
    const anim = asvHeroLogo.animate([
      {
        left: startX + 'px',
        top: startY + 'px',
        width: startW + 'px',
        height: startH + 'px',
        filter: 'brightness(0) invert(1) drop-shadow(0 0 32px rgba(196, 163, 90, 0.95)) drop-shadow(0 14px 40px rgba(0, 0, 0, 0.95))',
        opacity: 1
      },
      {
        left: endX + 'px',
        top: endY + 'px',
        width: endW + 'px',
        height: endH + 'px',
        filter: 'brightness(1) invert(0) drop-shadow(0 0 0px rgba(0, 0, 0, 0))',
        opacity: 1
      }
    ], {
      duration: 1050,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards'
    });

    try {
      await anim.finished;
    } catch (_) {}

    if (bail()) return;

    if (navLogo) navLogo.style.opacity = '1';
    asvHeroLogo.style.opacity = '0';

    // Conclude intro cleanly
    finish();
  }

  // ── Public API ─────────────────────────────────────────────
  window._triggerAsvIntro = function(force = false) {
    runCinematicIntro(force);
  };
  window.replayAsvIntro = function () {
    const ALL_INTRO_KEYS = [
      'asv_cinematic_car_intro_v1',
      'asv_cinematic_story_intro_v9',
      'asv_cinematic_story_intro_v8',
      'asv_cinematic_story_intro_v7',
      'asv_cinematic_story_intro_v6',
      'asv_cinematic_story_intro_v5',
      'asv_cinematic_story_intro_v4',
      'asv_cinematic_story_intro_v3',
      'asv_spider_intro_seen_v1',
      'asv_intro_completed'
    ];
    ALL_INTRO_KEYS.forEach(k => {
      try {
        sessionStorage.removeItem(k);
        localStorage.removeItem(k);
      } catch (_) {}
    });
    sessionStorage.setItem('asv_force_replay', '1');

    if (isHomePage) {
      runCinematicIntro(true);
    } else {
      window.location.href = 'index.html?replay=1';
    }
  };

  if (isHomePage) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => runCinematicIntro(false));
    } else {
      runCinematicIntro(false);
    }
  }
})();
