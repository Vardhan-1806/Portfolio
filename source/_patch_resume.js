const fs = require('fs');
const path = require('path');

const resumePath = path.join(__dirname, 'resume.html');
let html = fs.readFileSync(resumePath, 'utf8');

// Replace the viewer section with the enhanced 3D document card & 3 explicit actions
const startMarker = '<!-- RESUME VIEWER SECTION -->';
const endMarker = '<!-- Fullscreen Resume Modal -->';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not locate markers in resume.html');
  process.exit(1);
}

const newResumeContent = `<!-- RESUME VIEWER SECTION: 3D DOCUMENT EXPERIENCE -->
<section class="sec">
  <div class="wrap">
    
    <!-- 3 Action Control Strip at top of resume section -->
    <div class="rv" style="margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 18px 24px; box-shadow: 0 4px 18px rgba(0,0,0,0.03);">
      <div>
        <div style="font-family: var(--mono); font-size: 11px; color: var(--olive); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">
          Official Verified Curriculum Vitae
        </div>
        <div style="font-family: var(--serif); font-size: 20px; font-weight: 700; color: var(--ink);">
          Alisam Srivardhan &middot; B.Tech CSE Class of 2028
        </div>
      </div>

      <!-- 3 Explicit Required Actions -->
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <!-- Action 1: Explore Resume -->
        <button
          type="button"
          class="btn-primary"
          id="fullscreenPreviewBtn"
          style="gap: 8px; cursor: pointer; padding: 10px 20px;"
          title="Open interactive fullscreen resume reader"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
          Explore Resume
        </button>

        <!-- Action 2: Download PDF -->
        <a
          href="resume.pdf"
          download="Alisam_Srivardhan_Resume.pdf"
          class="btn-outline"
          id="downloadResumeBtn"
          style="gap: 8px; text-decoration: none; padding: 10px 20px;"
          title="Direct download of official PDF"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2v8M5 7l3 3 3-3M2 11v1a2 2 0 002 2h8a2 2 0 002-2v-1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Download PDF
        </a>

        <!-- Action 3: Contact Me -->
        <a
          href="contact.html"
          class="btn-ghost"
          style="gap: 6px; text-decoration: none; font-weight: 600; padding: 10px 16px;"
          title="Navigate directly to contact section"
        >
          Contact Me &rarr;
        </a>
      </div>
    </div>

    <div class="resume-layout">
      <!-- Left Column: Honest Verified Credentials -->
      <div class="rv">
        <div class="resume-sidebar-card">
          <div class="rm-row">
            <span class="rm-label">Candidate Name</span>
            <span class="rm-val" style="font-weight: 700; font-family: var(--serif); font-size: 16px;">Alisam Srivardhan</span>
          </div>
          <div class="rm-row">
            <span class="rm-label">Academic Program</span>
            <span class="rm-val">B.Tech in Computer Science and Engineering</span>
          </div>
          <div class="rm-row">
            <span class="rm-label">Institution</span>
            <span class="rm-val">BVRIT Narsapur, Hyderabad (2024–2028)</span>
          </div>
          <div class="rm-row">
            <span class="rm-label">Academic Merit</span>
            <span class="rm-val" style="color: var(--olive); font-weight: 700;">8.88 CGPA / 10.0</span>
          </div>
          <div class="rm-row">
            <span class="rm-label">Industry Internship</span>
            <span class="rm-val">Front-End Development Intern @ Varzo (Feb–Mar 2026)</span>
          </div>
          <div class="rm-row">
            <span class="rm-label">Core Specializations</span>
            <span class="rm-val" style="font-size: 12.5px; line-height: 1.55;">
              Data Structures &amp; Algorithms, RAG AI Systems, Full-Stack MERN (React, Node, Express, MongoDB), Spring Boot, PostgreSQL
            </span>
          </div>
          <div class="rm-row">
            <span class="rm-label">Competitive Programming</span>
            <span class="rm-val" style="font-size: 12.5px;">
              319+ LeetCode Problems Solved · 1,454 Contest Rating · 100 Days Badge · CodeChef 1,036★
            </span>
          </div>
          <div class="rm-row">
            <span class="rm-label">Direct Correspondence</span>
            <span class="rm-val" style="font-family: var(--mono); font-size: 12px; word-break: break-all;">
              alisamsrivardhan72@gmail.com
            </span>
          </div>
          <div class="rm-row">
            <span class="rm-label">Status</span>
            <span class="rm-val" style="color: var(--olive); font-weight: 600;">
              ● Available for Engineering Internships (Remote &amp; On-site)
            </span>
          </div>
        </div>

        <!-- Verified Badges & Certifications Quick Card -->
        <div class="resume-sidebar-card" style="margin-top: 16px;">
          <div style="font-family: var(--mono); font-size: 11px; color: var(--olive); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
            Verified Technical Accreditations
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12.5px; color: var(--ink2);">
            <div>🏆 <strong>LeetCode:</strong> 100 Days Badge 2026 · 50 Days Streak · 319 Problems Solved</div>
            <div>⚡ <strong>CodeChef:</strong> 1,036★ (Div 4) · 4 Official Contests</div>
            <div>📜 <strong>NPTEL / IIT Bombay:</strong> Programming in Java (Elite)</div>
            <div>☁️ <strong>AWS:</strong> Cloud Practitioner Essentials</div>
            <div>💼 <strong>Varzo:</strong> Front-End Development Internship Certificate</div>
          </div>
          <div style="margin-top: 14px;">
            <a href="certifications.html" class="btn-ghost" style="padding: 4px 0; font-size: 12.5px;">
              View Verified Credential Proofs &rarr;
            </a>
          </div>
        </div>
      </div>

      <!-- Right Column: Interactive 3D Document Sheet -->
      <div class="rv d1">
        <div class="resume-3d-card" id="resume3dCard">
          <div class="resume-3d-inner resume-embed-container" style="box-shadow: 0 16px 48px rgba(0,0,0,0.18); border: 1.5px solid var(--border);">
            <div class="resume-embed-header">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 9px; height: 9px; border-radius: 50%; background: var(--olive);"></span>
                <span style="font-family: var(--mono); font-size: 12px; color: var(--ink); font-weight: 600;">
                  Alisam_Srivardhan_Resume.pdf
                </span>
              </div>
              <div style="display: flex; gap: 14px; align-items: center;">
                <button type="button" onclick="document.getElementById('fullscreenPreviewBtn').click()" style="background:none; border:none; font-family: var(--mono); font-size: 11.5px; color: var(--ink2); cursor:pointer;">⤢ Fullscreen</button>
                <a href="resume.pdf" download="Alisam_Srivardhan_Resume.pdf" style="font-family: var(--mono); font-size: 11.5px; color: var(--olive); font-weight: 600; text-decoration: none;">&darr; Save File</a>
              </div>
            </div>

            <!-- Embedded PDF Document -->
            <object
              data="resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
              type="application/pdf"
              class="resume-pdf-frame"
              id="resumePdfObject"
              aria-label="Alisam Srivardhan Resume Document"
            >
              <div style="padding: 60px 24px; text-align: center;">
                <p style="font-size: 15px; color: var(--ink2); margin-bottom: 20px;">
                  Browser PDF preview is not enabled. View or download the verified resume directly:
                </p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                  <a href="resume.pdf" download="Alisam_Srivardhan_Resume.pdf" class="btn-primary">
                    Download PDF Document &darr;
                  </a>
                  <a href="contact.html" class="btn-outline">
                    Contact Me &rarr;
                  </a>
                </div>
              </div>
            </object>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const updatedHtml = html.substring(0, startIndex) + newResumeContent + '\n' + html.substring(endIndex);

fs.writeFileSync(resumePath, updatedHtml, 'utf8');
console.log('Successfully updated resume.html with 3D document card & 3 explicit actions!');
