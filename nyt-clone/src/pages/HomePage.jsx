import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ArticleList from '../components/ArticleList';
import axios from 'axios';
import RelatedContent from '../components/RelatedContent';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../App.css';
import '../index.css';

const HomePage = () => {
  const { articles, setArticles, setLoading, setError } = useContext(AppContext);
  const apiKey = import.meta.env.VITE_NY_TIMES_API_KEY;
  const navigate = useNavigate();

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`
      );
      setArticles(response.data.results.slice(0, 10));
      setLoading(false);
    } catch (error) {
      setError('Error fetching articles');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [setArticles, setLoading, setError]);

  const fetchArticleContent = (url) => {
    const encodedUrl = encodeURIComponent(url); // Codifica l'URL per usarlo nella URL
    navigate(`/article/${encodedUrl}`); // Passa il web_url come parametro
  };
  
  return (
    <>
      <Header />
      <section className="news-layout">
          <ArticleList
            articles={articles}
            onFetchArticleContent={fetchArticleContent}
          />
        <RelatedContent />
      </section>
      <Footer className="footer"/>
    </>
  );
};

export default HomePage;
