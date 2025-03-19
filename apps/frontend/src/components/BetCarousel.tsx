import React, { useState } from 'react';
import BetSlide from './BetSlide';
import { Event } from '../types';
import { useQuiz } from '../contexts/QuizContext';

interface BetCarouselProps {
  event: Event;
}

const BetCarousel: React.FC<BetCarouselProps> = ({ event }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { submitAnswers } = useQuiz();
  const totalSlides = event.quizzes.length;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    submitAnswers(event.id);
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <BetSlide
          id={event.quizzes[currentSlide].id}
          eventId={event.id}
          title={event.quizzes[currentSlide].question}
          homeTeam={event.homeTeam}
          awayTeam={event.awayTeam}
          options={event.quizzes[currentSlide].options}
          isLast={currentSlide === totalSlides - 1}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className="text-foreground disabled:text-muted-foreground"
        >
          Previous
        </button>
        <span className="text-foreground">
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>
    </div>
  );
};

export default BetCarousel;
