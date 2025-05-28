// src/components/Drawers/EducationDrawer.jsx
import React, { useState } from 'react';
import leftChevron from '../../assets/icons/left_chevron.svg';

export default function EducationDrawer({ isOpen, onClose, isMobile }) {
  const [formData, setFormData] = useState({
    school: '',
    field: '',
    startDate: '',
    endDate: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Education saved:', formData);
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
            alt="close general info drawer button" 
            onClick={onClose}
            style={{ cursor: 'pointer '}}
        />

        <h2 className="drawer-heading">Add Education</h2>

        <div className="input-group">
            <label className="input-label">School Name</label>
            <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            className="input-field"
            placeholder="Type here..."
            />
        </div>

        <div className="input-group">
            <label className="input-label">Field of Study</label>
            <input
            type="text"
            name="field"
            value={formData.field}
            onChange={handleChange}
            className="input-field"
            placeholder="Type here..."
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
            />
        </div>

        <div className="input-group">
            <label className="input-label">Location</label>
            <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input-field"
            placeholder="Type here..."
            />
        </div>

        <button onClick={handleSave} className="save-button">
            Save
        </button>
        </div>
    </>
  );
}