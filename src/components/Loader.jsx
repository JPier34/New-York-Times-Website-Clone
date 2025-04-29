import React from "react";
import "../App.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner" />
      <p>Caricamento in corso...</p>
    </div>
  );
};

export default Loader;
