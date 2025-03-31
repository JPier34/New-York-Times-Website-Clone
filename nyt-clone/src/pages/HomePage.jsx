import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ArticleList from '../components/ArticleList';
import axios from 'axios';
import RelatedContent from '../components/RelatedContent';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

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
    const articleId = url.split('/').pop().split('.')[0];
    navigate(`/article/${articleId}`); // Naviga alla pagina dell'articolo
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
    </>
  );
};

export default HomePage;
