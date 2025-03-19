// frontend/src/components/ui/EventRow.tsx
import React from 'react';
import TeamDisplay from './TeamDisplay';
import { useCountdown } from '../../hooks/useCountdown';
import { Event } from '../../types';

interface EventRowProps {
  event: Event;
  onSelect: (event: Event) => void;
}

const EventRow: React.FC<EventRowProps> = ({ event, onSelect }) => {
  const { timeLeft, hasStarted } = useCountdown(event.startTime);

  return (
    <div
      className="bg-[#2A2E34] p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => !hasStarted && onSelect(event)} // Disable click if started
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <TeamDisplay
            teamName={event.homeTeam.name}
            country={event.homeTeam.country}
          />
          <div className="text-white text-sm">vs</div>
          <TeamDisplay
            teamName={event.awayTeam.name}
            country={event.awayTeam.country}
            isRight
          />
        </div>
        <div className="text-right">
          <div className="text-lg text-white font-bold">{event.name}</div>
          <div className="text-xs text-white/70">{event.info}</div>
          <div className="text-xs text-white/70">Time Left: {timeLeft}</div>
        </div>
        <div className="flex gap-2">
          <button
            className={`bg-primary px-3 py-1 rounded-full text-xs text-white ${
              hasStarted
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-primary-dark'
            }`}
            disabled={hasStarted} // Disable button if started
          >
            {hasStarted ? 'Quiz Closed' : 'Start Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventRow;
