import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import GeneralInfoDrawer from "../components/Drawers/GeneralInfoDrawer";
import EducationDrawer from "../components/Drawers/EducationDrawer";
import ProjectsDrawer from "../components/Drawers/ProjectsDrawer";
import WorkExperienceDrawer from "../components/Drawers/WorkExperienceDrawer";
import TechnicalSkillsDrawer from "../components/Drawers/TechnicalSkillsDrawer";

export default function Shell({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(null); // null, 'general', 'education', etc.

  const isMobile = window.innerWidth <= 700;

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Drawer handlers
  const handleOpenDrawer = (drawer) => {
    if (isMobile) setIsSidebarOpen(false); // close sidebar on mobile
    setOpenDrawer(drawer);
  };
  const closeDrawer = () => setOpenDrawer(null);

  return (
    <div className="app-shell">
      <Header openSidebar={openSidebar} />
      <div className="shell-content">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          onGeneralInfoClick={() => handleOpenDrawer("general")}
          onEducationClick={() => handleOpenDrawer("education")}
          onProjectsClick={() => handleOpenDrawer("projects")}
          onWorkExperienceClick={() => handleOpenDrawer("workExperience")}
          onTechnicalSkillsClick={() => handleOpenDrawer("skills")}
        />
        <GeneralInfoDrawer
          isOpen={openDrawer === "general"}
          onClose={closeDrawer}
          isMobile={isMobile}
        />
        <EducationDrawer
          isOpen={openDrawer === "education"}
          onClose={closeDrawer}
          isMobile={isMobile}
        />
        <ProjectsDrawer
          isOpen={openDrawer === "projects"}
          onClose={closeDrawer}
          isMobile={isMobile}
        />
        <WorkExperienceDrawer
          isOpen={openDrawer === "workExperience"}
          onClose={closeDrawer}
          isMobile={isMobile}
        />
        <TechnicalSkillsDrawer
          isOpen={openDrawer === "skills"}
          onClose={closeDrawer}
          isMobile={isMobile}
        />
        <main className="shell-main">{children}</main>
      </div>
    </div>
  );
}
