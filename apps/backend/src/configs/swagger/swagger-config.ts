import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { mockData } from './mock';
import { ResponseDto } from '../../common/dto/response/response.dto';

interface SwaggerEndpointConfig {
  operation: ApiOperationOptions;
  responses: ApiResponseOptions[];
}

export const SW: Record<string, SwaggerEndpointConfig> = {
  createEvent: {
    operation: {
      summary: 'Create a new sports event',
      description: 'Adds a new event to the system.',
    },
    responses: [
      {
        status: HttpStatus.CREATED,
        description: 'Event created successfully',
        type: ResponseDto,
        content: {
          'application/json': {
            example: {
              statusCode: 201,
              data: mockData.event,
              message: 'Event created',
            },
          },
        },
      },
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid event data',
        type: ResponseDto,
        content: {
          'application/json': {
            example: mockData.error,
          },
        },
      },
    ],
  },
  getEvents: {
    operation: {
      summary: 'Retrieve all sports events',
      description: 'Fetches a list of all events with their quizzes.',
    },
    responses: [
      {
        status: HttpStatus.OK,
        description: 'Events retrieved successfully',
        type: ResponseDto,
        content: {
          'application/json': {
            example: {
              statusCode: 200,
              data: [mockData.event],
              message: 'Events fetched',
            },
          },
        },
      },
    ],
  },
  createQuiz: {
    operation: {
      summary: 'Create a quiz for an event',
      description: 'Adds a quiz to a specific event.',
    },
    responses: [
      {
        status: HttpStatus.CREATED,
        description: 'Quiz created successfully',
        type: ResponseDto,
        content: {
          'application/json': {
            example: {
              statusCode: 201,
              data: mockData.quiz,
              message: 'Quiz created',
            },
          },
        },
      },
      {
        status: HttpStatus.NOT_FOUND,
        description: 'Event not found',
        type: ResponseDto,
        content: {
          'application/json': {
            example: {
              statusCode: 404,
              data: null,
              message: 'Event not found',
              error: 'Not Found',
            },
          },
        },
      },
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid quiz data',
        type: ResponseDto,
        content: {
          'application/json': {
            example: mockData.error,
          },
        },
      },
    ],
  },
  getQuizzes: {
    operation: {
      summary: 'Get quizzes for an event',
      description: 'Fetches all quizzes for a given event ID.',
    },
    responses: [
      {
        status: HttpStatus.OK,
        description: 'Quizzes retrieved successfully',
        type: ResponseDto,
        content: {
          'application/json': {
            example: {
              statusCode: 200,
              data: [mockData.quiz],
              message: 'Quizzes fetched',
            },
          },
        },
      },
      {
        status: HttpStatus.NOT_FOUND,
        description: 'Event not found',
        type: ResponseDto,
        content: {
          'application/json': {
            example: {
              statusCode: 404,
              data: null,
              message: 'Event not found',
              error: 'Not Found',
            },
          },
        },
      },
    ],
  },
  submitAnswer: {
    operation: {
      summary: 'Submit a user answer',
      description: 'Records a user’s answer to a quiz.',
    },
    responses: [
      {
        status: HttpStatus.CREATED,
        description: 'Answer submitted successfully',
        type: ResponseDto,
        content: {
          'application/json': {
            example: {
              statusCode: 201,
              data: mockData.answer,
              message: 'Answer submitted',
            },
          },
        },
      },
      {
        status: HttpStatus.NOT_FOUND,
        description: 'Quiz not found',
        type: ResponseDto,
        content: {
          'application/json': {
            example: {
              statusCode: 404,
              data: null,
              message: 'Quiz not found',
              error: 'Not Found',
            },
          },
        },
      },
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid answer data',
        type: ResponseDto,
        content: {
          'application/json': {
            example: mockData.error,
          },
        },
      },
    ],
  },
};

export type keyOfSw = keyof typeof SW;

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Sports Quiz API')
    .setDescription('API for managing sports events, quizzes, and user answers')
    .setVersion('1.0')
    .addTag('events')
    .addTag('quizzes')
    .addTag('answers')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}
