import React, { useState, useEffect } from "react";
import leftChevron from "../../assets/icons/left_chevron.svg";
import normalChevron from "../../assets/icons/normal_chevron.svg";
import { useResume } from "../../context/ResumeContext";

const emptyExperience = {
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
};

export default function WorkExperienceDrawer({ isOpen, onClose, isMobile }) {
  const { resume, updateExperiences } = useResume();
  const [experiences, setExperiences] = useState(resume.experiences);
  const [expandedIdx, setExpandedIdx] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setExperiences(resume.experiences);
      setExpandedIdx(null);
    }
  }, [isOpen, resume.experiences]);

  const handleExpand = (idx) => {
    setExpandedIdx(idx === expandedIdx ? null : idx);
  };

  const handleChange = (e, idx) => {
    const { name, value } = e.target;
    setExperiences((exps) =>
      exps.map((exp, i) => (i === idx ? { ...exp, [name]: value } : exp)),
    );
  };

  const handleSave = (idx) => {
    updateExperiences(experiences);
    setExpandedIdx(null);
  };

  const handleDelete = (idx) => {
    const newExps = experiences.filter((_, i) => i !== idx);
    setExperiences(newExps);
    updateExperiences(newExps);
    setExpandedIdx(null);
  };

  const handleAdd = () => {
    setExperiences([...experiences, { ...emptyExperience }]);
    setExpandedIdx(experiences.length);
  };

  return (
    <>
      {isMobile && isOpen && (
        <div className="drawer-overlay active" onClick={onClose} />
      )}
      <div
        className={`drawer drawer--slide${isMobile ? " drawer--mobile" : ""} ${isOpen ? "open" : ""}`}
        style={isMobile ? { zIndex: 1200 } : {}}
      >
        <img
          src={leftChevron}
          alt="close work experience drawer button"
          onClick={onClose}
          style={{ cursor: "pointer " }}
        />
        <h2 className="drawer-heading">Work Experience</h2>
        <button
          className="save-button"
          style={{ marginBottom: 12 }}
          onClick={handleAdd}
        >
          + Add Work Experience
        </button>
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: 16,
              borderBottom: "1px solid #eee",
              paddingBottom: 8,
            }}
          >
            <div
              style={{
                cursor: "pointer",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onClick={() => handleExpand(idx)}
            >
              {exp.company || "New Experience"}
              <img
                src={normalChevron}
                alt={expandedIdx === idx ? "Collapse" : "Expand"}
                className="chevron-icon"
                style={{
                  transform:
                    expandedIdx === idx ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </div>
            {expandedIdx === idx && (
              <div style={{ marginTop: 8 }}>
                <div className="input-group">
                  <label className="input-label">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleChange(e, idx)}
                    className="input-field"
                    placeholder="Company"
                  />
                  <label className="input-label">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={exp.role}
                    onChange={(e) => handleChange(e, idx)}
                    className="input-field"
                    placeholder="Role"
                  />
                  <label className="input-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={exp.location}
                    onChange={(e) => handleChange(e, idx)}
                    className="input-field"
                    placeholder="Location"
                  />
                  <label className="input-label">Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    value={exp.startDate}
                    onChange={(e) => handleChange(e, idx)}
                    className="input-field"
                    placeholder="Start Date"
                  />
                  <label className="input-label">End Date</label>
                  <input
                    type="text"
                    name="endDate"
                    value={exp.endDate}
                    onChange={(e) => handleChange(e, idx)}
                    className="input-field"
                    placeholder="End Date"
                  />
                  <label className="input-label">Description</label>
                  <textarea
                    name="description"
                    value={exp.description}
                    onChange={(e) => handleChange(e, idx)}
                    className="input-field"
                    placeholder="Description"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginTop: 16,
                  }}
                >
                  <button
                    className="save-button"
                    onClick={() => handleSave(idx)}
                  >
                    Save
                  </button>
                  <button
                    style={{
                      background: "#c94c43",
                      color: "#fff",
                      borderRadius: 4,
                      padding: "10px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 16,
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
