'use client';

import React from 'react';
import { Event } from '../types';

interface EventRowProps {
  event: Event;
  onSelect: (event: Event) => void;
}

const EventRow: React.FC<EventRowProps> = ({ event, onSelect }) => {
  return (
    <div
      className="relative w-full h-80 sm:h-52 mb-4 p-4 rounded-xl overflow-hidden cursor-pointer"
      onClick={() => onSelect(event)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 ">
        <img
          src={
            event.backgroundImage ||
            'https://same-assets.com/f/soccer-stadium-bg.jpg'
          }
          alt="Match background"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-4">
        {/* Top row - Team names and scores */}
        <div className="flex justify-between items-center sm:items-start mb-auto gap-6 flex-col sm:flex-row">
          {/* Home Team */}
          <div className="flex flex-row sm:flex-col items-start justify-between w-full">
            <div className="text-sm text-primary font-bold mb-1">
              {event.homeTeam.country}
            </div>
            <div className="text-lg text-white font-bold">
              {event.homeTeam.name}
            </div>
            {event.homeTeam.logo && (
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-300 relative mt-1">
                <img
                  src={event.homeTeam.logo}
                  alt={`${event.homeTeam.name} logo`}
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* VS */}
          <div className="text-2xl text-white font-bold">VS</div>

          {/* Away Team */}
          <div className="flex flex-row sm:flex-col items-end justify-between w-full">
            <div className="text-sm text-primary font-bold mb-1">
              {event.awayTeam.country}
            </div>
            <div className="text-lg text-white font-bold">
              {event.awayTeam.name}
            </div>
            {event.awayTeam.logo && (
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-300 relative mt-1">
                <img
                  src={event.awayTeam.logo}
                  alt={`${event.awayTeam.name} logo`}
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom row - Bet info */}
        <div className="flex justify-between flex-col sm:flex-row gap-6 items-center mt-8 sm:mt-2">
          <div className="flex flex-col">
            <div className="text-lg text-white font-bold">
              Win a $50 Free Bet ✨
            </div>
            <div className="text-xs text-white/70">{event.subtitle}</div>
          </div>

          {/* Betting odds */}
          <div className="flex gap-2">
            <div className="bg-black/40 px-2 py-1 rounded-full text-xs text-white">
              02
            </div>
            <div className="bg-black/40 px-2 py-1 rounded-full text-xs text-white">
              16
            </div>
            <div className="bg-black/40 px-2 py-1 rounded-full text-xs text-white">
              45
            </div>
            <div className="bg-black/40 px-2 py-1 rounded-full text-xs text-white">
              48
            </div>

            <div className="bg-primary px-3 py-1 rounded-full text-xs text-white">
              Win 50 USDT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRow;
