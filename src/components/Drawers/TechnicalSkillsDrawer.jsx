import React, { useState, useEffect } from 'react';
import leftChevron from '../../assets/icons/left_chevron.svg';
import { useResume } from '../../context/ResumeContext';

export default function TechnicalSkillsDrawer({ isOpen, onClose, isMobile }) {
  const { resume, updateSkills } = useResume();
  const [skills, setSkills] = useState(resume.skills);

  useEffect(() => {
    if (isOpen) setSkills(resume.skills);
  }, [isOpen, resume.skills]);

  const handleChange = (e) => {
    setSkills(e.target.value.split(',').map(s => s.trim()).filter(Boolean));
  };

  const handleSave = () => {
    updateSkills(skills);
    onClose();
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
          alt="close technical skills drawer button" 
          onClick={onClose}
          style={{ cursor: 'pointer '}}
        />
        <h2 className="drawer-heading">Technical Skills</h2>
        <div className="input-group">
          <label className="input-label">Skills (comma separated)</label>
          <input
            type="text"
            value={skills.join(', ')}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g. HTML, CSS, JavaScript"
          />
        </div>
        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </div>
    </>
  );
}