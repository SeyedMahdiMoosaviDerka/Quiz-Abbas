import { HttpException, HttpStatus } from '@nestjs/common';

const errorMessage = {
  event: {
    notFound: 'Event not found',
    alreadyStarted: 'Event has already started',
    notStarted: 'Event has not started yet',
  },
  quiz: {
    notFound: 'Quiz not found',
    noQuestions: 'Quiz has no questions defined',
  },
  answer: {
    duplicateSubmission: 'User has already submitted answers for this event',
    eventNotStarted: 'Cannot submit answers before event starts',
  },
};

export const exceptions = {
  event: {
    notFound: () =>
      new HttpException(
        { message: errorMessage.event.notFound, code: 'EVENT_NOT_FOUND' },
        HttpStatus.NOT_FOUND
      ),
    alreadyStarted: () =>
      new HttpException(
        {
          message: errorMessage.event.alreadyStarted,
          code: 'EVENT_ALREADY_STARTED',
        },
        HttpStatus.BAD_REQUEST
      ),
    notStarted: () =>
      new HttpException(
        { message: errorMessage.event.notStarted, code: 'EVENT_NOT_STARTED' },
        HttpStatus.BAD_REQUEST
      ),
  },
  quiz: {
    notFound: () =>
      new HttpException(
        { message: errorMessage.quiz.notFound, code: 'QUIZ_NOT_FOUND' },
        HttpStatus.NOT_FOUND
      ),
    noQuestions: () =>
      new HttpException(
        { message: errorMessage.quiz.noQuestions, code: 'QUIZ_NO_QUESTIONS' },
        HttpStatus.BAD_REQUEST
      ),
  },
  answer: {
    duplicateSubmission: () =>
      new HttpException(
        {
          message: errorMessage.answer.duplicateSubmission,
          code: 'DUPLICATE_SUBMISSION',
        },
        HttpStatus.CONFLICT
      ),
    eventNotStarted: () =>
      new HttpException(
        {
          message: errorMessage.answer.eventNotStarted,
          code: 'EVENT_NOT_STARTED',
        },
        HttpStatus.BAD_REQUEST
      ),
  },
};
