import { render, screen, fireEvent } from '@testing-library/react';
import BetCarousel from '../components/BetCarousel';
import { Event } from '../types';

// Mock QuizContext to avoid context errors
jest.mock('../contexts/QuizContext', () => ({
  useQuiz: () => ({
    currentEvent: null,
    setCurrentEvent: jest.fn(),
    answers: {},
    setAnswer: jest.fn(),
    submitAnswers: jest.fn(),
    submittedEvents: new Set(),
    resetQuiz: jest.fn(),
    userId: 'mock-user-id',
  }),
}));

// Mock BetSlide component to match how BetCarousel uses it
jest.mock('../components/BetSlide', () => {
  return function MockBetSlide({ id, title }: { id: string; title: string }) {
    return <div data-testid={`bet-slide-${id}`}>{title}</div>;
  };
});

describe('BetCarousel Component', () => {
  const mockEvent: Event = {
    id: 1,
    name: 'Test Event',
    info: 'Test Info',
    startTime: '2025-03-20T14:00:00Z',
    sportType: 'Football',
    homeTeam: { name: 'Home Team', country: 'Country A' },
    awayTeam: { name: 'Away Team', country: 'Country B' },
    quizzes: [
      { id: 1, question: 'Question 1?', options: ['A', 'B', 'C'] },
      { id: 2, question: 'Question 2?', options: ['X', 'Y'] },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the first quiz question by default', () => {
    render(<BetCarousel event={mockEvent} />);
    expect(screen.getByTestId('bet-slide-1')).toBeInTheDocument();
    expect(screen.getByText('Question 1?')).toBeInTheDocument();
  });

  it('navigates to the next quiz question when the next button is clicked', () => {
    render(<BetCarousel event={mockEvent} />);
    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.getByTestId('bet-slide-2')).toBeInTheDocument();
    expect(screen.getByText('Question 2?')).toBeInTheDocument();
  });

  it('navigates to the previous quiz question when the previous button is clicked', () => {
    render(<BetCarousel event={mockEvent} />);
    fireEvent.click(screen.getByTestId('next-button')); // Go to slide 2
    fireEvent.click(screen.getByTestId('prev-button')); // Back to slide 1
    expect(screen.getByTestId('bet-slide-1')).toBeInTheDocument();
    expect(screen.getByText('Question 1?')).toBeInTheDocument();
  });

  it('wraps around to the first question when at the end and next is clicked', () => {
    render(<BetCarousel event={mockEvent} />);
    fireEvent.click(screen.getByTestId('next-button')); // Go to slide 2
    fireEvent.click(screen.getByTestId('next-button')); // Should wrap to slide 1
    expect(screen.getByTestId('bet-slide-1')).toBeInTheDocument();
    expect(screen.getByText('Question 1?')).toBeInTheDocument();
  });

  it('wraps around to the last question when at the beginning and previous is clicked', () => {
    render(<BetCarousel event={mockEvent} />);
    fireEvent.click(screen.getByTestId('prev-button')); // Should wrap to slide 2
    expect(screen.getByTestId('bet-slide-2')).toBeInTheDocument();
    expect(screen.getByText('Question 2?')).toBeInTheDocument();
  });

  it('calls submitAnswers when the submit button is clicked after answering all questions', () => {
    const { useQuiz } = require('../contexts/QuizContext');
    const mockSubmitAnswers = jest.fn();
    useQuiz.mockReturnValue({
      ...useQuiz(),
      submitAnswers: mockSubmitAnswers,
    });

    render(<BetCarousel event={mockEvent} />);
    fireEvent.click(screen.getByTestId('next-button')); // Go to last slide
    fireEvent.click(screen.getByRole('button', { name: /submit quiz/i }));
    expect(mockSubmitAnswers).toHaveBeenCalledWith(mockEvent.id);
  });
});
