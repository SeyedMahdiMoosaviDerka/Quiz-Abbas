import React from 'react';
import { useQuiz } from '../../contexts/QuizContext';
import { Event } from '../../types';

interface SummaryCardProps {
  event: Event;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ event }) => {
  const { answers, resetQuiz } = useQuiz();

  const userAnswers = event.quizzes.map((q, idx) => ({
    question: q.question,
    userAnswer: answers[`${event.id}-${idx}`] || 'Not answered',
  }));

  return (
    <div className="max-w-md mx-auto bg-[#2A2E34] shadow-lg p-6 text-white mt-10 rounded-[6px]">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
          <span role="img" aria-label="summary">
            📋
          </span>{' '}
          Summary
        </h2>
        <h3 className="text-lg mt-2">{event.name}</h3>
        <p className="text-sm text-gray-400">{event.info}</p>
      </div>

      <div className="space-y-4">
        {userAnswers.map((q, index) => (
          <div key={index} className="bg-[#1E2226] rounded-lg p-4">
            <p className="text-sm font-medium">
              Question {index + 1}: {q.question}
            </p>
            <p className="text-sm mt-1">Your Answer: {q.userAnswer}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={resetQuiz}
          className="bg-[#00FF85] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          Back to Events
        </button>
      </div>
    </div>
  );
};

export default SummaryCard;
