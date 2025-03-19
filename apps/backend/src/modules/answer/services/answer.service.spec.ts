import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnswerService } from './answer.service';
import { Answer } from '../../../database/answer/answer.entity';
import { EventsService } from '../../event/services/event.service';
import { Repository } from 'typeorm';

describe('AnswerService', () => {
  let service: AnswerService;
  let answerRepository: Repository<Answer>;
  let eventsService: EventsService;

  const mockEvent = {
    id: 1,
    startTime: new Date('2025-03-20T14:00:00Z'),
    quiz: { questions: [{ title: 'Q1', options: ['A', 'B'] }] },
  };
  const mockAnswer = {
    id: 1,
    userId: 'user1',
    event: mockEvent,
    answers: [{ questionIndex: 0, answer: 'A' }],
  };

  const mockAnswerRepository = {
    create: jest.fn().mockReturnValue(mockAnswer),
    save: jest.fn().mockResolvedValue(mockAnswer),
  };

  const mockEventsService = {
    findOne: jest.fn().mockResolvedValue(mockEvent),
    isEventStarted: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerService,
        { provide: getRepositoryToken(Answer), useValue: mockAnswerRepository },
        { provide: EventsService, useValue: mockEventsService },
      ],
    }).compile();

    service = module.get<AnswerService>(AnswerService);
    answerRepository = module.get<Repository<Answer>>(
      getRepositoryToken(Answer)
    );
    eventsService = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save answers with no validation', async () => {
      const dto = {
        userId: 'user1',
        eventId: 1,
        answers: [{ questionIndex: 0, answer: 'A' }],
      };
      const result = await service.create(dto, 'none');
      expect(eventsService.findOne).toHaveBeenCalledWith(1);
      expect(eventsService.isEventStarted).toHaveBeenCalledWith(1);
      expect(answerRepository.create).toHaveBeenCalledWith({
        userId: 'user1',
        event: mockEvent,
        answers: dto.answers,
      });
      expect(answerRepository.save).toHaveBeenCalledWith(mockAnswer);
      expect(result).toEqual({ warnings: [] });
    });

    it('should save answers with moderate validation and warnings', async () => {
      const dto = {
        userId: 'user1',
        eventId: 1,
        answers: [
          { questionIndex: 0, answer: 'C' }, // Invalid answer
          { questionIndex: 1, answer: 'A' }, // Invalid index
        ],
      };
      const result = await service.create(dto, 'moderate');
      expect(result.warnings).toContain('Invalid answer "C" for question 0');
      expect(result.warnings).toContain('Invalid question index 1');
    });

    it('should throw if event not found', async () => {
      mockEventsService.findOne.mockResolvedValue(null);
      const dto = { userId: 'user1', eventId: 1, answers: [] };
      await expect(service.create(dto, 'none')).rejects.toThrow(
        'Event not found'
      );
    });

    it('should throw if event not started', async () => {
      mockEventsService.isEventStarted.mockResolvedValue(false);
      const dto = { userId: 'user1', eventId: 1, answers: [] };
      await expect(service.create(dto, 'none')).rejects.toThrow(
        'Event has not started yet'
      );
    });
  });
});
