import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router';

interface PickAWinHeaderProps {
  title: string;
}

const PickAWinHeader: React.FC<PickAWinHeaderProps> = ({ title }) => {
  return (
    <div className="py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-muted flex items-center justify-center">
          <span className="text-xs" role="img" aria-label="">
            🎮
          </span>
        </div>
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/panel">
          <button className="text-foreground px-3 py-1 text-sm">Panel</button>
        </Link>
        <Link to="/">
          <button className="text-foreground px-3 py-1 text-sm">Home</button>
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default PickAWinHeader;
