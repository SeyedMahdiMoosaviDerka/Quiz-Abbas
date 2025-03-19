import { CreateEventDto } from '../../common/dto/event/create-event.dto';
import { CreateQuizDto } from '../../common/dto/quiz/create-quiz.dto';
import { CreateAnswerDto } from '../../common/dto/answer/create-answer.dto';

export const mockData = {
  event: {
    id: 1,
    name: 'Manchester City vs Manchester United',
    startTime: '2025-04-01T15:00:00Z',
    info: 'Answer 5/5 questions and win 50 USDT',
    quiz: null,
  },
  createEventDto: {
    name: 'Manchester City vs Manchester United',
    startTime: '2025-04-01T15:00:00Z',
    info: 'Answer 5/5 questions and win 50 USDT',
  } as CreateEventDto,
  quiz: {
    id: 1,
    questions: [
      {
        title: 'Who will win?',
        options: ['Manchester City', 'Manchester United', 'Draw'],
      },
    ],
    event: { id: 1 },
  },
  createQuizDto: {
    question: 'Who will win?',
    answers: ['Manchester City', 'Manchester United', 'Draw'],
    eventId: 1,
  } as CreateQuizDto,
  answer: {
    id: 1,
    userId: 'user123',
    event: { id: 1 },
    answers: [{ questionIndex: 0, answer: 'Manchester City' }],
  },
  createAnswerDto: {
    userId: 'user123',
    eventId: 1,
    answers: [{ questionIndex: 0, answer: 'Manchester City' }],
  } as CreateAnswerDto,
  garbageAnswerDto: {
    userId: 'invalid@#$',
    eventId: 1,
    answers: [
      { questionIndex: -1, answer: 'xyz' },
      { questionIndex: 999, answer: null, extraField: 'garbage' },
    ],
  } as CreateAnswerDto,
  error: {
    statusCode: 400,
    message: 'Invalid input',
    error: 'Bad Request',
    data: null,
  },
};
