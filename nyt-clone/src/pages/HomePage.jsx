import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext'; 
import ArticleList from '../components/ArticleList';
import RelatedContent from '../components/RelatedContent';
import axios from 'axios';
import '../App.css';

const HomePage = () => {
  const { articles, setArticles, setLoading, setError } = useContext(AppContext);
  const apiKey = import.meta.env.VITE_NY_TIMES_API_KEY;

  const fetchArticles = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`
      );

      console.log("Risposta API:", response.data);
      setArticles(response.data.results);
      setLoading(false);
    } catch (error) {
      setError('Errore nel caricamento degli articoli');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [setArticles, setLoading, setError]);

  return (
    <>
      <header className="header">
        <h1>The (Almost) New York Times</h1>
      </header>

      <section className="news-layout">
        {/* Top Stories */}
        <div className="top-stories">
          <ArticleList articles={articles} />
        </div>

        {/* Related Content (Sidebar) */}
        <RelatedContent />
      </section>
    </>
  );
};

export default HomePage;
