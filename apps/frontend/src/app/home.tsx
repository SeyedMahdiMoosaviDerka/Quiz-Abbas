'use client';

import React, { useState } from 'react';
import PickAWinHeader from '../components/PickAWinHeader';
import EventRow from '../components/EventRow';
import BetCarousel from '../components/BetCarousel';
import { Event } from '../types';

// Mock data for events
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'WIN A 50.00 USDT FREE BET',
    subtitle: 'Serie A - Sunday 20:45',
    homeTeam: {
      name: 'Juventus Turin',
      country: 'Italy',
      logo: 'https://same-assets.com/f/juventus-logo.png',
    },
    awayTeam: {
      name: 'SSC Napoli',
      country: 'Italy',
      logo: 'https://same-assets.com/f/napoli-logo.png',
    },
    questions: [
      {
        title: 'Numbers of goals',
        answers: [
          { value: '0', label: '0' },
          { value: '1', label: '1' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
          { value: '6+', label: '6+' },
        ],
      },
      {
        title: 'Numbers of goals2',
        answers: [
          { value: '0', label: '0' },
          { value: '1', label: '1' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
          { value: '6+', label: '6+' },
        ],
      },
    ],
    userAnswers: [],
    backgroundImage: 'https://same-assets.com/f/soccer-stadium-bg.jpg',
  },
  {
    id: '2',
    title: 'WIN A 25.00 USDT FREE BET',
    subtitle: 'Premier League - Saturday 18:30',
    homeTeam: {
      name: 'Newcastle United',
      country: 'England',
      logo: 'https://same-assets.com/f/newcastle-logo.png',
    },
    awayTeam: {
      name: 'Manchester City',
      country: 'England',
      logo: 'https://same-assets.com/f/mancity-logo.png',
    },
    questions: [
      {
        title: 'Numbers of goals',
        answers: [
          { value: '0', label: '0' },
          { value: '1', label: '1' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
          { value: '6+', label: '6+' },
        ],
      },
      {
        title: 'Numbers of goals2',
        answers: [
          { value: '0', label: '0' },
          { value: '1', label: '1' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
          { value: '6+', label: '6+' },
        ],
      },
    ],
    userAnswers: [],
    backgroundImage: 'https://same-assets.com/f/premier-league-stadium.jpg',
  },
  {
    id: '3',
    title: 'WIN A 30.00 USDT FREE BET',
    subtitle: 'La Liga - Sunday 21:00',
    homeTeam: {
      name: 'Nottingham Forest',
      country: 'England',
      logo: 'https://same-assets.com/f/nottingham-logo.png',
    },
    awayTeam: {
      name: 'SSC Napoli',
      country: 'Italy',
      logo: 'https://same-assets.com/f/napoli-logo.png',
    },
    questions: [
      {
        title: 'Numbers of goals',
        answers: [
          { value: '0', label: '0' },
          { value: '1', label: '1' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
          { value: '6+', label: '6+' },
        ],
      },
      {
        title: 'Numbers of goals2',
        answers: [
          { value: '0', label: '0' },
          { value: '1', label: '1' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
          { value: '6+', label: '6+' },
        ],
      },
    ],
    userAnswers: [],
    backgroundImage: 'https://same-assets.com/f/colosseum-bg.jpg',
  },
];

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleBackToList = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-screen-lg mx-auto">
        <PickAWinHeader title="Pick 4 Win" />

        {!selectedEvent ? (
          // Show list of events
          <div className="px-4 py-6">
            <h1 className="text-xl font-bold mb-6 text-foreground">
              Available Events
            </h1>

            <div className="space-y-4">
              {mockEvents.map((event, index) => (
                <EventRow
                  key={index}
                  event={event}
                  onSelect={handleSelectEvent}
                />
              ))}
            </div>
          </div>
        ) : (
          // Show selected event with betting options
          <div className="px-4 py-2">
            <button
              onClick={handleBackToList}
              className="mb-4 flex items-center text-sm text-foreground/80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to events
            </button>

            <BetCarousel event={selectedEvent} />
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm py-2 sm:py-3 px-2 sm:px-4">
        <div className="max-w-screen-lg mx-auto flex items-center justify-between">
          <div></div>
          <button className="bg-black/50 hover:bg-black/70 text-xs text-white/80 rounded-full px-3 py-1 transition-colors">
            How to play
          </button>
        </div>
      </div>
    </div>
  );
}
