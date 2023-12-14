import React from 'react';
type HeaderProps = {
  onLogout: () => void; 
};

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="header">
      <h1>My App</h1>
      <button onClick={onLogout} className="logout-button">Logout</button> {/* Logout button */}
    </header>
  );
};

export default Header;
