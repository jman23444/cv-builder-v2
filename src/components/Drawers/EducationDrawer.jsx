import React, { useState } from 'react';
import leftChevron from '../../assets/icons/left_chevron.svg';
import normalChevron from '../../assets/icons/normal_chevron.svg';

export default function EducationDrawer({ isOpen, onClose, isMobile }) {
  const emptyForm = {
    school: '',
    field: '',
    startDate: '',
    endDate: '',
    location: '',
  };

  const [educations, setEducations] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editIndex !== null) {
      setEducations((prev) =>
        prev.map((edu, idx) => (idx === editIndex ? formData : edu))
      );
      setEditIndex(null);
    } else {
      setEducations((prev) => [...prev, formData]);
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
    setFormData(educations[idx]);
  };

  const handleFieldChange = (idx, field, value) => {
    setEducations(prev =>
      prev.map((edu, i) =>
        i === idx ? { ...edu, [field]: value } : edu
      )
    );
  };

  const handleUpdate = (idx) => {
    setExpandedIndex(null);
  };

  const handleDelete = (idx) => {
    setEducations(prev => prev.filter((_, i) => i !== idx));
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
          alt="close education drawer button"
          onClick={onClose}
          style={{ cursor: 'pointer' }}
        />
        <h2 className="drawer-heading">Add Education</h2>

        {/* Add/Edit Form */}
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
          {editIndex !== null ? 'Update' : 'Save'}
        </button>

        <hr style={{ width: '100%', margin: '16px 0', border: 'none', borderTop: '1px solid #ccc' }} />

        {/* Education List */}
        {educations.map((edu, idx) => (
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
              <span>{edu.school || 'School Name'}</span>
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
                  <label className="input-label">School Name</label>
                  <input
                    type="text"
                    name="school"
                    value={edu.school}
                    onChange={e => handleFieldChange(idx, 'school', e.target.value)}
                    className="input-field"
                    placeholder="Type here..."
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Field of Study</label>
                  <input
                    type="text"
                    name="field"
                    value={edu.field}
                    onChange={e => handleFieldChange(idx, 'field', e.target.value)}
                    className="input-field"
                    placeholder="Type here..."
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={edu.startDate}
                    onChange={e => handleFieldChange(idx, 'startDate', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={edu.endDate}
                    onChange={e => handleFieldChange(idx, 'endDate', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={edu.location}
                    onChange={e => handleFieldChange(idx, 'location', e.target.value)}
                    className="input-field"
                    placeholder="Type here..."
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