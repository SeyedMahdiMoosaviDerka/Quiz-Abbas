import React, { useEffect, useState } from 'react';
import EventRow from '../components/EventRow';
import BetCarousel from '../components/BetCarousel';
import SummaryCard from '../components/SummaryCard';
import { useQuiz } from '../contexts/QuizContext';
import { fetchEvents } from '../api/events';
import { Event } from '../types';

export default function Home() {
  const { currentEvent, setCurrentEvent, submittedEvents } = useQuiz();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleSelectEvent = (event: Event) => {
    setCurrentEvent(event);
  };

  const handleBackToList = () => {
    setCurrentEvent(null);
  };

  if (loading) {
    return <div className="px-4 py-6 text-foreground">Loading events...</div>;
  }
  return (
    <div className="px-4 py-6 bg-background text-foreground">
      {!currentEvent ? (
        <div>
          <h1 className="text-xl font-bold mb-6">Available Events</h1>
          <div className="space-y-4">
            {events.map((event) => (
              <EventRow
                key={event.id}
                event={event}
                onSelect={handleSelectEvent}
              />
            ))}
          </div>
        </div>
      ) : submittedEvents.has(currentEvent.id) ? (
        <div>
          <button
            onClick={handleBackToList}
            className="mb-4 flex items-center text-sm text-muted-foreground"
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
          <SummaryCard event={currentEvent} />
        </div>
      ) : (
        <div>
          <button
            onClick={handleBackToList}
            className="mb-4 flex items-center text-sm text-muted-foreground"
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
          <BetCarousel event={currentEvent} />
        </div>
      )}
    </div>
  );
}
