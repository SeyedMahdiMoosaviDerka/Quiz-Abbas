import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnswerService } from './answer.service';
import { Answer } from '../../../database/answer/answer.entity';
import { EventService } from '../../event/services/event.service';
import { Repository } from 'typeorm';

describe('AnswerService', () => {
  let service: AnswerService;
  let answerRepository: Repository<Answer>;
  let eventService: EventService;

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

  const mockEventService = {
    findOne: jest.fn().mockResolvedValue(mockEvent),
    isEventStarted: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerService,
        { provide: getRepositoryToken(Answer), useValue: mockAnswerRepository },
        { provide: EventService, useValue: mockEventService },
      ],
    }).compile();

    service = module.get<AnswerService>(AnswerService);
    answerRepository = module.get<Repository<Answer>>(
      getRepositoryToken(Answer)
    );
    eventService = module.get<EventService>(EventService);
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
      expect(eventService.findOne).toHaveBeenCalledWith(1);
      expect(eventService.isEventStarted).toHaveBeenCalledWith(1);
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
      mockEventService.findOne.mockResolvedValue(null);
      const dto = { userId: 'user1', eventId: 1, answers: [] };
      await expect(service.create(dto, 'none')).rejects.toThrow(
        'Event not found'
      );
    });

    it('should throw if event not started', async () => {
      mockEventService.isEventStarted.mockResolvedValue(false);
      const dto = { userId: 'user1', eventId: 1, answers: [] };
      await expect(service.create(dto, 'none')).rejects.toThrow(
        'Event has not started yet'
      );
    });
  });
});
