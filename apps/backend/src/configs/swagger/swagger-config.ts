import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { ResponseDto } from '../../common/dto/response/response.dto';
import { CreateEventDto } from '../../common/dto/event/create-event.dto';
import { CreateQuizDto } from '../../common/dto/quiz/create-quiz.dto';
import { CreateAnswerDto } from '../../common/dto/answer/create-answer.dto';
import { AnswerItemDto } from '../../common/dto/answer/answer-item.dto';

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
            schema: {
              type: 'object',
              properties: {
                statusCode: { type: 'number', example: 201 },
                data: {
                  type: 'object',
                  $ref: '#/components/schemas/CreateEventDto',
                },
                message: { type: 'string', example: 'Event created' },
              },
            },
          },
        },
      },
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Event has already started',
        type: ResponseDto,
        content: {
          'application/json': {
            example: {
              statusCode: 400,
              data: null,
              message: 'Event has already started',
              error: 'EVENT_ALREADY_STARTED',
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
            example: {
              statusCode: 400,
              message: 'Invalid input',
              error: 'Bad Request',
              data: null,
            },
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
            schema: {
              type: 'object',
              properties: {
                statusCode: { type: 'number', example: 200 },
                data: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/CreateEventDto' },
                },
                message: { type: 'string', example: 'Events fetched' },
              },
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
            schema: {
              type: 'object',
              properties: {
                statusCode: { type: 'number', example: 201 },
                data: {
                  type: 'object',
                  $ref: '#/components/schemas/CreateQuizDto',
                },
                message: { type: 'string', example: 'Quiz created' },
              },
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
              error: 'EVENT_NOT_FOUND',
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
            example: {
              statusCode: 400,
              message: 'Invalid input',
              error: 'Bad Request',
              data: null,
            },
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
            schema: {
              type: 'object',
              properties: {
                statusCode: { type: 'number', example: 200 },
                data: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/CreateQuizDto' },
                },
                message: { type: 'string', example: 'Quizzes fetched' },
              },
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
              error: 'EVENT_NOT_FOUND',
            },
          },
        },
      },
    ],
  },
  submitAnswer: {
    operation: {
      summary: 'Submit a user answer',
      description:
        'Records a user’s answers to an event’s quiz. Accepts all data by default (validationLevel=none). Use validationLevel=moderate or strict for optional checks.',
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
      {
        status: HttpStatus.CREATED,
        description: 'Answer submitted successfully (no validation)',
        type: ResponseDto,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                statusCode: { type: 'number', example: 201 },
                data: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Answers saved successfully',
                    },
                    warnings: {
                      type: 'array',
                      items: { type: 'string' },
                      example: [],
                    },
                  },
                },
                message: { type: 'string', example: 'Operation successful' },
              },
            },
          },
        },
      },
      {
        status: HttpStatus.CREATED,
        description: 'Answer submitted with warnings (moderate validation)',
        type: ResponseDto,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                statusCode: { type: 'number', example: 201 },
                data: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Answers saved with warnings',
                    },
                    warnings: {
                      type: 'array',
                      items: { type: 'string' },
                      example: [
                        'Not all questions were answered',
                        'Invalid answer format at position 1',
                      ],
                    },
                  },
                },
                message: { type: 'string', example: 'Operation successful' },
              },
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
              error: 'EVENT_NOT_FOUND',
            },
          },
        },
      },
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Event not started',
        type: ResponseDto,
        content: {
          'application/json': {
            example: {
              statusCode: 400,
              data: null,
              message: 'Cannot submit answers before event starts',
              error: 'EVENT_NOT_STARTED',
            },
          },
        },
      },
      {
        status: HttpStatus.CONFLICT,
        description: 'Duplicate submission',
        type: ResponseDto,
        content: {
          'application/json': {
            example: {
              statusCode: 409,
              data: null,
              message: 'User has already submitted answers for this event',
              error: 'DUPLICATE_SUBMISSION',
            },
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
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [
      CreateEventDto,
      CreateQuizDto,
      CreateAnswerDto,
      AnswerItemDto,
    ],
  });
  SwaggerModule.setup('api/docs', app, document);
}
