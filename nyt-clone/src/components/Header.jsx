import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, User } from "lucide-react";
import { X } from "lucide-react";
import styles from "../StyledComponents.module.css";
import "../App.css";
import "../index.css";
import Auth from "../components/Auth";  
import classNames from "classnames"; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  // Window resize
  useEffect(() => {
    let resizeTimeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth <= 1024);
      }, 200); 
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Gestiamo la ricerca
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      const nyTimesSearchUrl = `https://www.nytimes.com/search?query=${encodeURIComponent(searchQuery)}`;
      window.open(nyTimesSearchUrl, "_blank"); // open in a new tab
    }
  };

  // popup close
  const handleClosePopup = (e) => {
    if (e.target === e.currentTarget) {  // Verify if the click is outside the popup
      setShowPopup(false);
    }
  };

  return (
    <header className={`${styles.headerBackground}`}>
      <div className="date">
        {new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>

      <div className="search">
        <div className={`search-wrapper ${searchActive ? 'active' : ''}`}>
          <button onClick={handleSearchClick} className="search-icon">
            <Search size={20} />
          </button>
            {searchActive && (
              <input
                placeholder="Search..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            )}
          </div>
        </div>

      {/* Logo */}
<div className="logo">
  <Link to="/">
    <span className={styles.almost}>(almost) </span>
    <span className={styles.customTitle}>The New York Times</span>
  </Link>
</div>

{isMobile ? (
  <>
    {/* Hamburger icon */}
<button onClick={() => setIsMenuOpen((prev) => !prev)} className="hamburger-menu">
  <Menu size={isMobile ? 24 : 30} />
</button>

{/* Mobile menu */}
<div className={classNames("menu", { active: isMenuOpen })}>
  <button className="close-menu" onClick={() => setIsMenuOpen(false)}>
    <X size={40} />
  </button>

  {/* Search Bar */}
  <div className={`search-wrapper ${searchActive ? 'active' : ''}`}>
        <button onClick={handleSearchClick} className="search-icon">
          <Search size={20} />
        </button>
        {searchActive && (
          <input
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        )}
      </div>

      <ul>
        <li><a href="https://www.nytimes.com/section/us" target="_blank" rel="noopener noreferrer">U.S.</a></li>
        <li><a href="https://www.nytimes.com/section/world" target="_blank" rel="noopener noreferrer">World</a></li>
        <li><a href="https://www.nytimes.com/section/business" target="_blank" rel="noopener noreferrer">Business</a></li>
        <li><a href="https://www.nytimes.com/section/arts" target="_blank" rel="noopener noreferrer">Arts</a></li>
        <li><a href="https://www.nytimes.com/section/style" target="_blank" rel="noopener noreferrer">Lifestyle</a></li>
        <li><a href="https://www.nytimes.com/section/opinion" target="_blank" rel="noopener noreferrer">Opinion</a></li>
        <li><a href="https://www.nytimes.com/section/sports" target="_blank" rel="noopener noreferrer">Sports</a></li>
        <li><a href="https://www.nytimes.com/spotlight/podcasts" target="_blank" rel="noopener noreferrer">Audio</a></li>
        <li><a href="https://www.nytimes.com/games" target="_blank" rel="noopener noreferrer">Games</a></li>
      </ul>
    </div>
  </>
) : (
  <nav className="menu">
    <ul>
      <li><a href="https://www.nytimes.com/section/us" target="_blank" rel="noopener noreferrer">U.S.</a></li>
      <li><a href="https://www.nytimes.com/section/world" target="_blank" rel="noopener noreferrer">World</a></li>
      <li><a href="https://www.nytimes.com/section/business" target="_blank" rel="noopener noreferrer">Business</a></li>
      <li><a href="https://www.nytimes.com/section/arts" target="_blank" rel="noopener noreferrer">Arts</a></li>
      <li><a href="https://www.nytimes.com/section/style" target="_blank" rel="noopener noreferrer">Lifestyle</a></li>
      <li><a href="https://www.nytimes.com/section/opinion" target="_blank" rel="noopener noreferrer">Opinion</a></li>
      <li><a href="https://www.nytimes.com/section/sports" target="_blank" rel="noopener noreferrer">Sports</a></li>
      <li><a href="https://www.nytimes.com/spotlight/podcasts" target="_blank" rel="noopener noreferrer">Audio</a></li>
      <li><a href="https://www.nytimes.com/games" target="_blank" rel="noopener noreferrer">Games</a></li>
    </ul>
  </nav>
)}


      {/* Popup icon */}
      <div className="login" onClick={() => setShowPopup(true)}>
        <User size={isMobile ? 24 : 30} />
      </div>

      {/* Popup Overlay */}
      {showPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="login-popup">
            <button className="close-popup" onClick={handleClosePopup}>
              &#x2715; {/* Unicode for the X */}
            </button>
            <div className="popup-content">
              <h3>Login</h3>
              <Auth setShowPopup={setShowPopup} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;