import React, { useState } from 'react';
import leftChevron from '../../assets/icons/left_chevron.svg';
import normalChevron from '../../assets/icons/normal_chevron.svg';

export default function ProjectsDrawer({ isOpen, onClose, isMobile }) {
  const emptyForm = {
    name: '',
    startDate: '',
    endDate: '',
    description: '',
  };

  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editIndex !== null) {
      setProjects((prev) =>
        prev.map((proj, idx) => (idx === editIndex ? formData : proj))
      );
      setEditIndex(null);
    } else {
      setProjects((prev) => [...prev, formData]);
    }
    setFormData(emptyForm);
    setExpandedIndex(null);
  };

  const handleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
    setEditIndex(null);
    setFormData(emptyForm);
  };

  const handleFieldChange = (idx, field, value) => {
    setProjects(prev =>
      prev.map((proj, i) =>
        i === idx ? { ...proj, [field]: value } : proj
      )
    );
  };

  const handleUpdate = (idx) => {
    setExpandedIndex(null);
  };

  const handleDelete = (idx) => {
    setProjects(prev => prev.filter((_, i) => i !== idx));
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
          alt="close project drawer button"
          onClick={onClose}
          style={{ cursor: 'pointer' }}
        />
        <h2 className="drawer-heading">Add Project</h2>

        {/* Add/Edit Form */}
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

        {/* Project List */}
        {projects.map((proj, idx) => (
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
              <span>{proj.name || 'Project Name'}</span>
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
                  <label className="input-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={proj.name}
                    onChange={e => handleFieldChange(idx, 'name', e.target.value)}
                    className="input-field"
                    placeholder="Type Here..."
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={proj.startDate}
                    onChange={e => handleFieldChange(idx, 'startDate', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={proj.endDate}
                    onChange={e => handleFieldChange(idx, 'endDate', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Description</label>
                  <textarea
                    name="description"
                    value={proj.description}
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