import { Event } from '../types';

export const dummyEvents: Event[] = [
  {
    id: 1,
    name: 'WIN A 50.00 USDT FREE BET',
    info: 'Serie A - Sunday 20:45',
    startTime: '2025-03-20T20:45:00Z',
    sportType: 'Football',
    homeTeam: {
      name: 'Juventus Turin',
      country: 'Italy',
      logoUrl: 'https://example.com/juventus-logo.png',
    },
    awayTeam: {
      name: 'SSC Napoli',
      country: 'Italy',
      logoUrl: 'https://example.com/napoli-logo.png',
    },
    quizzes: [
      {
        id: 1,
        question: 'How many goals will be scored?',
        options: ['0', '1', '2', '3', '4', '5+'],
      },
      {
        id: 2,
        question: 'Who will score first?',
        options: ['Player A', 'Player B', 'Player C', 'None'],
      },
    ],
    backgroundImage: 'https://example.com/soccer-stadium-bg.jpg',
  },
  {
    id: 2,
    name: 'NBA Finals Prediction',
    info: 'NBA - Friday 22:00',
    startTime: '2025-03-21T22:00:00Z',
    sportType: 'Basketball',
    homeTeam: {
      name: 'Los Angeles Lakers',
      country: 'USA',
      logoUrl: 'https://example.com/lakers-logo.png',
    },
    awayTeam: {
      name: 'Boston Celtics',
      country: 'USA',
      logoUrl: 'https://example.com/celtics-logo.png',
    },
    quizzes: [
      {
        id: 3,
        question: 'Total points scored?',
        options: ['Under 200', '200-220', 'Over 220'],
      },
      {
        id: 4,
        question: 'MVP of the game?',
        options: ['LeBron James', 'Jayson Tatum', 'Other'],
      },
    ],
    backgroundImage: 'https://example.com/basketball-court-bg.jpg',
  },
  {
    id: 3,
    name: 'Tennis Grand Slam Bet',
    info: 'Wimbledon - Saturday 14:00',
    startTime: '2025-03-19T14:00:00Z',
    sportType: 'Tennis',
    homeTeam: {
      name: 'Novak Djokovic',
      country: 'Serbia',
      logoUrl: 'https://example.com/djokovic-logo.png',
    },
    awayTeam: {
      name: 'Rafael Nadal',
      country: 'Spain',
      logoUrl: 'https://example.com/nadal-logo.png',
    },
    quizzes: [
      {
        id: 5,
        question: 'Match duration?',
        options: ['Under 2 hours', '2-3 hours', 'Over 3 hours'],
      },
    ],
    backgroundImage: 'https://example.com/tennis-court-bg.jpg',
  },
];

export interface EventWithAnswers extends Event {
  answers: { id: string; answer: string }[];
}

export const dummyEventsWithAnswers: EventWithAnswers[] = [
  {
    ...dummyEvents[0],
    answers: [
      { id: 'user1', answer: '2' },
      { id: 'user2', answer: 'Player A' },
      { id: 'user3', answer: '3' },
    ],
  },
  {
    ...dummyEvents[1],
    answers: [
      { id: 'user4', answer: '200-220' },
      { id: 'user5', answer: 'LeBron James' },
    ],
  },
  {
    ...dummyEvents[2],
    answers: [
      { id: 'user6', answer: 'Over 3 hours' },
      { id: 'user7', answer: '2-3 hours' },
    ],
  },
];

export default { dummyEvents, dummyEventsWithAnswers };
