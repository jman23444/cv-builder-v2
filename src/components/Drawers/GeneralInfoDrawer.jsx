import React, { useState, useEffect } from 'react';
import leftChevron from '../../assets/icons/left_chevron.svg';
import { useResume } from '../../context/ResumeContext';

export default function GeneralInfoDrawer({ isOpen, onClose, isMobile }) {
  const { resume, updateGeneralInfo } = useResume();
  const [formData, setFormData] = useState(resume.generalInfo);

  useEffect(() => {
    if (isOpen) setFormData(resume.generalInfo);
  }, [isOpen, resume.generalInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateGeneralInfo(formData);
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
          alt="close general info drawer button" 
          onClick={onClose}
          style={{ cursor: 'pointer '}}
        />
        <h2 className="drawer-heading">General Info</h2>

        <div className="input-group">
          <label className="input-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="Type here..."
          />
        </div>

        <div className="input-group">
          <label className="input-label">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            placeholder="Type here..."
          />
        </div>

        <div className="input-group">
          <label className="input-label">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
            placeholder="Type here..."
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

        <button
          onClick={handleSave}
          className="save-button"
        >
          Save
        </button>
      </div>
    </>
  );
}