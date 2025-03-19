import React from 'react';
import { EventWithAnswers } from '../api/events';
interface AnswersModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventWithAnswers;
}

const AnswersModal: React.FC<AnswersModalProps> = ({
  isOpen,
  onClose,
  event,
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
            User Answers: {event.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
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
            {event.answers.map((answer) => (
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

export default AnswersModal;
