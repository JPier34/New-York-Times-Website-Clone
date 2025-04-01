import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, User } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import styles from "../StyledComponents.module.css";
import "../App.css";
import "../index.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [searchQuery, setSearchQuery] = useState("");

  const [searchActive, setSearchActive] = useState(false);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  // Handle window resize to switch between mobile and desktop view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle search submission
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      const nyTimesSearchUrl = `https://www.nytimes.com/search?query=${encodeURIComponent(searchQuery)}`;
      window.open(nyTimesSearchUrl, "_blank"); // Open search in new tab
    }
  };

  return (
    <header className={`${styles.headerBackground}`}>

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
        // Mobile View: Hamburger Menu
        <>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="menu-icon"
          >
            <Menu size={30} />
          </button>

          {isMenuOpen && (
            <nav className="mobile-menu">
              <input 
                type="text" 
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch} 
                className="search-input"
              />
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
        </>
      ) : (
        // Desktop View: Menu Always Visible
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

      {/* User Icon Placeholder for Future Login */}
      <User size={30} />
    </header>
  );
};

export default Header;