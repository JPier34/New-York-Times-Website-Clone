import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import ArticleDetail from "../components/ArticleDetail";
import RelatedContent from "../components/RelatedContent";

const ArticlePage = () => {
  const { articleId } = useParams(); // Ora contiene il web_url codificato
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_NY_TIMES_API_KEY;

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        // Usa l'URL completo dell'articolo per fare la ricerca
        const response = await axios.get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:"${decodeURIComponent(articleId)}"&api-key=${apiKey}`
        );
    
        const articleData = response.data?.response?.docs[0]; // Ottieni il primo risultato
        if (articleData) {
          setArticle(articleData);
        } else {
          setError("Articolo non trovato.");
        }
      } catch (error) {
        setError("Errore nel caricamento dell'articolo.");
      } finally {
        setLoading(false);
      }
    };
    
  
    fetchArticle();
  }, [articleId, apiKey]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <div className="article-detail-layout">
        {/* Articolo */}
        <ArticleDetail article={article} />
        {/* RelatedContent sulla destra */}
        <RelatedContent className="related-detail-content" />
      </div>
    </>
  );
};

export default ArticlePage;

/*
  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId, apiKey]);

  if (loading) return <p>Caricamento...</p>; // Mostra il loader mentre i dati vengono caricati
  if (error) return <p>{error}</p>; // Mostra l'errore se c'è

  return (
    <>
      <Header />
      <div className="article-detail-layout">
      
        <ArticleDetail article={article} />
        

        <RelatedContent className="related-detail-content" />
      </div>
    </>
  );
};

export default ArticlePage; */