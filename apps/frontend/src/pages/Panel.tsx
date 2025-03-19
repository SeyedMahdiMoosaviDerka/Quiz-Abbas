// frontend/src/pages/Panel.tsx
import React, { useEffect, useState } from 'react';
import { useTheme } from '../components/ui/ThemeProvider';
import {
  fetchEventsWithAnswers,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../api/events';
import EventTable from '../components/EventTable';
import AnswersModal from '../components/AnswersModal';
import EventFormModal from '../components/EventFormModal';
import { EventWithAnswers } from '../api/events';

interface FormData {
  name: string;
  info: string;
  startTime: string;
  sportType: string;
  homeTeamName: string;
  homeTeamCountry: string;
  awayTeamName: string;
  awayTeamCountry: string;
}

export default function PanelPage() {
  const { theme } = useTheme();
  const [answersModalOpen, setAnswersModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventWithAnswers | null>(
    null
  );
  const [events, setEvents] = useState<EventWithAnswers[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'answers'>('name');
  const [filterSport, setFilterSport] = useState<string>('');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEventsWithAnswers();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events with answers:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const openAnswersModal = (event: EventWithAnswers) => {
    setSelectedEvent(event);
    setAnswersModalOpen(true);
  };

  const closeAnswersModal = () => {
    setAnswersModalOpen(false);
    setSelectedEvent(null);
  };

  const openFormModal = (event?: EventWithAnswers) => {
    setSelectedEvent(event || null);
    setFormModalOpen(true);
  };

  const closeFormModal = () => {
    setFormModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCreateEvent = async (data: FormData) => {
    try {
      const newEvent = await createEvent({
        name: data.name,
        info: data.info,
        startTime: new Date(data.startTime).toISOString(),
        sportType: data.sportType,
        homeTeam: { name: data.homeTeamName, country: data.homeTeamCountry },
        awayTeam: { name: data.awayTeamName, country: data.awayTeamCountry },
      });
      setEvents([...events, { ...newEvent, answers: [] }]);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleUpdateEvent = async (data: FormData) => {
    if (!selectedEvent) return;
    try {
      const updatedEvent = await updateEvent(selectedEvent.id, {
        name: data.name,
        info: data.info,
        startTime: new Date(data.startTime).toISOString(),
        sportType: data.sportType,
        homeTeam: { name: data.homeTeamName, country: data.homeTeamCountry },
        awayTeam: { name: data.awayTeamName, country: data.awayTeamCountry },
      });
      setEvents(
        events.map((e) =>
          e.id === selectedEvent.id ? { ...e, ...updatedEvent } : e
        )
      );
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        setEvents(events.filter((e) => e.id !== id));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  if (loading) {
    return <div className="px-4 py-6 text-white">Loading events...</div>;
  }

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'text-white' : 'text-black'
      } pb-16`}
    >
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">All Events</h1>
            <button
              onClick={() => openFormModal()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-600 transition-colors"
            >
              Add Event
            </button>
          </div>
          <EventTable
            events={events}
            sortBy={sortBy}
            filterSport={filterSport}
            onSortChange={setSortBy}
            onFilterChange={setFilterSport}
            onViewAnswers={openAnswersModal}
            onEditEvent={openFormModal}
            onDeleteEvent={handleDeleteEvent}
          />
        </div>
      </div>
      {selectedEvent && (
        <AnswersModal
          isOpen={answersModalOpen}
          onClose={closeAnswersModal}
          event={selectedEvent}
        />
      )}
      <EventFormModal
        isOpen={formModalOpen}
        onClose={closeFormModal}
        onSubmit={selectedEvent ? handleUpdateEvent : handleCreateEvent}
        initialData={selectedEvent || undefined}
      />
    </div>
  );
}
