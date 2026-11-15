// Interactive 3D Universe Tilt and 2D Physics Sandbox for Alisam Srivardhan Portfolio
(function() {
  'use strict';

  // --- 1. Mode Switcher & Category Filtering ---
  function initTechViewControls() {
    const universeView = document.getElementById('techUniverseView');
    const sandboxView = document.getElementById('techSandboxView');
    const btnUniverse = document.getElementById('btnModeUniverse');
    const btnSandbox = document.getElementById('btnModeSandbox');
    const categoryPillsWrapper = document.getElementById('techCategoryPills');
    const catPills = document.querySelectorAll('.tech-category-pills .tech-pill');
    const catBlocks = document.querySelectorAll('.tech-cat-block');

    if (!universeView || !btnUniverse || !btnSandbox) return;

    btnUniverse.addEventListener('click', () => {
      btnUniverse.classList.add('is-active');
      btnSandbox.classList.remove('is-active');
      universeView.style.display = 'block';
      sandboxView.style.display = 'none';
      if (categoryPillsWrapper) categoryPillsWrapper.style.display = 'flex';
    });

    btnSandbox.addEventListener('click', () => {
      btnSandbox.classList.add('is-active');
      btnUniverse.classList.remove('is-active');
      universeView.style.display = 'none';
      sandboxView.style.display = 'block';
      if (categoryPillsWrapper) categoryPillsWrapper.style.display = 'none';
      // Trigger canvas setup & drop
      if (window.triggerSandboxDrop) {
        window.triggerSandboxDrop();
      }
    });

    // Category Filtering
    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.getAttribute('data-cat');

        catBlocks.forEach(block => {
          const blockCat = block.getAttribute('data-category');
          if (filter === 'all' || filter === blockCat) {
            block.style.display = 'block';
          } else {
            block.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 2. 3D Tilt Parallax on Universe Tiles ---
  function initUniverseTilt() {
    const tiles = document.querySelectorAll('.tech-3d-tile');
    if (!tiles.length) return;

    tiles.forEach(tile => {
      const inner = tile.querySelector('.tech-tile-inner');
      const glare = tile.querySelector('.tech-tile-glare');
      if (!inner) return;

      tile.addEventListener('mousemove', (e) => {
        const rect = tile.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((centerY - y) / centerY) * 12; // max 12 deg
        const rotateY = ((x - centerX) / centerX) * 12;

        inner.style.transform = `perspective(700px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
        
        if (glare) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          glare.style.opacity = '1';
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, transparent 65%)`;
        }
      });

      tile.addEventListener('mouseleave', () => {
        inner.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        inner.style.transition = 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)';
        if (glare) {
          glare.style.opacity = '0';
          glare.style.transition = 'opacity 0.4s ease';
        }
      });

      tile.addEventListener('mouseenter', () => {
        inner.style.transition = 'none';
        if (glare) glare.style.transition = 'none';
      });
    });
  }

  // --- 3. Interactive Physics Sandbox Engine (Screenshot 3 style) ---
  function initPhysicsSandbox() {
    const canvas = document.getElementById('sandboxCanvas');
    const container = document.getElementById('sandboxCanvasWrapper');
    const resetBtn = document.getElementById('sandboxResetBtn');
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let width = container.clientWidth || 800;
    let height = 480;
    const dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
      width = container.clientWidth || 800;
      height = Math.min(520, Math.max(380, window.innerHeight * 0.45));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // List of tech badges to drop in sandbox
    const BADGES_CONFIG = [
      { text: 'Java', bg: '#2b221a', border: '#e76f00', fg: '#f5a623' },
      { text: 'JavaScript', bg: '#292614', border: '#f7df1e', fg: '#f7df1e' },
      { text: 'Python', bg: '#1c2633', border: '#3776ab', fg: '#4ba2e6' },
      { text: 'React.js', bg: '#162730', border: '#61dafb', fg: '#61dafb' },
      { text: 'Node.js', bg: '#1c2b1c', border: '#339933', fg: '#5cd65c' },
      { text: 'Express.js', bg: '#222222', border: '#666666', fg: '#e0e0e0' },
      { text: 'Spring Boot', bg: '#1d2b18', border: '#6db33f', fg: '#88dd55' },
      { text: 'MongoDB', bg: '#19261a', border: '#47a248', fg: '#5beb5d' },
      { text: 'PostgreSQL', bg: '#1a2430', border: '#336791', fg: '#5496d1' },
      { text: 'SQL', bg: '#16282e', border: '#00758f', fg: '#26c2e8' },
      { text: 'HTML5 / CSS3', bg: '#2e1c17', border: '#e34f26', fg: '#ff7043' },
      { text: 'Git', bg: '#2b1b16', border: '#f05032', fg: '#ff704d' },
      { text: 'GitHub', bg: '#22252a', border: '#555555', fg: '#ffffff' },
      { text: 'Docker', bg: '#172738', border: '#2496ed', fg: '#47b0ff' },
      { text: 'AWS Cloud', bg: '#2b2114', border: '#ff9900', fg: '#ffb84d' },
      { text: 'RAG Systems', bg: '#251a36', border: '#7c3aed', fg: '#b794f6' },
      { text: 'LLMs', bg: '#1a2238', border: '#2563eb', fg: '#60a5fa' },
      { text: 'AI Agents', bg: '#172922', border: '#059669', fg: '#34d399' }
    ];

    class BadgeBody {
      constructor(cfg, x, y) {
        this.text = cfg.text;
        this.bg = cfg.bg;
        this.border = cfg.border;
        this.fg = cfg.fg;

        ctx.font = '600 13px "DM Sans", sans-serif';
        const txtWidth = ctx.measureText(this.text).width;
        this.w = Math.max(88, txtWidth + 34);
        this.h = 36;
        this.radius = 18;

        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = Math.random() * 2;
        this.angle = (Math.random() - 0.5) * 0.4;
        this.va = (Math.random() - 0.5) * 0.05;

        this.mass = this.w * this.h;
        this.restitution = 0.42;
        this.friction = 0.985;
      }

      update() {
        if (this === draggedBadge) return;

        // Gravity
        this.vy += 0.38;

        // Drag/friction
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.va *= 0.96;

        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.va;

        // Boundaries
        const halfW = this.w / 2;
        const halfH = this.h / 2;

        // Floor
        if (this.y + halfH > height - 10) {
          this.y = height - 10 - halfH;
          this.vy = -this.vy * this.restitution;
          this.vx *= 0.88; // floor friction
          this.va *= 0.85;
          if (Math.abs(this.vy) < 0.25) this.vy = 0;
        }

        // Ceiling
        if (this.y - halfH < 10) {
          this.y = 10 + halfH;
          this.vy = Math.abs(this.vy) * this.restitution;
        }

        // Left wall
        if (this.x - halfW < 12) {
          this.x = 12 + halfW;
          this.vx = Math.abs(this.vx) * this.restitution;
        }

        // Right wall
        if (this.x + halfW > width - 12) {
          this.x = width - 12 - halfW;
          this.vx = -Math.abs(this.vx) * this.restitution;
        }
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.angle);

        const x = -this.w / 2;
        const y = -this.h / 2;
        const r = this.radius;

        // Shadow
        c.shadowColor = 'rgba(0,0,0,0.45)';
        c.shadowBlur = 12;
        c.shadowOffsetY = 4;

        // Pill path
        c.beginPath();
        c.moveTo(x + r, y);
        c.lineTo(x + this.w - r, y);
        c.arcTo(x + this.w, y, x + this.w, y + this.h, r);
        c.arcTo(x + this.w, y + this.h, x, y + this.h, r);
        c.arcTo(x, y + this.h, x, y, r);
        c.arcTo(x, y, x + this.w, y, r);
        c.closePath();

        c.fillStyle = this.bg;
        c.fill();

        // Stroke
        c.shadowColor = 'transparent';
        c.lineWidth = 1.4;
        c.strokeStyle = this.border;
        c.stroke();

        // Small indicator dot
        c.beginPath();
        c.arc(x + 15, 0, 3.5, 0, Math.PI * 2);
        c.fillStyle = this.border;
        c.fill();

        // Text
        c.font = '600 12.5px "DM Sans", -apple-system, sans-serif';
        c.fillStyle = this.fg;
        c.textAlign = 'left';
        c.textBaseline = 'middle';
        c.fillText(this.text, x + 25, 1);

        c.restore();
      }

      containsPoint(px, py) {
        // Transform point into badge local space
        const dx = px - this.x;
        const dy = py - this.y;
        const cos = Math.cos(-this.angle);
        const sin = Math.sin(-this.angle);
        const lx = dx * cos - dy * sin;
        const ly = dx * sin + dy * cos;

        return (
          lx >= -this.w / 2 &&
          lx <= this.w / 2 &&
          ly >= -this.h / 2 &&
          ly <= this.h / 2
        );
      }
    }

    let bodies = [];
    let draggedBadge = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseVx = 0;
    let mouseVy = 0;
    let animationFrameId = null;

    function spawnBadges() {
      bodies = [];
      const colCount = Math.min(6, Math.max(3, Math.floor(width / 140)));
      const colWidth = width / colCount;

      BADGES_CONFIG.forEach((cfg, idx) => {
        const col = idx % colCount;
        const row = Math.floor(idx / colCount);
        const x = colWidth * col + colWidth / 2 + (Math.random() - 0.5) * 40;
        const y = -60 - (row * 65) - (Math.random() * 40);
        bodies.push(new BadgeBody(cfg, x, y));
      });
    }

    // Inter-body collisions (circle approximation for smoothness)
    function resolveCollisions() {
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const b1 = bodies[i];
          const b2 = bodies[j];

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const distSq = dx * dx + dy * dy;
          const minDist = (b1.h + b2.h) * 0.85;

          if (distSq < minDist * minDist && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const overlap = (minDist - dist) * 0.5;

            const nx = dx / dist;
            const ny = dy / dist;

            // Separate
            if (b1 !== draggedBadge) {
              b1.x -= nx * overlap * 0.65;
              b1.y -= ny * overlap * 0.65;
            }
            if (b2 !== draggedBadge) {
              b2.x += nx * overlap * 0.65;
              b2.y += ny * overlap * 0.65;
            }

            // Relative velocity
            const kx = b1.vx - b2.vx;
            const ky = b1.vy - b2.vy;
            const p = 2 * (nx * kx + ny * ky) / (b1.mass + b2.mass);

            if (b1 !== draggedBadge) {
              b1.vx -= p * b2.mass * nx * 0.45;
              b1.vy -= p * b2.mass * ny * 0.45;
              b1.va += (Math.random() - 0.5) * 0.02;
            }
            if (b2 !== draggedBadge) {
              b2.vx += p * b1.mass * nx * 0.45;
              b2.vy += p * b1.mass * ny * 0.45;
              b2.va += (Math.random() - 0.5) * 0.02;
            }
          }
        }
      }
    }

    function renderLoop() {
      ctx.clearRect(0, 0, width, height);

      // Subtle background grid inside sandbox
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Physics update & collisions
      bodies.forEach(b => b.update());
      resolveCollisions();
      resolveCollisions(); // 2 solver passes for stability

      // Draw all bodies
      bodies.forEach(b => b.draw(ctx));

      animationFrameId = requestAnimationFrame(renderLoop);
    }

    // Pointer events for drag and toss
    function getPointerPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function onPointerDown(e) {
      const pos = getPointerPos(e);
      // Check from top-most badge to bottom
      for (let i = bodies.length - 1; i >= 0; i--) {
        const b = bodies[i];
        if (b.containsPoint(pos.x, pos.y)) {
          draggedBadge = b;
          dragOffsetX = pos.x - b.x;
          dragOffsetY = pos.y - b.y;
          lastMouseX = pos.x;
          lastMouseY = pos.y;
          // Bring to front
          bodies.splice(i, 1);
          bodies.push(b);
          canvas.style.cursor = 'grabbing';
          if (e.cancelable && e.type.startsWith('touch')) e.preventDefault();
          break;
        }
      }
    }

    function onPointerMove(e) {
      const pos = getPointerPos(e);
      if (draggedBadge) {
        mouseVx = pos.x - lastMouseX;
        mouseVy = pos.y - lastMouseY;
        lastMouseX = pos.x;
        lastMouseY = pos.y;

        draggedBadge.x = pos.x - dragOffsetX;
        draggedBadge.y = pos.y - dragOffsetY;
        draggedBadge.vx = mouseVx * 0.85;
        draggedBadge.vy = mouseVy * 0.85;
        draggedBadge.va = (mouseVx * 0.01);
      } else {
        let hover = false;
        for (let i = bodies.length - 1; i >= 0; i--) {
          if (bodies[i].containsPoint(pos.x, pos.y)) {
            hover = true;
            break;
          }
        }
        canvas.style.cursor = hover ? 'grab' : 'default';
      }
    }

    function onPointerUp() {
      if (draggedBadge) {
        draggedBadge.vx = mouseVx * 1.1;
        draggedBadge.vy = mouseVy * 1.1;
        draggedBadge = null;
        canvas.style.cursor = 'default';
      }
    }

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        resetBtn.classList.add('is-spinning');
        setTimeout(() => resetBtn.classList.remove('is-spinning'), 600);
        spawnBadges();
      });
    }

    window.triggerSandboxDrop = function() {
      resizeCanvas();
      spawnBadges();
    };

    spawnBadges();
    renderLoop();
  }

  // --- Document Ready Initializer ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTechViewControls();
      initUniverseTilt();
      initPhysicsSandbox();
    });
  } else {
    initTechViewControls();
    initUniverseTilt();
    initPhysicsSandbox();
  }
})();
