import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Shell({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="app-shell">
      <Header openSidebar={openSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <main className="shell-main">
        {children}
      </main>
    </div>
  );
}