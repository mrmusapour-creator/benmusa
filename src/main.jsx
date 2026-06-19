import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import './styles.css';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/benmusa/service-worker.js').catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
