import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import styles from "../StyledComponents.module.css";
import "../App.css";
import "../index.css";

const Header = () => {

    // Current data
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <header className={`${styles.headerBackground}`}>  
        
        {/* Date */}
        <div className="date text-sm text-gray-600">{today}</div>

        {/* Navigation */}
        <nav className="menu space-x-6 font-medium hidden">
          <Link to="/world" className="hover:underline">World</Link>
          <Link to="/politics" className="hover:underline">Politics</Link>
          <Link to="/business" className="hover:underline">Business</Link>
          <Link to="/technology" className="hover:underline">Tech</Link>
          <Link to="/sports" className="hover:underline">Sports</Link>
        </nav>

        {/* Logo */}
        <div className="logo text-3xl font-bold">
          <Link to="/">
            <span className={styles.customTitle}>The </span>
            <span className={styles.almost}>(almost) </span>
            <span className={styles.customTitle}>New York Times</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="search border border-gray-300 rounded-lg px-3 py-1">
          <input 
            type="text" 
            placeholder="Search" 
            className="outline-none px-2 py-1 w-40 md:w-60"
          />
          <Search className="w-5 h-5 text-gray-500" />
        </div>
    </header>
  );
};

export default Header;
