import React from "react";
import './App.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/article/:articleId" element={<ArticlePage />} />
            </Routes>
            <ToastContainer />
        </Router>
    );
}

export default App;
