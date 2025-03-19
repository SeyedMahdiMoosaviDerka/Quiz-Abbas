import { render, screen, fireEvent } from '@testing-library/react';
import EventRow from '../components/EventRow';
import { Event } from '../types';

const mockEvent: Event = {
  id: 1,
  name: 'Test Event',
  info: 'Test Info',
  startTime: '2025-03-20T14:00:00Z',
  sportType: 'Football',
  homeTeam: { name: 'Home Team', country: 'Country A' },
  awayTeam: { name: 'Away Team', country: 'Country B' },
  quizzes: [{ id: 1, question: 'Test Q', options: ['A', 'B'] }],
};

describe('EventRow Component', () => {
  const mockOnSelect = jest.fn();

  it('renders event details correctly', () => {
    render(<EventRow event={mockEvent} onSelect={mockOnSelect} />);
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Test Info')).toBeInTheDocument();
    expect(screen.getByText('Home Team')).toBeInTheDocument();
    expect(screen.getByText('Away Team')).toBeInTheDocument();
  });

  it('disables button if event has started', () => {
    const pastEvent = { ...mockEvent, startTime: '2023-01-01T00:00:00Z' };
    render(<EventRow event={pastEvent} onSelect={mockOnSelect} />);
    const button = screen.getByRole('button', { name: /quiz closed/i });
    expect(button).toBeDisabled();
  });

  it('calls onSelect when button is clicked', () => {
    render(<EventRow event={mockEvent} onSelect={mockOnSelect} />);
    const button = screen.getByRole('button', { name: /start quiz/i });
    fireEvent.click(button);
    expect(mockOnSelect).toHaveBeenCalledWith(mockEvent);
  });
});
