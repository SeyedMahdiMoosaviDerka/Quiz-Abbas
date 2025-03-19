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
  isRight = false
}) => {
  return (
    <div className={`flex flex-col ${isRight ? 'items-end' : 'items-start'} max-w-[120px] sm:max-w-[150px]`}>
      <h3 className="text-sm sm:text-lg font-bold text-white mb-1 truncate w-full">
        {teamName}
      </h3>
      <div className="text-xs text-white/80">{country}</div>
    </div>
  );
};

export default TeamDisplay;
