import React from "react";
import Auth from "../src/components/Auth";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<><HomePage /></>} />
                <Route path="/article/:articleId" element={<ArticlePage />} />
            </Routes>
        </Router>
    );
}

export default App;
