import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Panel from '../pages/Panel';
import PickAWinHeader from '../components/PickAWinHeader';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <PickAWinHeader title="Sports Quiz" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </div>
  );
};

export default App;
