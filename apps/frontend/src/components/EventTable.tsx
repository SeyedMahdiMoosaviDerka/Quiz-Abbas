import React from 'react';
import { EventWithAnswers } from '../data/dummyData';

interface EventTableProps {
  events: EventWithAnswers[];
  sortBy: 'name' | 'answers';
  filterSport: string;
  onSortChange: (sortBy: 'name' | 'answers') => void;
  onFilterChange: (sport: string) => void;
  onViewAnswers: (event: EventWithAnswers) => void;
  onEditEvent: (event: EventWithAnswers) => void;
  onDeleteEvent: (id: number) => void;
}

const EventTable: React.FC<EventTableProps> = ({
  events,
  sortBy,
  filterSport,
  onSortChange,
  onFilterChange,
  onViewAnswers,
  onEditEvent,
  onDeleteEvent,
}) => {
  const sortedEvents = [...events].sort((a, b) =>
    sortBy === 'name'
      ? a.name.localeCompare(b.name)
      : b.answers.length - a.answers.length
  );

  const filteredEvents = filterSport
    ? sortedEvents.filter((e) =>
        e.sportType?.toLowerCase().includes(filterSport.toLowerCase())
      )
    : sortedEvents;

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex gap-4">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as 'name' | 'answers')}
          className="bg-muted text-foreground p-2 rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="answers">Sort by Answers</option>
        </select>
        <input
          type="text"
          placeholder="Filter by sport..."
          value={filterSport}
          onChange={(e) => onFilterChange(e.target.value)}
          className="bg-muted text-foreground p-2 rounded"
        />
      </div>
      <table className="min-w-full bg-background text-foreground rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Sport</th>
            <th className="py-2 px-4">Start Time</th>
            <th className="py-2 px-4">Answers</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.id} className="border-t border-muted">
              <td className="py-2 px-4">{event.name}</td>
              <td className="py-2 px-4">{event.sportType || 'N/A'}</td>
              <td className="py-2 px-4">
                {new Date(event.startTime).toLocaleString()}
              </td>
              <td className="py-2 px-4">{event.answers.length}</td>
              <td className="py-2 px-4 flex gap-2">
                <button
                  onClick={() => onViewAnswers(event)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md text-xs hover:bg-green-600 transition-colors"
                >
                  View Answers
                </button>
                <button
                  onClick={() => onEditEvent(event)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md text-xs hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteEvent(event.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-xs hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
