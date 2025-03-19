// frontend/src/components/EventTable.tsx
import React from 'react';
import { EventWithAnswers } from '../api/events';

interface EventTableProps {
  events: EventWithAnswers[];
  sortBy: 'name' | 'answers';
  filterSport: string;
  onSortChange: (sortBy: 'name' | 'answers') => void;
  onFilterChange: (filter: string) => void;
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
  const sortedEvents = [...events]
    .sort((a, b) =>
      sortBy === 'name'
        ? a.name.localeCompare(b.name)
        : b.answers.length - a.answers.length
    )
    .filter(
      (e) =>
        !filterSport || e.sportType?.toLowerCase() === filterSport.toLowerCase()
    );

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex gap-4">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as 'name' | 'answers')}
          className="bg-gray-700 text-white px-2 py-1 rounded-md"
        >
          <option value="name">Sort by Name</option>
          <option value="answers">Sort by Answer Count</option>
        </select>
        <input
          type="text"
          placeholder="Filter by sport"
          value={filterSport}
          onChange={(e) => onFilterChange(e.target.value)}
          className="bg-gray-700 text-white px-2 py-1 rounded-md"
        />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left p-4 font-semibold">Event</th>
            <th className="text-left p-4 font-semibold">Teams</th>
            <th className="text-left p-4 font-semibold">Option Type</th>
            <th className="text-center p-4 font-semibold">Answers</th>
            <th className="text-center p-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEvents.map((event) => (
            <tr key={event.id} className="border-b border-gray-700">
              <td className="p-4">
                <div className="font-medium">{event.name}</div>
                <div className="text-xs text-gray-400">{event.info}</div>
              </td>
              <td className="p-4">
                <div>
                  {event.homeTeam.name}
                  <div className="text-xs text-gray-400">vs</div>
                  {event.awayTeam.name}
                </div>
              </td>
              <td className="p-4">{event.quizzes[0]?.question}</td>
              <td className="p-4 text-center">{event.answers.length}</td>
              <td className="p-4 text-center flex gap-2 justify-center">
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
