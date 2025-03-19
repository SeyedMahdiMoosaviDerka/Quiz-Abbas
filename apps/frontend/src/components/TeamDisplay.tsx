import React from 'react';

interface TeamDisplayProps {
  teamName: string;
  country: string;
  logo?: string;
  isRight?: boolean;
}

const TeamDisplay: React.FC<TeamDisplayProps> = ({
  teamName,
  country,
  logo,
  isRight = false,
}) => {
  return (
    <div
      className={`flex ${
        isRight ? 'flex-row-reverse' : 'flex-row'
      } items-center gap-2 max-w-[120px] sm:max-w-[150px]`}
    >
      {logo && (
        <img
          src={logo}
          alt={`${teamName} logo`}
          className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
        />
      )}
      <div className={`${isRight ? 'text-right' : 'text-left'}`}>
        <h3 className="text-sm sm:text-lg font-bold text-white mb-1 truncate w-full">
          {teamName}
        </h3>
        <div className="text-xs text-white/80">{country}</div>
      </div>
    </div>
  );
};

export default TeamDisplay;
