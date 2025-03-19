'use client';

import { useState } from 'react';
import { useTheme } from '../../components/ThemeProvider';

const Modal = ({
  isOpen,
  onClose,
  title,
  answers,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  answers: Array<{ id: string; answer: string }>;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 p-4 rounded-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">
            User Answers: {title}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left py-2 border-b border-gray-700 text-gray-300">
                User ID
              </th>
              <th className="text-left py-2 border-b border-gray-700 text-gray-300">
                Answer
              </th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer) => (
              <tr key={answer.id}>
                <td className="py-2 border-b border-gray-700 text-white">
                  {answer.id}
                </td>
                <td className="py-2 border-b border-gray-700 text-white">
                  {answer.answer}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function PanelPage() {
  const { theme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    answers: Array<{ id: string; answer: string }>;
  } | null>(null);

  const events = [
    {
      id: '1',
      title: 'WIN A 50.00 USDT FREE BET',
      subtitle: 'Serie A - Sunday 20:45',
      homeTeam: 'Juventus Turin',
      awayTeam: 'SSC Napoli',
      optionType: 'Numbers of goals',
      answers: [
        { id: 'user1', answer: '0' },
        { id: 'user2', answer: '3' },
        { id: 'user3', answer: '1' },
        { id: 'user4', answer: '4' },
      ],
    },
    {
      id: '2',
      title: 'WIN A 50.00 USDT FREE BET',
      subtitle: 'Premier League - Saturday 18:30',
      homeTeam: 'Newcastle United',
      awayTeam: 'Manchester City',
      optionType: 'First goal scorer',
      answers: [
        { id: 'user1', answer: 'home' },
        { id: 'user5', answer: 'away' },
        { id: 'user6', answer: 'home' },
      ],
    },
    {
      id: '3',
      title: 'WIN A 50.00 USDT FREE BET',
      subtitle: 'La Liga - Sunday 21:00',
      homeTeam: 'Nottingham Forest',
      awayTeam: 'SSC Napoli',
      optionType: 'Match result',
      answers: [
        { id: 'user2', answer: 'home' },
        { id: 'user3', answer: 'draw' },
        { id: 'user7', answer: 'away' },
        { id: 'user8', answer: 'home' },
      ],
    },
  ];

  const openModal = (event: (typeof events)[0]) => {
    setSelectedEvent({
      title: event.title,
      answers: event.answers,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className={`min-h-screen  ${
        theme === 'dark' ? 'text-white' : 'text-black'
      }  pb-16`}
    >
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="px-4 py-6">
          <h1 className="text-xl font-bold mb-6">All Events</h1>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 font-semibold">Event</th>
                  <th className="text-left p-4 font-semibold">Teams</th>
                  <th className="text-left p-4 font-semibold">Option Type</th>
                  <th className="text-center p-4 font-semibold">Answers</th>
                  <th className="text-center p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b border-gray-700">
                    <td className="p-4">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs text-gray-400">
                        {event.subtitle}
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        {event.homeTeam}
                        <div className="text-xs text-gray-400 ">vs</div>
                        {event.awayTeam}
                      </div>
                    </td>
                    <td className="p-4">{event.optionType}</td>
                    <td className="p-4 text-center">{event.answers.length}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => openModal(event)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md text-xs hover:bg-green-600 transition-colors"
                      >
                        View Answers
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={selectedEvent.title}
          answers={selectedEvent.answers}
        />
      )}
    </div>
  );
}
