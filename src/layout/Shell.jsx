// src/layout/Shell.jsx
import React from 'react';
import Header from '../components/Header';

export default function Shell({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="shell-main">
        {children}
      </main>
    </div>
  );
}