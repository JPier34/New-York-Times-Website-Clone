import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import "../App.css";
import "../index.css";

const ArticlePage = () => {
  const location = useLocation();
  const [article, setArticle] = useState(null);
  const [articleImage, setArticleImage] = useState(""); // Aggiungi un nuovo stato per l'immagine
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_NY_TIMES_API_KEY;

  useEffect(() => {
    console.log("Location state:", location.state); // Log per verificare lo stato della location

    if (!location.state || !location.state.url) {
      console.log("No URL found in state.");
      setError("Nessun URL dell'articolo fornito.");
      return;
    }

    const fetchArticle = async () => {
      setLoading(true);
      setError(null); // Reset error at start

      try {
        console.log("Fetching article data..."); // Log per monitorare la richiesta
        const response = await axios.get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
          {
            params: {
              fq: `url:"${location.state.url}"`, // Usa l'URL dinamico dalla location
              "api-key": apiKey,
            },
          }
        );

        console.log("API Response:", response.data); // Log della risposta API
        const docs = response.data?.response?.docs;

        if (docs && docs.length > 0) {
          const article = docs[0]; // L'articolo restituito

          // Estrai i dati dell'articolo
          const articleImage = article.multimedia?.default?.url || ""; // Ottieni l'URL dell'immagine di default

          setArticle(article); // Imposta l'articolo
          setArticleImage(articleImage); // Imposta l'immagine
        } else {
          console.log("No articles found in the response.");
          setError("Articolo non trovato.");
        }
      } catch (error) {
        console.error("Error fetching article:", error); // Log dell'errore di richiesta
        setError("Errore nel caricamento dell'articolo.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [location.state, apiKey]);

  // Se in caricamento
  if (loading) return <p>Caricamento...</p>;

  // Se c'è un errore
  if (error) return <p>{error}</p>;

  console.log("Article data:", article); // Log per vedere i dati dell'articolo

  return (
    <>
      <div className="article-detail">
        {/* L'immagine viene inserita nell'area corretta della griglia */}
        {articleImage && (
          <img
            src={articleImage}
            alt="Article Image"
            className="article-detail-image"
          />
        )}

        {/* Titolo dell'articolo */}
        {article?.headline?.main && (
          <div className="article-title">
            <h1>{article.headline.main}</h1>
          </div>
        )}

        {/* Data di pubblicazione */}
        {article?.pub_date && (
          <div className="article-pub-date">
            <span>{new Date(article.pub_date).toLocaleDateString()}</span>
          </div>
        )}

        {/* Autore dell'articolo */}
        {article?.byline?.original && (
          <div className="article-author">
            <span>{article.byline.original}</span>
          </div>
        )}

        {/* Lead Paragraph */}
        {article?.abstract && (
          <div className="lead-paragraph">
            <p>{article.abstract}</p>
          </div>
        )}

        {/* Link all'articolo completo */}
        {article?.web_url && (
          <div className="article-link">
            <a
              href={article.web_url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-full-article"
            >
              Leggi l'articolo completo
            </a>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer className="footer" />
    </>
  );
};

export default ArticlePage;
