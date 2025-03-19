import { HttpException, HttpStatus } from '@nestjs/common';

const errorMessage = {
  event: {
    notFound: 'Event not found',
  },
  quiz: {
    notFound: 'Quiz not found',
  },
};

export const exceptions = {
  event: {
    notFound: () => {
      throw new HttpException(
        {
          message: errorMessage.event.notFound,
          code: 'EVENT_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND
      );
    },
  },
  quiz: {
    notFound: () => {
      throw new HttpException(
        {
          message: errorMessage.quiz.notFound,
          code: 'QUIZ_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND
      );
    },
  },
};
