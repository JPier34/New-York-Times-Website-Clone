import React from 'react';  // Importa React
import ReactDOM from 'react-dom/client';  // Importa ReactDOM per creare la root
import App from './App';  // Importa il componente principale
import { AppProvider } from './context/AppContext';  // Importa il provider del contesto

// Crea la root per React 18 e renderizza l'app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <AppProvider>  
    <App />
  </AppProvider> 
  </React.StrictMode>
);
