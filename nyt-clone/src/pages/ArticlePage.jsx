import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ArticlePage = () => {
    const { id } = useParams();  // Ottieni l'ID dell'articolo dalla URL
    const { articles, loading, error } = useContext(AppContext);  // Ottieni gli articoli dal contesto
    const [article, setArticle] = useState(null);  // Stato per l'articolo specifico
  
    useEffect(() => {
      if (articles.length > 0) {
        // Troviamo l'articolo in base all'ID
        const foundArticle = articles.find(
          (article) => article.url.split("/").pop() === id
        );
        setArticle(foundArticle);
      }
    }, [id, articles]); // Eseguiamo ogni volta che cambia l'ID o gli articoli
  
    if (loading) {
      return <div>Caricamento in corso...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    if (!article) {
      return <div>Articolo non trovato!</div>;
    }
  
    return (
      <div>
        <h1>{article.title}</h1>
        <p>{article.abstract}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Leggi l'articolo completo
        </a>
      </div>
    );
  };
  
  export default ArticlePage;
