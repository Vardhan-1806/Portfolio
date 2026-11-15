const fs = require('fs');
const path = require('path');

const contactPath = path.join(__dirname, 'contact.html');
let html = fs.readFileSync(contactPath, 'utf8');

const target = `<div class="form-field">
            <label class="form-label" for="msgSubject">Subject</label>
            <input class="form-input" type="text" id="msgSubject" name="subject" placeholder="Internship Opportunity / Project Inquiry" required/>
          </div>`;

const replacement = `<div class="form-field">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
              <label class="form-label" for="msgSubject" style="margin-bottom: 0;">Subject</label>
              <span style="font-family: var(--mono); font-size: 11px; color: var(--ink3);">Select quick preset:</span>
            </div>
            <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px;" id="subjectPresets">
              <button type="button" class="tech-pill" style="padding: 4px 12px; font-size: 11px;" data-subject="Software Engineering Internship Inquiry">💼 Internship</button>
              <button type="button" class="tech-pill" style="padding: 4px 12px; font-size: 11px;" data-subject="Full-Stack / RAG Project Collaboration">🚀 Project Collab</button>
              <button type="button" class="tech-pill" style="padding: 4px 12px; font-size: 11px;" data-subject="Technical Discussion / Systems Architecture">☕ Tech Chat</button>
            </div>
            <input class="form-input" type="text" id="msgSubject" name="subject" placeholder="Internship Opportunity / Project Inquiry" required/>
          </div>`;

if (html.includes(target)) {
  html = html.replace(target, replacement);

  // Add event listener for presets in the script
  const scriptTarget = "document.getElementById('contactMsgForm')?.addEventListener('submit'";
  const scriptAddition = `
  // Quick Subject Presets
  document.querySelectorAll('#subjectPresets button').forEach(btn => {
    btn.addEventListener('click', () => {
      const subjectInput = document.getElementById('msgSubject');
      if (subjectInput) {
        subjectInput.value = btn.getAttribute('data-subject');
        subjectInput.focus();
      }
    });
  });

  ` + scriptTarget;

  html = html.replace(scriptTarget, scriptAddition);
  fs.writeFileSync(contactPath, html, 'utf8');
  console.log('Successfully enhanced contact.html with quick subject presets!');
} else {
  console.log('Target block not found in contact.html');
}
