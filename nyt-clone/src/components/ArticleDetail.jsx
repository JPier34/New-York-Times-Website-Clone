import React from 'react';
import { useEffect } from 'react';
import '../App.css';

const ArticleDetail = ({ article }) => {

  useEffect(() => {
    console.log("Article Data:", article); // Log della risposta API per ispezionare i dati
  }, [article]);

  if (!article) {
    return <div className="article-detail error">Article not found!</div>;
  }

  const handleReadFullArticle = () => {
    if (article?.web_url) {
      window.open(article.web_url, '_blank');
    } else {
      console.error('Article URL not available');
      // Puoi anche mostrare un messaggio visivo di errore per l'utente
    }
  };

  return (
    <div className="article-detail">
      <h1 className="article-title">{article.headline?.main || 'No Title Available'}</h1>
      <p className="article-author">
        {article.byline?.original || 'Unknown Author'}
      </p>
      <p className="article-pub-date">
        <strong>Published:</strong> {new Date(article.pub_date).toLocaleDateString() || 'No Date Available'}
      </p>

      <div
        className="lead-paragraph"
        dangerouslySetInnerHTML={{ __html: article.lead_paragraph || '' }}
      /> {/* Render lead paragraph */}

      {article.multimedia && article.multimedia.length > 0 && (
        <img
          src={`https://www.nytimes.com/${article.multimedia[0].url}`}
          alt={article.headline?.main || 'Article Image'}
          className="article-detail-image"
        />
      )}

      <div className="article-link">
        <button className="read-full-article" onClick={handleReadFullArticle}>
          Read full article
        </button>
      </div>
    </div>
  );
};

export default ArticleDetail;
