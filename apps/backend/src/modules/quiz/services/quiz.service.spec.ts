import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QuizService } from './quiz.service';
import { Quiz } from '../../../database/quiz/quiz.entity';
import { Event } from '../../../database/event/event.entity';
import { Repository } from 'typeorm';
import { exceptions } from '../../../common/exceptions';

describe('QuizService', () => {
  let service: QuizService;
  let quizRepository: Repository<Quiz>;
  let eventRepository: Repository<Event>;

  const mockEvent = {
    id: 1,
    name: 'Test Event',
    startTime: new Date(),
    info: 'Info',
  };
  const mockQuiz = {
    id: 1,
    questions: [{ title: 'Q1', options: ['A', 'B'] }],
    event: mockEvent,
  };

  const mockQuizRepository = {
    create: jest.fn().mockReturnValue(mockQuiz),
    save: jest.fn().mockResolvedValue(mockQuiz),
    find: jest.fn().mockResolvedValue([mockQuiz]),
  };

  const mockEventRepository = {
    findOneBy: jest.fn().mockResolvedValue(mockEvent),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        { provide: getRepositoryToken(Quiz), useValue: mockQuizRepository },
        { provide: getRepositoryToken(Event), useValue: mockEventRepository },
      ],
    }).compile();

    service = module.get<QuizService>(QuizService);
    quizRepository = module.get<Repository<Quiz>>(getRepositoryToken(Quiz));
    eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a quiz', async () => {
      const dto = { question: 'Q1', answers: ['A', 'B'], eventId: 1 };
      const result = await service.create(dto);
      expect(eventRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(quizRepository.create).toHaveBeenCalledWith({
        questions: [{ title: 'Q1', options: ['A', 'B'] }],
        event: mockEvent,
      });
      expect(quizRepository.save).toHaveBeenCalledWith(mockQuiz);
      expect(result).toEqual(mockQuiz);
    });

    it('should throw if event not found', async () => {
      mockEventRepository.findOneBy.mockResolvedValue(null);
      await expect(
        service.create({ question: 'Q1', answers: ['A'], eventId: 1 })
      ).rejects.toThrow(exceptions.event.notFound());
    });
  });

  describe('findByEvent', () => {
    it('should return quizzes for an event', async () => {
      const result = await service.findByEvent(1);
      expect(eventRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(quizRepository.find).toHaveBeenCalledWith({
        where: { event: { id: 1 } },
      });
      expect(result).toEqual([mockQuiz]);
    });

    it('should throw if event not found', async () => {
      mockEventRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findByEvent(1)).rejects.toThrow(
        exceptions.event.notFound()
      );
    });
  });
});
