/* import React from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetail = ({ articles }) => {
  const { id } = useParams();  // Ottieni l'ID dell'articolo dalla URL
  const article = articles.find((article) => article.id === parseInt(id));

  if (!article) {
    return <div>Articolo non trovato!</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
*/