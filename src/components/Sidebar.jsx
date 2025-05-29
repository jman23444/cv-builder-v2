import React from "react";
import { SidebarButton } from "./Buttons";
import generalIcon from "../assets/icons/general_Info_Icon.svg";
import educationIcon from "../assets/icons/education_Icon.svg";
import experienceIcon from "../assets/icons/work_Experience_Icon.svg";
import projectsIcon from "../assets/icons/projects_Icon.svg";
import skillsIcon from "../assets/icons/technical_Skills_Icon.svg";
import profileIcon from "../assets/icons/profileIcon.svg";

export default function Sidebar({
  isOpen,
  onClose,
  onGeneralInfoClick,
  onEducationClick,
  onProjectsClick,
  onWorkExperienceClick,
  onTechnicalSkillsClick,
}) {
  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />
      <aside
        className={`sidebar-mobile-view sidebar--mobile ${isOpen ? "open" : ""}`}
      >
        <button className="sidebar__close" onClick={onClose}>
          ×
        </button>
        <SidebarButton
          label="General Info"
          icon={generalIcon}
          onClick={onGeneralInfoClick}
        />
        <SidebarButton
          label="Education"
          icon={educationIcon}
          onClick={onEducationClick}
        />
        <SidebarButton
          label="Work Experience"
          icon={experienceIcon}
          onClick={onWorkExperienceClick}
        />
        <SidebarButton
          label="Projects"
          icon={projectsIcon}
          onClick={onProjectsClick}
        />
        <SidebarButton
          label="Technical Skills"
          icon={skillsIcon}
          onClick={onTechnicalSkillsClick}
        />
        <SidebarButton label="Account" icon={profileIcon} />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="sidebar-desktop sidebar--desktop">
        <SidebarButton
          label="General Info"
          icon={generalIcon}
          onClick={onGeneralInfoClick}
        />
        <SidebarButton
          label="Education"
          icon={educationIcon}
          onClick={onEducationClick}
        />
        <SidebarButton
          label="Work Experience"
          icon={experienceIcon}
          onClick={onWorkExperienceClick}
        />
        <SidebarButton
          label="Projects"
          icon={projectsIcon}
          onClick={onProjectsClick}
        />
        <SidebarButton
          label="Technical Skills"
          icon={skillsIcon}
          onClick={onTechnicalSkillsClick}
        />
        <SidebarButton label="Account" icon={profileIcon} />
      </aside>
    </>
  );
}
