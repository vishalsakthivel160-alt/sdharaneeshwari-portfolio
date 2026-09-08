import React, { useState } from 'react';

function Hero() {
  const [imgError, setImgError] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="status-badge reveal-on-scroll">
            <span className="status-dot"></span>
            <span>Open for Freelancing</span>
          </div>

          <p className="hero-greeting reveal-on-scroll delay-1">Hi, I'm S. Dharaneeshwari</p>
          <h1 className="hero-name reveal-on-scroll delay-1">S. Dharaneeshwari</h1>
          <h2 className="hero-title reveal-on-scroll delay-2">Computer Science Engineering Student</h2>
          
          <p className="hero-intro reveal-on-scroll delay-2">
            Passionate about technology, programming and building meaningful digital solutions.
          </p>

          <p className="hero-subintro reveal-on-scroll delay-3">
            Dedicated to developing clean, efficient web applications and expanding my software engineering expertise.
          </p>

          <div className="hero-buttons reveal-on-scroll delay-3">
            <button 
              className="btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              View My Project →
            </button>
            <button 
              className="btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </button>
          </div>
        </div>

        <div className="profile-photo-wrapper reveal-on-scroll delay-2">
          {!imgError ? (
            <img 
              src="/profile.jpg" 
              alt="S. Dharaneeshwari" 
              className="profile-photo"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="profile-avatar-fallback" title="S. Dharaneeshwari">
              SD
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
