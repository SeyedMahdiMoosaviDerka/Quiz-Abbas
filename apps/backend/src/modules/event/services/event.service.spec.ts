import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventsService } from './event.service';
import { Repository } from 'typeorm';
import { Event } from '../../../database/event/event.entity';

describe('EventsService', () => {
  let service: EventsService;
  let repository: Repository<Event>;

  const mockEvent = {
    id: 1,
    name: 'Test Event',
    startTime: new Date('2025-03-20T14:00:00Z'),
    info: 'Test Info',
    quiz: null,
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockEvent),
    save: jest.fn().mockResolvedValue(mockEvent),
    find: jest.fn().mockResolvedValue([mockEvent]),
    findOne: jest.fn().mockResolvedValue(mockEvent),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    repository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an event', async () => {
      const dto = {
        name: 'Test Event',
        startTime: '2025-03-20T14:00:00Z',
        info: 'Test Info',
      };
      const result = await service.create(dto);
      expect(repository.create).toHaveBeenCalledWith({
        ...dto,
        startTime: new Date(dto.startTime),
      });
      expect(repository.save).toHaveBeenCalledWith(mockEvent);
      expect(result).toEqual(mockEvent);
    });
  });

  describe('findAll', () => {
    it('should return all events', async () => {
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalledWith({ relations: ['quiz'] });
      expect(result).toEqual([mockEvent]);
    });
  });

  describe('findOne', () => {
    it('should return a single event', async () => {
      const result = await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['quiz'],
      });
      expect(result).toEqual(mockEvent);
    });
  });

  describe('isEventStarted', () => {
    it('should return true if event has started', async () => {
      jest
        .spyOn(global, 'Date')
        .mockImplementation(() => new Date('2025-03-21T00:00:00Z') as any);
      const result = await service.isEventStarted(1);
      expect(result).toBe(true);
    });

    it('should return false if event has not started', async () => {
      jest
        .spyOn(global, 'Date')
        .mockImplementation(() => new Date('2025-03-19T00:00:00Z') as any);
      const result = await service.isEventStarted(1);
      expect(result).toBe(false);
    });
  });
});
