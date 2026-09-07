import React from 'react';

function Projects() {
  const handleLiveDemo = (e) => {
    e.preventDefault();
    alert('Live Demo link placeholder: The actual URL will be updated soon.');
  };

  return (
    <section id="projects" className="section-container">
      <div className="section-header">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Academic and software development project</p>
      </div>

      <div className="projects-container">
        <div className="project-card">
          <span className="project-badge">Academic Project</span>
          <h3 className="project-title">Teacher Period Assistant</h3>
          
          <p className="project-desc">
            Teacher Period Assistant is a software project designed to help teachers manage and organize their academic periods and daily schedules more efficiently.
          </p>

          <div className="project-tech-stack">
            <span className="tech-tag">React</span>
            <span className="tech-tag">JavaScript</span>
            <span className="tech-tag">HTML</span>
            <span className="tech-tag">CSS</span>
            <span className="tech-tag">Node.js</span>
            <span className="tech-tag">Express.js</span>
          </div>

          <div className="project-actions">
            <button 
              className="btn-primary" 
              onClick={handleLiveDemo}
            >
              Live Demo ↗
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
