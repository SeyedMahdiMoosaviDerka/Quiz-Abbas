import React from 'react';
import { Team } from '../../types';
import RadioGroup from './RadioGroup';

interface BetSlideProps {
  id: string;
  title: string;
  subtitle: string;
  homeTeam: Team;
  awayTeam: Team;
  options: { title: string; choices: string[] }; // Adjusted to string[]
  selectedOption: string;
  onChange: (value: string) => void;
}

const BetSlide: React.FC<BetSlideProps> = ({
  id,
  title,
  subtitle,
  homeTeam,
  awayTeam,
  options,
  selectedOption,
  onChange,
}) => {
  return (
    <div className="w-full p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
      <div className="flex justify-between mb-6">
        <div className="text-center">
          <p className="text-lg font-bold">{homeTeam.name}</p>
          <p className="text-sm text-gray-400">{homeTeam.country}</p>
          {homeTeam.logoUrl && (
            <img
              src={homeTeam.logoUrl}
              alt={homeTeam.name}
              className="w-12 h-12 mx-auto mt-2"
            />
          )}
        </div>
        <div className="text-center flex items-center">
          <span className="text-2xl font-bold">VS</span>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{awayTeam.name}</p>
          <p className="text-sm text-gray-400">{awayTeam.country}</p>
          {awayTeam.logoUrl && (
            <img
              src={awayTeam.logoUrl}
              alt={awayTeam.name}
              className="w-12 h-12 mx-auto mt-2"
            />
          )}
        </div>
      </div>
      <RadioGroup
        label={options.title}
        name={`quiz-${id}`}
        options={options.choices} // Pass string[] directly
        value={selectedOption}
        onChange={onChange}
      />
    </div>
  );
};

export default BetSlide;
