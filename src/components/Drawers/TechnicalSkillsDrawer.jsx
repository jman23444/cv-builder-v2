import React, { useState } from 'react';
import leftChevron from '../../assets/icons/left_chevron.svg';

export default function TechnicalSkillsDrawer({ isOpen, onClose, isMobile }) {
  const [formData, setFormData] = useState({
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Technical Skills saved:', formData);
    // Placeholder for context or parent function
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
          style={{ cursor: 'pointer' }}
        />
        <h2 className="drawer-heading">Add Technical Skills</h2>

        <div className="input-group">
          <label className="input-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            placeholder="Type Here..."
            rows={4}
            style={{ resize: 'vertical' }}
          />
        </div>

        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </div>
    </>
  );
}