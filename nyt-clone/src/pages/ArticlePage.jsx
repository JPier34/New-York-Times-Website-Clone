import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import ArticleDetail from "../components/ArticleDetail"; 
import RelatedContent from "../components/RelatedContent";

const ArticlePage = () => {
  const { articleId } = useParams(); // Ottieni l'ID dell'articolo dalla URL
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_NY_TIMES_API_KEY;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${articleId}&api-key=${apiKey}`
        );
        const articleData = response.data?.response?.docs[0];
        if (articleData) {
          setArticle(articleData);
        } else {
          setError("Articolo non trovato.");
        }
      } catch (error) {
        setError("Errore nel caricamento dell'articolo.");
      }
    };

    fetchArticle();
  }, [articleId, apiKey]);

  if (error) return <p>{error}</p>;
  if (!article) return <p>Caricamento...</p>;

  return (
    <>
      <Header />
      <div className="article-detail-layout">
          {/* Articolo */}
          <ArticleDetail article={article}/>
          {/* RelatedContent sulla destra */}
          <RelatedContent className="related-detail-content"/>
        </div>
    </>
  );
};

export default ArticlePage;
