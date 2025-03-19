import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { ThemeProvider } from './components/ThemeProvider';
import { BrowserRouter, Route, Routes } from 'react-router';

import Home from './pages/home/page';
import PanelPage from './pages/panel/page';
import MainLayout from './app/layout/main-layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/panel" element={<PanelPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
