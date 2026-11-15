const fs = require('fs');
const path = require('path');

const universalFooterHtml = `<!-- UNIVERSAL PERSISTENT FOOTER -->
<footer>
  <div class="foot-inner">
    <div style="display: flex; flex-direction: column; gap: 6px;">
      <div class="foot-copy">
        Alisam Srivardhan &middot; <span class="current-year"></span> &middot; Software Engineer
      </div>
      <div style="display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 11.5px; color: var(--olive);">
        <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #47A248; box-shadow: 0 0 6px rgba(71,162,72,0.6);"></span>
        <span>Available for Software Engineering Internships &middot; Hyderabad / Remote</span>
      </div>
    </div>

    <!-- Persistent Verified Social & Coding Profiles -->
    <div class="persistent-foot-socials" aria-label="Professional and Coding Profiles">
      <a href="https://github.com/Vardhan-1806" target="_blank" rel="noopener" class="pfoot-link" title="GitHub Profile">
        <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        GitHub
      </a>
      <a href="https://linkedin.com/in/alisam-srivardhan-291124332" target="_blank" rel="noopener" class="pfoot-link" title="LinkedIn Profile">
        <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        LinkedIn
      </a>
      <a href="https://leetcode.com/u/Vardhann13/" target="_blank" rel="noopener" class="pfoot-link" title="LeetCode Profile">
        <svg viewBox="0 0 24 24"><path d="M13.48 2.34a1.37 1.37 0 0 0-1.94 0L5.7 8.18a4.42 4.42 0 0 0 0 6.24l4.44 4.44a4.42 4.42 0 0 0 6.24 0l2.02-2.02a1.37 1.37 0 1 0-1.94-1.94l-2.02 2.02a1.68 1.68 0 0 1-2.37 0l-4.44-4.44a1.68 1.68 0 0 1 0-2.37l5.84-5.84a1.37 1.37 0 0 0 0-1.93ZM9.36 14.5a1.37 1.37 0 0 0 0 2.74h8.9a1.37 1.37 0 0 0 0-2.74h-8.9Z"/></svg>
        LeetCode (319)
      </a>
      <a href="https://www.codechef.com/users/vardhann18" target="_blank" rel="noopener" class="pfoot-link" title="CodeChef Profile">
        <span style="font-size: 14px;">👨‍🍳</span>
        CodeChef (1036★)
      </a>
      <a href="https://instagram.com/vardhan_114_" target="_blank" rel="noopener" class="pfoot-link" title="Instagram Profile">
        <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
        Instagram
      </a>
      <a href="mailto:alisamsrivardhan72@gmail.com" class="pfoot-link" title="Direct Email">
        <span style="font-size: 13px;">✉️</span>
        Email
      </a>
    </div>

    <div class="foot-actions">
      <button onclick="window.replayAsvIntro()" class="foot-replay-btn" title="Replay Cinematic Intro">🎬 Replay Intro</button>
      <a href="#" class="foot-top">&uarr; Top</a>
    </div>
  </div>
</footer>`;

const targetFiles = [
  'index.html',
  'about.html',
  'projects.html',
  'project-lexassist.html',
  'project-travelmate.html',
  'project-socially.html',
  'project-algomotion.html',
  'project-detail.html',
  'coding.html',
  'certifications.html',
  'resume.html',
  'contact.html'
];

targetFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log('Skipping non-existent:', file);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Match existing footer
  const footerRegex = /<!--\s*(UNIVERSAL PERSISTENT )?FOOTER\s*-->[\s\S]*?<\/footer>|<footer>[\s\S]*?<\/footer>/i;
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, universalFooterHtml);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Synchronized footer in:', file);
  } else {
    console.warn('Could not find <footer> in:', file);
  }
});

console.log('Universal Persistent Footer sync complete.');
