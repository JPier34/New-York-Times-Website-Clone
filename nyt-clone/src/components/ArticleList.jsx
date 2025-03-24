import React from 'react';

const ArticleList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p>Nessun articolo trovato.</p>;
  }

  return (
    <div className="article-list">
    <h2 style={{ display: 'block' }}>Lista degli articoli</h2>
    <br />
    <div>
      <ul>
        {articles.map((article) => (
          <li key={article.id} className="article-item">
            {/* Link che porta al sito esterno dell'articolo */}
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-link">
              <div className="article-content">
                {/* Se l'articolo ha un'immagine, la visualizza */}
                {article.multimedia && article.multimedia.length > 0 && (
                  <img
                    src={article.multimedia[0].url}
                    alt={article.title}
                    className="article-image"
                  />
                )}
                {/* Titolo dell'articolo */}
                <h3 className="article-title">{article.title}</h3>
              </div>
            </a>
            {/* Abstract o descrizione breve dell'articolo */}
            {article.abstract && <p className="article-summary">{article.abstract}</p>}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default ArticleList;
