import React from 'react';


export default function Button({ id, label = '', onClick, icon: Icon, bgColor, color, hoverBgColor, strokeColor }) {
  const dynamicStyles = {
    backgroundColor: bgColor,
    color: color,
    border: strokeColor ? `1px solid ${strokeColor}` : 'none',
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

export function ProfileIcon({ letter = "J" }) {
  return (
    <>
      <span className="profile-icon__letter">{letter}</span>
    </>
  );
}
