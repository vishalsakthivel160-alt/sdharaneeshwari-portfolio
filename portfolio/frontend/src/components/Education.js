import React from 'react';

function Education() {
  return (
    <section id="education" className="section-container">
      <div className="section-header reveal-on-scroll">
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">Academic background and pursuing degree</p>
      </div>

      <div className="education-card reveal-on-scroll delay-1">
        <div className="edu-header">
          <div>
            <h3 className="edu-degree">Computer Science Engineering</h3>
            <div className="edu-college">Christian College of Engineering and Technology</div>
          </div>
          <span className="edu-duration">2025 – 2029</span>
        </div>

        <div className="edu-location">
          📍 Dindigul, Tamil Nadu, India
        </div>

        <div className="edu-status">
          Status: Currently Pursuing
        </div>
      </div>
    </section>
  );
}

export default Education;
