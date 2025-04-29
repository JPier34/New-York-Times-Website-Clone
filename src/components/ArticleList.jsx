import React from "react";
import { Link } from "react-router-dom";

const ArticleList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <div className="article-list">
      <ul>
        {articles.map((article, index) => (
          <li key={article.url || index} className="article-item">
            <Link
              to="/article"
              state={{ url: article.url }} // Passiamo l'URL dell'articolo tramite 'state'
              className="article-link-button"
            >
              <div className="article-content">
                {article.multimedia && article.multimedia.length > 0 && (
                  <img
                    src={article.multimedia[0]?.url || ""}
                    alt={article.title}
                    className="article-image"
                  />
                )}
                <h3 className="article-title">{article.title || "Untitled"}</h3>
              </div>
            </Link>

            {article.abstract && (
              <p className="article-summary">{article.abstract}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
