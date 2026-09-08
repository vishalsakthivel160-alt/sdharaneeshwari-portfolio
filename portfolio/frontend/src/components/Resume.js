import React from 'react';

function Resume() {
  return (
    <section id="resume" className="section-container">
      <div className="resume-card reveal-on-scroll">
        <h2 className="section-title resume-title">Resume</h2>
        <p className="resume-text">
          Download my resume to learn more about my education, skills and experience.
        </p>

        <div className="resume-buttons">
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary"
          >
            👁️ View Resume
          </a>

          <a 
            href="/resume.pdf" 
            download="S_Dharaneeshwari_Resume.pdf"
            className="btn-secondary"
          >
            📥 Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}

export default Resume;
