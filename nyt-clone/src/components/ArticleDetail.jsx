import React from 'react';
import '../App.css';

const ArticleDetail = ({ article }) => {
  if (!article) {
    return <div className="article-detail error">Article not found!</div>;
  }

  return (
    <div className="article-detail">
      <h1 className="article-title">{article.headline.main}</h1>
      <p className="article-author">
        <strong>By:</strong> {article.byline?.original || 'Unknown Author'}
      </p>
      <p className="article-pub-date">
        <strong>Published on:</strong> {new Date(article.pub_date).toLocaleDateString()}
      </p>

      <div
        className="lead-paragraph"
        dangerouslySetInnerHTML={{ __html: article.lead_paragraph || '' }}
      /> {/* Render lead paragraph */}

      {article.multimedia && article.multimedia.length > 0 && (
        <img
          src={`https://www.nytimes.com/${article.multimedia[0].url}`}
          alt={article.headline.main}
          className="article-detail-image"
        />
      )}

      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: article.body || '' }}
      /> {/* Render full article content */}

      <a
        href={article.web_url}
        target="_blank"
        rel="noopener noreferrer"
        className="read-full-article"
      >
        Read full article
      </a>
    </div>
  );
};

export default ArticleDetail;
