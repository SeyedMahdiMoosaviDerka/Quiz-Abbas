import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/ui/ThemeProvider';
import { QuizProvider } from './contexts/QuizContext';
import App from './app/app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <QuizProvider>
          <App />
        </QuizProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
