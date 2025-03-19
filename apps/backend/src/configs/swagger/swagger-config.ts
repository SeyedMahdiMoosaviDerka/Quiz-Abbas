import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ApiOperationOptions, ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from '../../common/dto/response/response.dto';
import {
  CreateEventDto,
  TeamDto,
} from '../../common/dto/event/create-event.dto';
import { CreateQuizDto } from '../../common/dto/quiz/create-quiz.dto';
import { CreateAnswerDto } from '../../common/dto/answer/create-answer.dto';

interface SwaggerEndpointConfig {
  operation: ApiOperationOptions;
  responses: Array<ReturnType<typeof ApiResponse>>;
}

export const SW: Record<string, SwaggerEndpointConfig> = {
  createEvent: {
    operation: {
      summary: 'Create a new sports event',
      description: 'Adds a new event to the system with team details.',
    },
    responses: [
      ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Event created successfully',
        type: ResponseDto,
        example: {
          statusCode: 201,
          data: {
            id: 1,
            name: 'Manchester City vs Manchester United',
            startTime: '2025-04-01T15:00:00Z',
            info: 'Answer 5/5 questions and win 50 USDT',
            sportType: 'football',
            homeTeam: {
              name: 'Manchester City',
              country: 'England',
              logoUrl: 'https://example.com/mc.png',
            },
            awayTeam: {
              name: 'Manchester United',
              country: 'England',
              logoUrl: 'https://example.com/mu.png',
            },
            quizzes: [],
          },
          message: 'Operation successful',
        },
      }),
      ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Event has already started',
        type: ResponseDto,
        example: {
          statusCode: 400,
          data: null,
          message: 'Event has already started',
          error: 'EVENT_ALREADY_STARTED',
        },
      }),
      ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid event data',
        type: ResponseDto,
        example: {
          statusCode: 400,
          data: null,
          message: 'Validation failed (expected name to be non-empty)',
          error: 'BAD_REQUEST',
        },
      }),
    ],
  },
  getEvents: {
    operation: {
      summary: 'Retrieve all sports events',
      description: 'Fetches a list of all events with their quizzes.',
    },
    responses: [
      ApiResponse({
        status: HttpStatus.OK,
        description: 'Events retrieved successfully',
        type: ResponseDto,
        example: {
          statusCode: 200,
          data: [
            {
              id: 1,
              name: 'Manchester City vs Manchester United',
              startTime: '2025-04-01T15:00:00Z',
              info: 'Answer 5/5 questions and win 50 USDT',
              sportType: 'football',
              homeTeam: {
                name: 'Manchester City',
                country: 'England',
                logoUrl: 'https://example.com/mc.png',
              },
              awayTeam: {
                name: 'Manchester United',
                country: 'England',
                logoUrl: 'https://example.com/mu.png',
              },
              quizzes: [
                {
                  id: 1,
                  question: 'Who will win?',
                  options: ['Manchester City', 'Manchester United', 'Draw'],
                },
              ],
            },
          ],
          message: 'Operation successful',
        },
      }),
      ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'No events found',
        type: ResponseDto,
        example: {
          statusCode: 404,
          data: [],
          message: 'No events available',
          error: 'NO_EVENTS_FOUND',
        },
      }),
    ],
  },
  createQuiz: {
    operation: {
      summary: 'Create a quiz for an event',
      description: 'Adds a quiz to a specific event.',
    },
    responses: [
      ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Quiz created successfully',
        type: ResponseDto,
        example: {
          statusCode: 201,
          data: {
            id: 1,
            question: 'Who will win?',
            options: ['Manchester City', 'Manchester United', 'Draw'],
            event: { id: 1 },
          },
          message: 'Operation successful',
        },
      }),
      ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Event not found',
        type: ResponseDto,
        example: {
          statusCode: 404,
          data: null,
          message: 'Event not found',
          error: 'EVENT_NOT_FOUND',
        },
      }),
      ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid quiz data',
        type: ResponseDto,
        example: {
          statusCode: 400,
          data: null,
          message: 'Validation failed (expected question to be non-empty)',
          error: 'BAD_REQUEST',
        },
      }),
    ],
  },
  getQuizzes: {
    operation: {
      summary: 'Get quizzes for an event',
      description: 'Fetches all quizzes for a given event ID.',
    },
    responses: [
      ApiResponse({
        status: HttpStatus.OK,
        description: 'Quizzes retrieved successfully',
        type: ResponseDto,
        example: {
          statusCode: 200,
          data: [
            {
              id: 1,
              question: 'Who will win?',
              options: ['Manchester City', 'Manchester United', 'Draw'],
              event: { id: 1 },
            },
            {
              id: 2,
              question: 'Number of goals?',
              options: ['0', '1', '2', '3+'],
              event: { id: 1 },
            },
          ],
          message: 'Operation successful',
        },
      }),
      ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Event not found',
        type: ResponseDto,
        example: {
          statusCode: 404,
          data: null,
          message: 'Event not found',
          error: 'EVENT_NOT_FOUND',
        },
      }),
    ],
  },
  submitAnswer: {
    operation: {
      summary: 'Submit user answers',
      description:
        'Records a user’s answers to an event’s quiz with configurable validation.',
      parameters: [
        {
          name: 'validationLevel',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            enum: ['none', 'moderate', 'strict'],
            default: 'none',
          },
          description:
            'Level of answer validation: none (accept all), moderate (check completeness), strict (check against options).',
        },
      ],
    },
    responses: [
      ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Answer submitted successfully (no validation)',
        type: ResponseDto,
        example: {
          statusCode: 201,
          data: {
            message: 'All answers saved successfully',
            warnings: [],
          },
          message: 'Operation successful',
        },
      }),
      ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Answer submitted with warnings (moderate validation)',
        type: ResponseDto,
        example: {
          statusCode: 201,
          data: {
            message: 'All answers saved with warnings',
            warnings: [
              'Not all questions were answered',
              'Invalid answer format at position 1',
            ],
          },
          message: 'Operation successful',
        },
      }),
      ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Event not found',
        type: ResponseDto,
        example: {
          statusCode: 404,
          data: null,
          message: 'Event not found',
          error: 'EVENT_NOT_FOUND',
        },
      }),
      ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Event not started',
        type: ResponseDto,
        example: {
          statusCode: 400,
          data: null,
          message: 'Cannot submit answers before event starts',
          error: 'EVENT_NOT_STARTED',
        },
      }),
      ApiResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Event has started, quiz closed',
        type: ResponseDto,
        example: {
          statusCode: 403,
          data: null,
          message: 'Event has started, quiz is closed',
          error: 'EVENT_CLOSED',
        },
      }),
      ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'Duplicate submission',
        type: ResponseDto,
        example: {
          statusCode: 409,
          data: null,
          message: 'User has already submitted answers for this event',
          error: 'DUPLICATE_SUBMISSION',
        },
      }),
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
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [CreateEventDto, TeamDto, CreateQuizDto, CreateAnswerDto],
  });
  SwaggerModule.setup('api/docs', app, document);
}
