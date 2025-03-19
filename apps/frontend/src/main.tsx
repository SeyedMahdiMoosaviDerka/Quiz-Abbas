import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/home';
import { ThemeProvider } from './components/ThemeProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <main className="min-h-screen bg-background">
          <App />
        </main>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
