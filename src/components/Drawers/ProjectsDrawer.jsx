import React, { useState, useEffect } from 'react';
import leftChevron from '../../assets/icons/left_chevron.svg';
import normalChevron from '../../assets/icons/normal_chevron.svg';
import { useResume } from '../../context/ResumeContext';

const emptyProject = {
  name: '',
  description: '',
};

export default function ProjectsDrawer({ isOpen, onClose, isMobile }) {
  const { resume, updateProjects } = useResume();
  const [projects, setProjects] = useState(resume.projects);
  const [expandedIdx, setExpandedIdx] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setProjects(resume.projects);
      setExpandedIdx(null);
    }
  }, [isOpen, resume.projects]);

  const handleExpand = (idx) => {
    setExpandedIdx(idx === expandedIdx ? null : idx);
  };

  const handleChange = (e, idx) => {
    const { name, value } = e.target;
    setProjects(projs =>
      projs.map((proj, i) =>
        i === idx ? { ...proj, [name]: value } : proj
      )
    );
  };

  const handleSave = (idx) => {
    updateProjects(projects);
    setExpandedIdx(null);
  };

  const handleDelete = (idx) => {
    const newProjs = projects.filter((_, i) => i !== idx);
    setProjects(newProjs);
    updateProjects(newProjs);
    setExpandedIdx(null);
  };

  const handleAdd = () => {
    setProjects([...projects, { ...emptyProject }]);
    setExpandedIdx(projects.length);
  };

  return (
    <>
      {isMobile && isOpen && (
        <div className="drawer-overlay active" onClick={onClose} />
      )}
      <div
        className={`drawer drawer--slide${isMobile ? ' drawer--mobile' : ''} ${isOpen ? 'open' : ''}`}
        style={isMobile ? { zIndex: 1200 } : {}}
      >
        <img 
          src={leftChevron} 
          alt="close projects drawer button" 
          onClick={onClose}
          style={{ cursor: 'pointer '}}
        />
        <h2 className="drawer-heading">Projects</h2>
        <button className="save-button" style={{marginBottom: 12}} onClick={handleAdd}>
          + Add Project
        </button>
        {projects.map((proj, idx) => (
          <div key={idx} style={{marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 8}}>
            <div
              style={{cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
              onClick={() => handleExpand(idx)}
            >
              {proj.name || 'New Project'}
              <img
                src={normalChevron}
                alt={expandedIdx === idx ? "Collapse" : "Expand"}
                className="chevron-icon"
                style={{
                  transform: expandedIdx === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }}
              />
            </div>
            {expandedIdx === idx && (
              <div style={{marginTop: 8}}>
                <div className="input-group">
                  <label className="input-label">Project Name</label>
                  <input
                    type="text"
                    name="name"
                    value={proj.name}
                    onChange={e => handleChange(e, idx)}
                    className="input-field"
                    placeholder="Project Name"
                  />
                  <label className="input-label">Description</label>
                  <textarea
                    name="description"
                    value={proj.description}
                    onChange={e => handleChange(e, idx)}
                    className="input-field"
                    placeholder="Description"
                  />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16}}>
                  <button className="save-button" onClick={() => handleSave(idx)}>
                    Save
                  </button>
                  <button
                    style={{
                      background: '#c94c43',
                      color: '#fff',
                      borderRadius: 4,
                      padding: '10px',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 16
                    }}
                    onClick={() => handleDelete(idx)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}