import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import styles from "../StyledComponents.module.css";

const Header = () => {
  return (
    <header className={`"w-full shadow-md flex whitespace-nowrap items-center items-stretch ${styles.headerBackground}`}>  

    {/* Navigation */}
      <nav className="hidden md:flex space-x-6 font-medium">
        <Link to="/world" className="hover:underline">World</Link>
        <Link to="/politics" className="hover:underline">Politics</Link>
        <Link to="/business" className="hover:underline">Business</Link>
        <Link to="/technology" className="hover:underline">Tech</Link>
        <Link to="/sports" className="hover:underline">Sports</Link>
      </nav>

    {/* Logo */}
    <div className="text-3xl font-bold hidden text-center">
      <Link to="/">
        <span className={styles.customTitle}>The </span>
        <span className={styles.almost}> (almost) </span>
        <span className={styles.customTitle}> New York Times</span>
      </Link>
    </div>

    {/* Search Bar */}
      <div className="flex order-first border border-gray-300 rounded-lg px-3 py-1">
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
