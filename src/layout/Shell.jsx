import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import GeneralInfoDrawer from '../components/Drawers/GeneralInfoDrawer';

export default function Shell({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Detect mobile (simple approach)
  const isMobile = window.innerWidth <= 700;

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Drawer handlers
  const openDrawer = () => {
    if (isMobile) setIsSidebarOpen(false); // close sidebar on mobile
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="app-shell">
      <Header openSidebar={openSidebar} />
      <div className="shell-content">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          onGeneralInfoClick={openDrawer}
        />
        <GeneralInfoDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          isMobile={isMobile}
        />
        <main className="shell-main">
          {children}
        </main>
      </div>
    </div>
  );
}