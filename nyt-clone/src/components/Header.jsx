import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import styles from "../StyledComponents.module.css";
import "../App.css";
import "../index.css";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search submission
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      const nyTimesSearchUrl = `https://www.nytimes.com/search?query=${encodeURIComponent(searchQuery)}`;
      window.open(nyTimesSearchUrl, "_blank"); // Open search in new tab
    }
  };

  return (

    <header className={`${styles.headerBackground}`}>  
        
        {/* Search Bar */}
        <div className="search">
          <button 
            onClick={() => setIsVisible(!isVisible)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-200"
          >
            <Search/>
          </button>
          {isVisible && (
            <input 
              type="text" 
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch} // Trigger search on Enter
            />
          )}
        </div>

        {/* Date */}
        <div className="date">{new Date().toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}</div>

        {/* Navigation */}
        <nav className="menu">
          <ul>
            <li><a href="https://www.nytimes.com/section/us" target="_blank" rel="noopener noreferrer" className="hover:underline">U.S.</a></li>
            <li><a href="https://www.nytimes.com/section/world" target="_blank" rel="noopener noreferrer" className="hover:underline">World</a></li>
            <li><a href="https://www.nytimes.com/section/business" target="_blank" rel="noopener noreferrer" className="hover:underline">Business</a></li>
            <li><a href="https://www.nytimes.com/section/arts" target="_blank" rel="noopener noreferrer" className="hover:underline">Arts</a></li>
            <li><a href="https://www.nytimes.com/section/style" target="_blank" rel="noopener noreferrer" className="hover:underline">Lifestyle</a></li>
            <li><a href="https://www.nytimes.com/section/opinion" target="_blank" rel="noopener noreferrer" className="hover:underline">Opinion</a></li>
            <li><a href="https://www.nytimes.com/section/sports" target="_blank" rel="noopener noreferrer" className="hover:underline">Sports</a></li>
            <li><a href="https://www.nytimes.com/spotlight/podcasts" target="_blank" rel="noopener noreferrer" className="hover:underline">Audio</a></li>
            <li><a href="https://www.nytimes.com/games" target="_blank" rel="noopener noreferrer" className="hover:underline">Games</a></li>
            <li><a href="https://cooking.nytimes.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Cooking</a></li>
            <li><a href="https://www.nytimes.com/wirecutter" target="_blank" rel="noopener noreferrer" className="hover:underline">Wirecutter</a></li>
            <li><a href="https://www.nytimes.com/athletic/uk" target="_blank" rel="noopener noreferrer" className="hover:underline">The Athletic</a></li>
          </ul>
        </nav>


        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <span className={styles.almost}>(almost) </span>
            <span className={styles.customTitle}>The New York Times</span>
          </Link>
        </div>
    </header>
  );
};

export default Header;
