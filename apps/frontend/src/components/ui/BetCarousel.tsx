import React, { useState } from 'react';
import BetSlide from './BetSlide';
import { Event } from '../../types';
import { useQuiz } from '../../contexts/QuizContext';

interface BetCarouselProps {
  event: Event;
}

const BetCarousel: React.FC<BetCarouselProps> = ({ event }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { answers, setAnswer, submitAnswers } = useQuiz();
  const totalSlides = event.quizzes.length;

  const handleNext = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      submitAnswers(event.id);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleAnswerChange = (answer: string) => {
    setAnswer(event.id, currentIndex, answer);
  };

  return (
    <div className="relative w-full">
      <BetSlide
        id={event.id.toString()}
        title={event.name}
        subtitle={event.info}
        homeTeam={event.homeTeam}
        awayTeam={event.awayTeam}
        options={{
          title: event.quizzes[currentIndex].question,
          choices: event.quizzes[currentIndex].options, // Pass string[] directly
        }}
        selectedOption={answers[`${event.id}-${currentIndex}`] || ''}
        onChange={handleAnswerChange}
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          className="bg-gray-500 text-white px-4 py-2 rounded"
          disabled={totalSlides <= 1}
          aria-label="Previous question"
        >
          Prev
        </button>
        <span className="text-white">
          {currentIndex + 1} / {totalSlides}
        </span>
        <button
          onClick={handleNext}
          className="bg-primary text-white px-4 py-2 rounded"
          aria-label={
            currentIndex === totalSlides - 1 ? 'Submit Quiz' : 'Next question'
          }
        >
          {currentIndex === totalSlides - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default BetCarousel;
