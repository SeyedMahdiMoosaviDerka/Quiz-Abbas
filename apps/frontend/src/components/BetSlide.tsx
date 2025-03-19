import React from 'react';
import TeamDisplay from './TeamDisplay';
import RadioGroup from './RadioGroup';
import { cn } from '../lib/utils';
import { useQuiz } from '../contexts/QuizContext';
import { Team } from '../types';

export interface BetSlideProps {
  id: number;
  eventId: number;
  title: string;
  homeTeam: Team;
  awayTeam: Team;
  options: string[];
  isLast?: boolean;
  onNext: () => void;
  onSubmit: () => void;
}

const BetSlide: React.FC<BetSlideProps> = ({
  id,
  eventId,
  title,
  homeTeam,
  awayTeam,
  options,
  isLast = false,
  onNext,
  onSubmit,
}) => {
  const { answers, setAnswer } = useQuiz();
  const answerKey = `${eventId}-${id}`;
  const selectedAnswer = answers[answerKey] || '';

  const handleAnswerChange = (value: string) => {
    setAnswer(eventId, id, value);
    if (isLast) onSubmit();
    else onNext();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-background rounded-lg shadow-lg p-6 text-foreground">
        <div className="flex justify-between items-center mb-4">
          <TeamDisplay
            teamName={homeTeam.name}
            country={homeTeam.country}
            logo={homeTeam.logoUrl}
          />
          <span className="text-muted-foreground">vs</span>
          <TeamDisplay
            teamName={awayTeam.name}
            country={awayTeam.country}
            logo={awayTeam.logoUrl}
            isRight
          />
        </div>
        <RadioGroup
          label={title}
          name={`question-${id}`}
          options={options}
          value={selectedAnswer}
          onChange={handleAnswerChange}
        />
        <div className="mt-6 flex justify-end">
          <button
            onClick={isLast ? onSubmit : onNext}
            disabled={!selectedAnswer}
            className={cn(
              'px-6 py-2 rounded-lg transition-colors duration-200',
              selectedAnswer
                ? 'bg-primary text-foreground hover:bg-primary/80'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
          >
            {isLast ? 'Submit Quiz' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetSlide;
