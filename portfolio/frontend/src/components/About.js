import React from 'react';

function About() {
  return (
    <section id="about" className="section-container">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Get to know my background, passion, and availability</p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <p className="about-text">
            I am S. Dharaneeshwari, a Computer Science Engineering student at Christian College of Engineering and Technology, Dindigul. I am passionate about technology, programming, and developing practical solutions that can make everyday tasks easier and more efficient.
          </p>

          <div className="about-highlights">
            <div className="info-item">
              <span className="info-label">Status & Availability</span>
              <span className="info-value">Open for Freelancing</span>
            </div>

            <div className="info-item">
              <span className="info-label">Languages</span>
              <span className="info-value">Tamil, English</span>
            </div>

            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">Dindigul, Tamil Nadu, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
