import React, { useState, useCallback } from 'react';
import BetSlide from './BetSlide';
import { Event } from '../types';

interface BetCarouselProps {
  event: Event;
}

const BetCarousel: React.FC<BetCarouselProps> = ({ event }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const { questions } = event;

  const goToNextSlide = useCallback(() => {
    if (
      animating ||
      questions.length <= 1 ||
      currentSlide + 1 === questions.length
    )
      return;

    setDirection('next');
    setAnimating(true);

    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % questions.length);
      setTimeout(() => {
        setAnimating(false);
      }, 50);
    }, 300);
  }, [questions.length, animating, currentSlide]);

  const goToPrevSlide = useCallback(() => {
    if (animating || questions.length <= 1 || currentSlide === 0) return;
    setDirection('prev');
    setAnimating(true);

    setTimeout(() => {
      setCurrentSlide(
        (prev) => (prev - 1 + questions.length) % questions.length
      );
      setTimeout(() => {
        setAnimating(false);
      }, 50);
    }, 300);
  }, [questions.length, animating, currentSlide]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextSlide();
    }
    if (isRightSwipe) {
      goToPrevSlide();
    }
  };

  // Determine the animation class based on direction
  const getAnimationClass = () => {
    if (!animating) return '';
    return direction === 'next'
      ? 'animate-slide-out-left'
      : 'animate-slide-out-right';
  };

  const showNavigation = questions.length > 1;

  return (
    <div
      className="relative w-full max-w-full mx-auto overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={`transition-all duration-300 ${getAnimationClass()}`}>
        <BetSlide data={event} question={questions[currentSlide]} />
      </div>

      {showNavigation && (
        <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center gap-1 sm:gap-2 z-20 px-4">
          <button
            onClick={goToPrevSlide}
            className="bg-black/60 hover:bg-black/80 text-white rounded-full px-2 sm:px-5 py-2 text-xs sm:text-sm transition-colors"
            data-testid="prev-button"
            disabled={animating}
          >
            Prev
          </button>

          <div className="flex items-center gap-1 sm:gap-2 mx-1 sm:mx-3">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (animating || index === currentSlide) return;
                  setDirection(index > currentSlide ? 'next' : 'prev');
                  setAnimating(true);
                  setTimeout(() => {
                    setCurrentSlide(index);
                    setTimeout(() => {
                      setAnimating(false);
                    }, 50);
                  }, 300);
                }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-primary' : 'bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                disabled={animating}
              />
            ))}
          </div>

          <button
            onClick={goToNextSlide}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-2 sm:px-5 py-2 text-xs sm:text-sm transition-colors"
            data-testid="next-button"
            disabled={animating}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BetCarousel;
