// src/components/Drawers/GeneralInfoDrawer.jsx
import React, { useState } from 'react';
import leftChevron from '../../assets/icons/left_chevron.svg';

export default function GeneralInfoDrawer( { isOpen, onClose, isMobile }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Placeholder: integrate with global context later
    console.log('Saved:', formData);
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
        <label className="input-label">City/Town</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="input-field"
          placeholder="Type here..."
        />
      </div>

      <div className="input-group">
        <label className="input-label">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
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
