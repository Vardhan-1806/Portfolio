// Shared 3D Layered Deck Showcase Controller
(function() {
  'use strict';

  function initDeck() {
    const panels = Array.from(document.querySelectorAll('.deck-panel'));
    const prevBtn = document.getElementById('deckPrevBtn');
    const nextBtn = document.getElementById('deckNextBtn');
    const counter = document.getElementById('deckCounter');
    const jumpBtns = Array.from(document.querySelectorAll('[data-deck-jump]'));

    if (!panels.length) return;

    let total = panels.length;
    let savedIdx = parseInt(sessionStorage.getItem('asv_deck_active_idx'), 10);
    let current = !isNaN(savedIdx) && savedIdx >= 0 && savedIdx < total ? savedIdx : 0;

    // Check if URL hash specifies a project
    const hash = (window.location.hash || '').replace('#', '').toLowerCase();
    if (hash) {
      const hashIdx = panels.findIndex(p => p.getAttribute('data-id') === hash);
      if (hashIdx !== -1) current = hashIdx;
    }

    function updateDeck(newIdx) {
      current = (newIdx + total) % total;
      sessionStorage.setItem('asv_deck_active_idx', current);

      panels.forEach((panel, i) => {
        panel.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden');
        if (i === current) {
          panel.classList.add('is-active');
          panel.setAttribute('aria-hidden', 'false');
        } else if (i === (current - 1 + total) % total) {
          panel.classList.add('is-prev');
          panel.setAttribute('aria-hidden', 'true');
        } else if (i === (current + 1) % total) {
          panel.classList.add('is-next');
          panel.setAttribute('aria-hidden', 'true');
        } else {
          panel.classList.add('is-hidden');
          panel.setAttribute('aria-hidden', 'true');
        }
      });

      if (counter) {
        counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
      }

      jumpBtns.forEach((btn) => {
        const jumpIdx = parseInt(btn.getAttribute('data-deck-jump'), 10);
        btn.classList.toggle('active', jumpIdx === current);
        btn.setAttribute('aria-selected', jumpIdx === current ? 'true' : 'false');
      });
    }

    // Direct clicks on panels
    panels.forEach((p, idx) => {
      p.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return; // Allow normal link/button clicks
        if (idx !== current) {
          e.preventDefault();
          updateDeck(idx);
        }
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => updateDeck(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateDeck(current + 1));

    jumpBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = parseInt(btn.getAttribute('data-deck-jump'), 10);
        if (!isNaN(target)) updateDeck(target);
      });
    });

    // Keyboard arrow navigation when in view
    document.addEventListener('keydown', (e) => {
      const stage = document.getElementById('deckStage');
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        updateDeck(current + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        updateDeck(current - 1);
      }
    });

    // Touch / Pointer Swipe Support
    let startX = 0;
    let isSwiping = false;
    const stage = document.getElementById('deckStage');
    if (stage) {
      stage.addEventListener('pointerdown', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        startX = e.clientX;
        isSwiping = true;
      });
      stage.addEventListener('pointerup', (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        const diffX = e.clientX - startX;
        if (diffX < -50) updateDeck(current + 1);
        else if (diffX > 50) updateDeck(current - 1);
      });
    }

    updateDeck(current);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDeck);
  } else {
    initDeck();
  }
})();
