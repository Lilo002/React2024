import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App.tsx';
import { ErrorBoundary } from './errorBoundary/ErrorBoundary.tsx';
import image from './assets/error.png';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        <div className="error">
          <h1>Oops, we crashed...</h1>
          <img className="error-img" src={image} alt="error" />
        </div>
      }
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
