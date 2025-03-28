import React, { useState } from "react";
import { FaListAlt, FaBook, FaFilm, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../App.css";

const RelatedContent = () => {
  const apiKey = import.meta.env.VITE_NY_TIMES_API_KEY;

  const [openSection, setOpenSection] = useState(null);
  const [relatedData, setRelatedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sections = [
    { id: "most-popular", label: "Most Popular", icon: <FaListAlt />, endpoint: "mostpopular/v2/viewed/7.json" },
    { id: "books", label: "Books", icon: <FaBook />, endpoint: "books/v3/lists/current/hardcover-fiction.json" },
    { id: "movies", label: "Movies", icon: <FaFilm />, endpoint: "search/v2/articlesearch.json?fq=section_name:\"Movies\" AND type_of_material:\"Review\"&sort=newest&page=0" },
  ];

  const fetchRelatedData = async (id, endpoint) => {
    if (openSection === id) {
      setOpenSection(null);
      return;
    }

    setLoading(true);
    setOpenSection(id);
    setError(null); // Reset error state

    try {
      const response = await fetch(`https://api.nytimes.com/svc/${endpoint}${endpoint.includes('?') ? '&' : '?'}api-key=${apiKey}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();

      // Check the structure of the data based on the endpoint
      let results;
      switch (id) {
        case "most-popular":
          results = data.results || []; // For most popular, ensure results is defined
          break;
        case "books":
          results = data.results?.books || []; // For books, ensure results.books is defined
          break;
        case "movies":
          results = data.response?.docs || []; // For movie reviews, ensure response.docs is defined
          break;
        default:
          results = [];
      }

      // Limit results to the first 5 items
      setRelatedData(prevData => ({ ...prevData, [id]: results ? results.slice(0, 5) : [] }));
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load content. Please try again later.");
      setRelatedData(prevData => ({ ...prevData, [id]: [] }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="related-content">
      <h2>More articles</h2>
      <ul className="menu-list">
        {sections.map((section) => (
          <li key={section.id}
             className={["Most Popular", "Books", "Movies"].includes(section.label) ? "no-bullet" : ""}
             >
            <button
              className={`menu-item ${openSection === section.id ? 'active' : ''}`}
              onClick={() => fetchRelatedData(section.id, section.endpoint)}
              aria-expanded={openSection === section.id}
            >
              {section.icon} {section.label}
              {openSection === section.id ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {openSection === section.id && (
              <div className="dropdown-content">
                {loading ? (
                  <p className="loading">Loading...</p>
                ) : error ? (
                  <p className="error">{error}</p>
                ) : relatedData[section.id] && relatedData[section.id].length > 0 ? (
                  <ul className="dropdown-menu">
                    {relatedData[section.id].map((item, index) => (
                      <li key={index} className="dropdown-item">
                        <a href={item.url || item.link} target="_blank" rel="noopener noreferrer">
                          {item.headline?.main || item.title || item.display_title || "Title not available"}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No content available</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedContent;