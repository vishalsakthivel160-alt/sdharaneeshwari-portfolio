import React from 'react';
import { skillsData } from '../data/skillsData';

function Skills() {
  return (
    <section id="skills" className="section-container">
      <div className="section-header">
        <h2 className="section-title">Skills & Capabilities</h2>
        <p className="section-subtitle">Core technical competencies and development tools</p>
      </div>

      <div className="skills-grid">
        {skillsData.map((categoryGroup, index) => (
          <div key={index} className="skill-category-card">
            <h3 className="skill-category-title">
              {categoryGroup.category}
            </h3>
            <div className="skill-tags">
              {categoryGroup.skills.map((skill, sIdx) => (
                <span key={sIdx} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
