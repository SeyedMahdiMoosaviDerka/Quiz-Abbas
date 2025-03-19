import React, { useState } from 'react';
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

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: EventWithAnswers;
}

const EventFormModal: React.FC<EventFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<FormData>(
    initialData
      ? {
          name: initialData.name,
          info: initialData.info,
          startTime: initialData.startTime.slice(0, 16),
          sportType: initialData.sportType || '',
          homeTeamName: initialData.homeTeam.name,
          homeTeamCountry: initialData.homeTeam.country,
          awayTeamName: initialData.awayTeam.name,
          awayTeamCountry: initialData.awayTeam.country,
        }
      : {
          name: '',
          info: '',
          startTime: new Date().toISOString().slice(0, 16),
          sportType: '',
          homeTeamName: '',
          homeTeamCountry: '',
          awayTeamName: '',
          awayTeamCountry: '',
        }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 p-6 rounded-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          {initialData ? 'Edit Event' : 'Create Event'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Event Name"
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-md"
            required
          />
          <input
            type="text"
            name="info"
            value={formData.info}
            onChange={handleChange}
            placeholder="Event Info"
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-md"
            required
          />
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-md"
            required
          />
          <input
            type="text"
            name="sportType"
            value={formData.sportType}
            onChange={handleChange}
            placeholder="Sport Type"
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-md"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="homeTeamName"
              value={formData.homeTeamName}
              onChange={handleChange}
              placeholder="Home Team Name"
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md"
              required
            />
            <input
              type="text"
              name="homeTeamCountry"
              value={formData.homeTeamCountry}
              onChange={handleChange}
              placeholder="Home Team Country"
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md"
              required
            />
            <input
              type="text"
              name="awayTeamName"
              value={formData.awayTeamName}
              onChange={handleChange}
              placeholder="Away Team Name"
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md"
              required
            />
            <input
              type="text"
              name="awayTeamCountry"
              value={formData.awayTeamCountry}
              onChange={handleChange}
              placeholder="Away Team Country"
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventFormModal;
