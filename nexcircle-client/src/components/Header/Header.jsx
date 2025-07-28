import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaCalendarAlt, FaPlusCircle } from 'react-icons/fa';
import './headerStyles.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header-container">
      <div className="logo">
        <h1>NexCircle</h1>
      </div>
      <button className="hamburger-menu" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <nav className={`nav-bar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}><FaHome /> Home</Link></li>
          <li><Link to="/events" onClick={toggleMenu}><FaCalendarAlt /> Events</Link></li>
          <li><Link to="/create-event" onClick={toggleMenu} ><FaPlusCircle /> Create Event</Link></li>
          {isAuthenticated ? (
            <li><button onClick={() => { logout(); toggleMenu(); }} className="nav-link-button">LOGOUT</button></li>
          ) : (
            <li><Link to="/login" onClick={toggleMenu} className="nav-link-button">LOGIN</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;