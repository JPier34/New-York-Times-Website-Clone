import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, User } from "lucide-react";
import { X } from "lucide-react";
import styles from "../StyledComponents.module.css";
import "../App.css";
import "../index.css";
import Auth from "../components/Auth";  // Importa il componente Auth

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Stato per controllare la visibilità del popup

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  // Gestiamo il resize della finestra
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Gestiamo la ricerca
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      const nyTimesSearchUrl = `https://www.nytimes.com/search?query=${encodeURIComponent(searchQuery)}`;
      window.open(nyTimesSearchUrl, "_blank"); // Apriamo la ricerca in una nuova scheda
    }
  };

  // Funzione per chiudere il popup solo se si clicca sull'overlay (sfondo)
  const handleClosePopup = (e) => {
    if (e.target === e.currentTarget) {  // Verifica se si è cliccato sull'overlay
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
          {/* Mobile View: Hamburger Menu */}
          <button onClick={() => setIsMenuOpen(true)} className="menu-icon">
            <Menu size={isMobile ? 24 : 30} />
          </button>

          {isMenuOpen && (
            <div className="fullscreen-menu">
              <button className="close-menu" onClick={() => setIsMenuOpen(false)}>
                <X size={40} />
              </button>
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
          )}
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

      {/* Icona dell'utente per il popup */}
      <div className="login" onClick={() => setShowPopup(true)}>
        <User size={isMobile ? 24 : 30} />
      </div>

      {/* Popup di login */}
      {showPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="login-popup" onClick={(e) => e.stopPropagation()}> {/* Impedisce la chiusura se clicchiamo dentro */}
            <div className="popup-content">
              <h3>Login</h3>
              <Auth />
              <button className="close" onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
