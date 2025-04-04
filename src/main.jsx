import React from 'react';  // Import React
import ReactDOM from 'react-dom/client';  // Import ReactDOM to create the root
import App from './App';  // Import the main App component
import { AppProvider } from './context/AppContext';  // Import the AppProvider for context management

// Create a root element using ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <AppProvider>  
    <App />
  </AppProvider> 
  </React.StrictMode>
);
