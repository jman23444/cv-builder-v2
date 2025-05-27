import React from 'react';
import logo from '../assets/brand/LOGO.svg';
import brain from '../assets/icons/brain.svg';
import Button, { ProfileIcon } from './Buttons';
import shieldIcon from '../assets/icons/shieldIcon.svg';
import mobileMenuIcon from '../assets/icons/mobile_Menu_Icon.svg';


export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="CV Builder Logo" />
      </div>
      <nav className="header__nav">
        <span className="header__title">CV Builder</span>
        <img src={brain} alt="animated image of brain" />
        {/* Future: add links/settings/user menu */}
      </nav>
      <div className="header__actions">
        <Button 
          id="upgrade-button"
          label="Upgrade to Premium" 
          onClick={() => alert('Upgrade clicked!')} 
          icon={shieldIcon} 
          color="#FFF"
          bgColor="#008847"
          hoverBgColor="#056a3d"  />
        <ProfileIcon Letter= "J" />
      </div>
      <Button 
        id="mobile-menu-button"
        Label=""
        onClick={() => alert('Mobile Menu Clicked!')}
        icon={mobileMenuIcon}
        color="#000"
        strokeColor="#CCCCC9" />
    </header>
  );
}