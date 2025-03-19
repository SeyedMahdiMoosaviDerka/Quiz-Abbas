import { render, screen, fireEvent } from '@testing-library/react';
import BetCarousel from '@/components/BetCarousel';
import { BetSlideProps } from '@/components/BetSlide';

// Mock BetSlide component
jest.mock('@/components/BetSlide', () => {
  return function MockBetSlide(props: BetSlideProps) {
    return <div data-testid={`bet-slide-${props.id}`}>{props.title}</div>;
  };
});

describe('BetCarousel Component', () => {
  const mockSlides: BetSlideProps[] = [
    {
      id: '1',
      title: 'Slide 1',
      subtitle: 'Subtitle 1',
      homeTeam: { name: 'Team A', country: 'Country A' },
      awayTeam: { name: 'Team B', country: 'Country B' },
      options: {
        title: 'Options 1',
        choices: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ],
      },
    },
    {
      id: '2',
      title: 'Slide 2',
      subtitle: 'Subtitle 2',
      homeTeam: { name: 'Team C', country: 'Country C' },
      awayTeam: { name: 'Team D', country: 'Country D' },
      options: {
        title: 'Options 2',
        choices: [
          { value: 'c', label: 'C' },
          { value: 'd', label: 'D' },
        ],
      },
    },
    {
      id: '3',
      title: 'Slide 3',
      subtitle: 'Subtitle 3',
      homeTeam: { name: 'Team E', country: 'Country E' },
      awayTeam: { name: 'Team F', country: 'Country F' },
      options: {
        title: 'Options 3',
        choices: [
          { value: 'e', label: 'E' },
          { value: 'f', label: 'F' },
        ],
      },
    },
  ];

  it('renders the first slide by default', () => {
    render(<BetCarousel slides={mockSlides} />);
    expect(screen.getByTestId('bet-slide-1')).toBeInTheDocument();
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('navigates to the next slide when the next button is clicked', () => {
    render(<BetCarousel slides={mockSlides} />);

    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.getByTestId('bet-slide-2')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });

  it('navigates to the previous slide when the previous button is clicked', () => {
    render(<BetCarousel slides={mockSlides} />);

    // Navigate to slide 2
    fireEvent.click(screen.getByTestId('next-button'));

    // Then go back to slide 1
    fireEvent.click(screen.getByTestId('prev-button'));
    expect(screen.getByTestId('bet-slide-1')).toBeInTheDocument();
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('wraps around to the first slide when at the end and next is clicked', () => {
    render(<BetCarousel slides={mockSlides} />);

    // Navigate to slide 3
    fireEvent.click(screen.getByTestId('next-button'));
    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.getByTestId('bet-slide-3')).toBeInTheDocument();

    // Should wrap to slide 1
    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.getByTestId('bet-slide-1')).toBeInTheDocument();
  });

  it('wraps around to the last slide when at the beginning and previous is clicked', () => {
    render(<BetCarousel slides={mockSlides} />);

    // Should wrap to slide 3
    fireEvent.click(screen.getByTestId('prev-button'));
    expect(screen.getByTestId('bet-slide-3')).toBeInTheDocument();
  });
});
