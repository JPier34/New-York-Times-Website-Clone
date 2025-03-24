import React, { useContext, useEffect } from 'react';

import { AppContext } from '../context/AppContext';  // Importa il contesto

import ArticleList from '../components/ArticleList';  // Importa il componente per visualizzare la lista degli articoli

import axios from 'axios';



const HomePage = () => {
  const { articles, setArticles, setLoading, setError } = useContext(AppContext); // Ottieni il contesto
  const apiKey = import.meta.env.VITE_NY_TIMES_API_KEY; // Ottieni la chiave API dai file di ambiente

  const fetchArticles = async () => {
    setLoading(true);  // Imposta lo stato di caricamento a true

    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`
      );
      
      console.log("Risposta API:", response.data); // Log della risposta API

      setArticles(response.data.results);  // Salva gli articoli nel contesto
      setLoading(false);  // Imposta lo stato di caricamento a false
    } catch (error) {
      setError('Errore nel caricamento degli articoli');  // Imposta l'errore
      setLoading(false);  // Imposta lo stato di caricamento a false
    }
  };

  useEffect(() => {
    fetchArticles();  // Carica gli articoli quando il componente si monta
  }, [setArticles, setLoading, setError]);

  return (
    <div>
      <h1>Top Stories</h1>
      <ArticleList articles={articles} />  {/* Passa gli articoli come props */}
    </div>
  );
};




export default HomePage;