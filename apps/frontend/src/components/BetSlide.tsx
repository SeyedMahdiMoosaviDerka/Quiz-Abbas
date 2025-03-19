import React, { useState } from 'react';
import TeamDisplay from './TeamDisplay';
import RadioGroup from './RadioGroup';
import { Event, Questions, Team } from '../types';

// Using Event type for props
type BetSlideProps = {
  data: { title: string; subtitle: string; homeTeam: Team; awayTeam: Team };
  question: Questions;
  backgroundImage?: string;
};

const BetSlide: React.FC<BetSlideProps> = ({
  data,
  question,
  backgroundImage = 'https://same-assets.com/f/soccer-bg.jpg',
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  return (
    <div className="match-card w-full min-h-[450px] h-auto sm:h-[500px] relative pb-24 bg-gray-600 rounded-xl">
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top section with promo text */}
        <div className="text-center p-3 sm:p-4 mt-2">
          <div className="inline-block bg-black/50 px-2 sm:px-3 py-1 rounded-full text-xs text-white mb-1">
            {data.subtitle}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {data.title}
          </h1>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Teams section */}
          <div className="flex justify-between items-start px-4 sm:px-6 py-3 sm:py-4">
            <TeamDisplay
              teamName={data.homeTeam.name}
              country={data.homeTeam.country}
            />

            {/* Center prize display */}
            <div className="flex flex-col items-center mx-2">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary leading-none tracking-tight">
                  50.00
                </div>
                <div className="text-lg sm:text-xl text-white font-bold -mt-1">
                  USDT
                </div>
              </div>
            </div>

            <TeamDisplay
              teamName={data.awayTeam.name}
              country={data.awayTeam.country}
              isRight
            />
          </div>

          {/* Flexible space that grows or shrinks based on available height */}
          <div className="flex-1"></div>

          {/* Options section */}
          <div className="p-3 pt-4 sm:p-4 md:p-6 bg-black/60 rounded-t-xl">
            <div className="flex items-center justify-center mb-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-primary rounded-full mr-2">
                <span className="text-xs">⚽</span>
              </div>
              <h3 className="text-white font-medium text-sm sm:text-base">
                {question.title}
              </h3>
            </div>

            <RadioGroup
              options={question.answers}
              value={selectedOption}
              onChange={setSelectedOption}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetSlide;
