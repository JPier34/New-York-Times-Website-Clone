import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Caricamento Lazy
const HomePage = lazy(() => import("./pages/HomePage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const Header = lazy(() => import("./components/Header"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article" element={<ArticlePage />} />
        </Routes>
        <ToastContainer />
      </Suspense>
    </Router>
  );
}

export default App;
