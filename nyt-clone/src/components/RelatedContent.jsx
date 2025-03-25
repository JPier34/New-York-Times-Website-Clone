import React, { useState, useEffect } from "react";
import axios from "axios";

const RelatedContent = () => {
  const apiKey = import.meta.env.VITE_NY_TIMES_API_KEY;

  const [popularArticles, setPopularArticles] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [realTimeNews, setRealTimeNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Fetch articoli più popolari
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await axios.get(
          `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${apiKey}`
        );
        setPopularArticles(res.data.results.slice(0, 5)); // Mostriamo solo 5 risultati
      } catch (error) {
        console.error("Errore nel caricamento degli articoli più popolari", error);
      }
    };
    fetchPopular();
  }, []);

  // Fetch libri più venduti
  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`
        );
        setBestSellers(res.data.results.books.slice(0, 5));
      } catch (error) {
        console.error("Errore nel caricamento dei libri più venduti", error);
      }
    };
    fetchBestSellers();
  }, []);

  // Fetch news in tempo reale
  useEffect(() => {
    const fetchRealTimeNews = async () => {
      try {
        const res = await axios.get(
          `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${apiKey}`
        );
        setRealTimeNews(res.data.results.slice(0, 5));
      } catch (error) {
        console.error("Errore nel caricamento delle news in tempo reale", error);
      }
    };
    fetchRealTimeNews();
  }, []);

  // Funzione per cercare articoli tramite Article Search API
  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const res = await axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&api-key=${apiKey}`
      );
      setSearchResults(res.data.response.docs.slice(0, 5));
    } catch (error) {
      console.error("Errore nella ricerca degli articoli", error);
    }
  };

  return (
    <aside className="related-content bg-white text-black p-4 border-l border-gray-300">
      {/* Articoli più popolari */}
      <section>
        <h2 className="text-lg font-bold mb-2">📈 Articoli più popolari</h2>
        <ul>
          {popularArticles.map((article) => (
            <li key={article.id} className="mb-2">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Libri più venduti */}
      <section className="mt-4">
        <h2 className="text-lg font-bold mb-2">📚 Libri più venduti</h2>
        <ul>
          {bestSellers.map((book) => (
            <li key={book.rank} className="mb-2">
              <strong>{book.title}</strong> di {book.author}
            </li>
          ))}
        </ul>
      </section>

      {/* News in tempo reale */}
      <section className="mt-4">
        <h2 className="text-lg font-bold mb-2">⚡ News in tempo reale</h2>
        <ul>
          {realTimeNews.map((news) => (
            <li key={news.url} className="mb-2">
              <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {news.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Ricerca articoli */}
      <section className="mt-4">
        <h2 className="text-lg font-bold mb-2">🔎 Cerca articoli</h2>
        <input
          type="text"
          className="w-full p-2 border rounded-md mb-2"
          placeholder="Inserisci parola chiave"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="w-full bg-blue-600 text-white p-2 rounded-md">
          Cerca
        </button>
        {searchResults.length > 0 && (
          <ul className="mt-2">
            {searchResults.map((article) => (
              <li key={article.web_url} className="mb-2">
                <a href={article.web_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {article.headline.main}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  );
};

export default RelatedContent;
