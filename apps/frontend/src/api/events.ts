import { Event, AnswerSubmission } from '../types';
import { dummyEvents, dummyEventsWithAnswers } from '../data/dummyData';

const DEVENVIRONMENT = false;

const API_URL = 'http://localhost:3000/api';

export interface EventWithAnswers extends Event {
  answers: { id: string; answer: string }[];
}

export const fetchEvents = async (): Promise<Event[]> => {
  if (DEVENVIRONMENT) {
    return dummyEvents;
  }
  const response = await fetch(`${API_URL}/events`);
  if (!response.ok) throw new Error('Failed to fetch events');
  return response.json();
};

export const fetchEventsWithAnswers = async (): Promise<EventWithAnswers[]> => {
  if (DEVENVIRONMENT) {
    return dummyEventsWithAnswers;
  }
  const response = await fetch(`${API_URL}/admin/events-with-answers`);
  if (!response.ok) throw new Error('Failed to fetch events with answers');
  return response.json();
};

export const createEvent = async (
  eventData: Omit<Event, 'id' | 'quizzes'>
): Promise<Event> => {
  if (DEVENVIRONMENT) {
    const newEvent = { ...eventData, id: dummyEvents.length + 1, quizzes: [] };
    dummyEvents.push(newEvent);
    return newEvent;
  }
  const response = await fetch(`${API_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) throw new Error('Failed to create event');
  return response.json();
};

export const updateEvent = async (
  id: number,
  eventData: Partial<Omit<Event, 'id'>>
): Promise<Event> => {
  if (DEVENVIRONMENT) {
    const eventIndex = dummyEvents.findIndex((e) => e.id === id);
    if (eventIndex === -1) throw new Error('Event not found');
    dummyEvents[eventIndex] = { ...dummyEvents[eventIndex], ...eventData };
    return dummyEvents[eventIndex];
  }
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) throw new Error('Failed to update event');
  return response.json();
};

export const deleteEvent = async (id: number): Promise<void> => {
  if (DEVENVIRONMENT) {
    const eventIndex = dummyEvents.findIndex((e) => e.id === id);
    if (eventIndex === -1) throw new Error('Event not found');
    dummyEvents.splice(eventIndex, 1);
    return;
  }
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete event');
};

export const submitAnswers = async (
  submission: AnswerSubmission
): Promise<void> => {
  if (DEVENVIRONMENT) {
    console.log('Answers submitted (dev mode):', submission);
    return;
  }
  const response = await fetch(`${API_URL}/answers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  });
  if (!response.ok) throw new Error('Failed to submit answers');
};
