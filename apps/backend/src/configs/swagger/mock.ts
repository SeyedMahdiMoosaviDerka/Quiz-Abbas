export const mockData = {
  event: {
    id: 1,
    name: 'Manchester City vs United',
    startTime: '2025-04-01T15:00:00Z',
    info: 'Answer 5/5 questions and win 50 USDT',
    quizzes: [],
  },
  quiz: {
    id: 1,
    question: 'Who will win?',
    answers: ['Manchester City', 'Manchester United', 'Draw'],
    event: { id: 1 },
  },
  answer: {
    id: 1,
    userId: 'random-user-123',
    quiz: { id: 1 },
    selectedAnswer: 0,
  },
  error: {
    statusCode: 400,
    message: 'Invalid input',
    error: 'Bad Request',
    data: null,
  },
};
