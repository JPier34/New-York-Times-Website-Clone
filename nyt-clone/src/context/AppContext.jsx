import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);  // Stato per il caricamento
  const [error, setError] = useState(null);  // Stato per errori

  return (
    <AppContext.Provider value={{ articles, setArticles, loading, setLoading, error, setError }}>
      {children}
    </AppContext.Provider>
  );
};