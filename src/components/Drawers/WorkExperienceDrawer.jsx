import React, { useState } from 'react';
import leftChevron from '../../assets/icons/left_chevron.svg';
import normalChevron from '../../assets/icons/normal_chevron.svg';

export default function WorkExperienceDrawer({ isOpen, onClose, isMobile }) {
  const emptyForm = {
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
  };

  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editIndex !== null) {
      // Update existing
      setExperiences((prev) =>
        prev.map((exp, idx) => (idx === editIndex ? formData : exp))
      );
      setEditIndex(null);
    } else {
      // Add new
      setExperiences((prev) => [...prev, formData]);
    }
    setFormData(emptyForm);
    setExpandedIndex(null);
  };

  const handleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
    setEditIndex(null);
    setFormData(emptyForm);
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setExpandedIndex(idx);
    setFormData(experiences[idx]);
  };

  const handleFieldChange = (idx, field, value) => {
    setExperiences(prev =>
      prev.map((exp, i) =>
        i === idx ? { ...exp, [field]: value } : exp
      )
    );
  };

  const handleUpdate = (idx) => {
    // Optionally show a toast or feedback
    setExpandedIndex(null);
  };

  const handleDelete = (idx) => {
    setExperiences(prev => prev.filter((_, i) => i !== idx));
    setExpandedIndex(null);
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
          alt="close work experience drawer button"
          onClick={onClose}
          style={{ cursor: 'pointer' }}
        />
        <h2 className="drawer-heading">Add Work Experience</h2>

        {/* Add/Edit Form */}
        <div className="input-group">
          <label className="input-label">Company Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="input-field"
            placeholder="Type Here..."
          />
        </div>
        <div className="input-group">
          <label className="input-label">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
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
            placeholder="Type Here..."
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
          {editIndex !== null ? 'Update' : 'Save'}
        </button>

        <hr style={{ width: '100%', margin: '16px 0', border: 'none', borderTop: '1px solid #ccc' }} />

        {/* Experience List */}
        {experiences.map((exp, idx) => (
        <div key={idx} style={{ marginBottom: 16 }}>
            <div
              style={{
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                justifyContent: 'space-between',
                borderBottom: '1px solid #eee',
                padding: '8px 0',
              }}
              onClick={() => handleExpand(idx)}
            >
              <span>{exp.company || 'Company Name'}</span>
              <img
                className="chevron-icon"
                src={normalChevron}
                alt={expandedIndex === idx ? "Collapse" : "Expand"}
                style={{
                  width: 20,
                  height: 20,
                  transition: 'transform 0.2s',
                  transform: expandedIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              />
            </div>


            <div className={`drawer-expandable${expandedIndex === idx ? ' open' : ''}`}>
            {expandedIndex === idx && (
                <form
                style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}
                onClick={e => e.stopPropagation()}
                onSubmit={e => { e.preventDefault(); handleUpdate(idx); }}
                >
                <div className="input-group">
                  <label className="input-label">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={exp.company}
                    onChange={e => handleFieldChange(idx, 'company', e.target.value)}
                    className="input-field"
                    placeholder="Type Here..."
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={exp.role}
                    onChange={e => handleFieldChange(idx, 'role', e.target.value)}
                    className="input-field"
                    placeholder="Type Here..."
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={exp.startDate}
                    onChange={e => handleFieldChange(idx, 'startDate', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={exp.endDate}
                    onChange={e => handleFieldChange(idx, 'endDate', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={exp.location}
                    onChange={e => handleFieldChange(idx, 'location', e.target.value)}
                    className="input-field"
                    placeholder="Type Here..."
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Description</label>
                  <textarea
                    name="description"
                    value={exp.description}
                    onChange={e => handleFieldChange(idx, 'description', e.target.value)}
                    className="input-field"
                    placeholder="Type Here..."
                    rows={4}
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <button type="submit" className="save-button" style={{ marginTop: 8 }}>
                  Save
                </button>
                <button
                  type="button"
                  style={{
                    marginTop: 8,
                    background: '#c0392b',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    padding: '10px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleDelete(idx)}
                >
                  Delete
                </button>
              </form>
            )}
          </div>
          </div>
        ))}
      </div>
    </>
  );
}

