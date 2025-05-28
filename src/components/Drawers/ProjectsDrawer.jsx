import React, { useState } from 'react';
import leftChevron from '../../assets/icons/left_chevron.svg';

export default function ProjectsDrawer({ isOpen, onClose, isMobile }) {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Project saved:', formData);
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
          alt="close project drawer button"
          onClick={onClose}
          style={{ cursor: 'pointer' }}
        />
        <h2 className="drawer-heading">Add Project</h2>

        <div className="input-group">
          <label className="input-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="Type Here..."
          />
        </div>

        <div className="input-group">
          <label className="input-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="input-field"
            placeholder="Select"
          />
        </div>

        <div className="input-group">
          <label className="input-label">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="input-field"
            placeholder="Select"
          />
        </div>

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

        <hr style={{ width: '100%', margin: '16px 0', border: 'none', borderTop: '1px solid #ccc' }} />
        {/* Placeholder for project list */}
        <div style={{ fontWeight: 500, marginBottom: 8 }}>Project #1 <span style={{ float: 'right' }}>▼</span></div>
      </div>
    </>
  );
}