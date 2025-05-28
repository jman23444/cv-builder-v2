import React from 'react';
import { useResume } from '../context/ResumeContext';

export default function ResumePreview() {
  const { resume } = useResume();
  const { generalInfo, educations, experiences, projects, skills } = resume;

  return (
    <div className="resume-preview__container">
      <div className="resume-preview__paper">
        {/* Header */}
        <div className="resume-preview__header">
          <h1 className="resume-preview__name">{generalInfo.name}</h1>
          <div className="resume-preview__contact">
            <span>{generalInfo.email}</span>
            <span> | </span>
            <span>{generalInfo.phone}</span>
            <span> | </span>
            <span>{generalInfo.location}</span>
          </div>
        </div>

        {/* Education */}
        <section className="resume-preview__section">
          <h2 className="resume-preview__section-title">EDUCATION</h2>
          {educations.map((edu, idx) => (
            <div className="resume-preview__edu-item" key={idx}>
              <div className="resume-preview__edu-row">
                <span className="resume-preview__edu-school">
                  <strong>{edu.school}</strong>
                </span>
                <span className="resume-preview__edu-dates">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              {edu.field && (
                <div className="resume-preview__edu-field">{edu.field}</div>
              )}
              <div className="resume-preview__edu-location">{edu.location}</div>
            </div>
          ))}
        </section>

        {/* Work Experience */}
        <section className="resume-preview__section">
          <h2 className="resume-preview__section-title">WORK EXPERIENCE</h2>
          {experiences.map((exp, idx) => (
            <div className="resume-preview__exp-item" key={idx}>
              <div className="resume-preview__exp-row">
                <span className="resume-preview__exp-company">
                  <strong>{exp.company}</strong>
                </span>
                <span className="resume-preview__exp-dates">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <div className="resume-preview__exp-role">{exp.role}</div>
              <div className="resume-preview__exp-location">{exp.location}</div>
              <div className="resume-preview__exp-desc">{exp.description}</div>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="resume-preview__section">
          <h2 className="resume-preview__section-title">MY PROJECTS</h2>
          {projects.map((proj, idx) => (
            <div className="resume-preview__proj-item" key={idx}>
              <div className="resume-preview__proj-name">
                <strong>{proj.name}</strong>
              </div>
              <div className="resume-preview__proj-desc">{proj.description}</div>
            </div>
          ))}
        </section>

        {/* Technical Skills */}
        <section className="resume-preview__section">
          <h2 className="resume-preview__section-title">TECHNICAL SKILLS</h2>
          <div className="resume-preview__skills">
            {skills.join(', ')}
          </div>
        </section>
      </div>
    </div>
  );
}