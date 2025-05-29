import React, { useState, useEffect } from "react";
import leftChevron from "../../assets/icons/left_chevron.svg";
import normalChevron from "../../assets/icons/normal_chevron.svg";
import { useResume } from "../../context/ResumeContext";

const emptyEducation = {
  school: "",
  field: "",
  location: "",
  startDate: "",
  endDate: "",
};

export default function EducationDrawer({ isOpen, onClose, isMobile }) {
  const { resume, updateEducations } = useResume();
  const [educations, setEducations] = useState(resume.educations);
  const [expandedIdx, setExpandedIdx] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setEducations(resume.educations);
      setExpandedIdx(null);
    }
  }, [isOpen, resume.educations]);

  const handleExpand = (idx) => {
    setExpandedIdx(idx === expandedIdx ? null : idx);
  };

  const handleChange = (e, idx) => {
    const { name, value } = e.target;
    setEducations((eds) =>
      eds.map((edu, i) => (i === idx ? { ...edu, [name]: value } : edu)),
    );
  };

  const handleSave = (idx) => {
    updateEducations(educations);
    setExpandedIdx(null);
  };

  const handleDelete = (idx) => {
    const newEds = educations.filter((_, i) => i !== idx);
    setEducations(newEds);
    updateEducations(newEds);
    setExpandedIdx(null);
  };

  const handleAdd = () => {
    setEducations([...educations, { ...emptyEducation }]);
    setExpandedIdx(educations.length);
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
          alt="close education drawer button"
          onClick={onClose}
          style={{ cursor: "pointer " }}
        />
        <h2 className="drawer-heading">Education</h2>
        <button
          className="save-button"
          style={{ marginBottom: 12 }}
          onClick={handleAdd}
        >
          + Add Education
        </button>
        {educations.map((edu, idx) => (
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
              {edu.school || "New Education"}
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
                  <label className="input-label">School</label>
                  <input
                    type="text"
                    name="school"
                    value={edu.school}
                    onChange={(e) => handleChange(e, idx)}
                    className="input-field"
                    placeholder="School"
                  />
                  <label className="input-label">Field</label>
                  <input
                    type="text"
                    name="field"
                    value={edu.field}
                    onChange={(e) => handleChange(e, idx)}
                    className="input-field"
                    placeholder="Field of Study"
                  />
                  <label className="input-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={edu.location}
                    onChange={(e) => handleChange(e, idx)}
                    className="input-field"
                    placeholder="Location"
                  />
                  <label className="input-label">Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    value={edu.startDate}
                    onChange={(e) => handleChange(e, idx)}
                    className="input-field"
                    placeholder="Start Date"
                  />
                  <label className="input-label">End Date</label>
                  <input
                    type="text"
                    name="endDate"
                    value={edu.endDate}
                    onChange={(e) => handleChange(e, idx)}
                    className="input-field"
                    placeholder="End Date"
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
