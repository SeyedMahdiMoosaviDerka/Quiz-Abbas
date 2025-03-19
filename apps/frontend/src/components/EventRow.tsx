import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { Event } from '../types';

interface EventRowProps {
  event: Event;
  onSelect: (event: Event) => void;
}

const EventRow: React.FC<EventRowProps> = ({ event, onSelect }) => {
  const { timeLeft, hasStarted } = useCountdown(event.startTime);

  return (
    <div
      className="bg-background rounded-lg shadow p-4 flex flex-col sm:flex-row items-center justify-between animate-fade-in"
      onClick={() => !hasStarted && onSelect(event)}
    >
      <div className="flex items-center gap-4">
        <img
          src={event.homeTeam.logoUrl}
          alt={`${event.homeTeam.name} logo`}
          className="w-8 h-8"
        />
        <div>
          <div className="text-lg text-white font-bold">{event.name}</div>
          <div className="text-xs text-white/70">{event.info}</div>
          <div className="text-xs text-white/70">Time Left: {timeLeft}</div>
        </div>
        <img
          src={event.awayTeam.logoUrl}
          alt={`${event.awayTeam.name} logo`}
          className="w-8 h-8"
        />
      </div>
      <button
        className={`bg-primary px-3 py-1 rounded-full text-xs text-white ${
          hasStarted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
        }`}
        disabled={hasStarted}
      >
        {hasStarted ? 'Quiz Closed' : 'Start Quiz'}
      </button>
    </div>
  );
};

export default EventRow;
