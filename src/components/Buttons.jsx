import React from "react";

// Conventional Button Component With Dyanmic Styles

export default function Button({
  id,
  label = "",
  onClick,
  icon: Icon,
  bgColor,
  color,
  hoverBgColor,
  strokeColor,
}) {
  const dynamicStyles = {
    backgroundColor: bgColor,
    color: color,
    border: strokeColor ? `1px solid ${strokeColor}` : "none",
  };

  return (
    <button
      id={id}
      className="button"
      onClick={onClick}
      style={dynamicStyles}
      onMouseEnter={(e) => {
        if (hoverBgColor) e.currentTarget.style.backgroundColor = hoverBgColor;
      }}
      onMouseLeave={(e) => {
        if (bgColor) e.currentTarget.style.backgroundColor = bgColor;
      }}
    >
      {Icon && <img src={Icon} alt="icon" className="button-icon" />}
      {label}
    </button>
  );
}

// Profile Button Component

export function ProfileIcon({ letter = "J" }) {
  return (
    <>
      <span className="profile-icon__letter">{letter}</span>
    </>
  );
}

// Sidebar Button Component With Dyanmic Styles

export function SidebarButton({ label, icon: Icon, isActive, onClick }) {
  return (
    <button
      className={`sidebar-button ${isActive ? "sidebar-button--active" : ""}`}
      onClick={onClick}
    >
      <div className="sidebar-button__icon-wrapper">
        <img
          src={Icon}
          alt={`${label} icon`}
          className="sidebar-button__icon"
        />
      </div>
      <span className="sidebar-button__label">{label}</span>
    </button>
  );
}
