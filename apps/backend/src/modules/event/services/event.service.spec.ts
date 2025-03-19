import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from '../../../database/event/event.entity';
import { Repository } from 'typeorm';
import { exceptions } from '../../../common/exceptions';

describe('EventService', () => {
  let service: EventService;
  let repository: Repository<Event>;

  const mockEvent = {
    id: 1,
    name: 'Test Event',
    startTime: new Date('2025-03-20T14:00:00Z'),
    sportType: 'Football',
    quizzes: [],
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockEvent),
    save: jest.fn().mockResolvedValue(mockEvent),
    find: jest.fn().mockResolvedValue([mockEvent]),
    findOne: jest.fn().mockResolvedValue(mockEvent),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getRepositoryToken(Event),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    repository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an event', async () => {
      const createEventDto = {
        name: 'Test Event',
        startTime: '2025-03-20T14:00:00Z',
        sportType: 'Football',
      };
      const result = await service.create(createEventDto);
      expect(repository.create).toHaveBeenCalledWith({
        ...createEventDto,
        startTime: new Date(createEventDto.startTime),
      });
      expect(repository.save).toHaveBeenCalledWith(mockEvent);
      expect(result).toEqual(mockEvent);
    });
  });

  describe('findAll', () => {
    it('should return all events', async () => {
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalledWith({ relations: ['quizzes'] });
      expect(result).toEqual([mockEvent]);
    });
  });

  describe('findOne', () => {
    it('should return an event by id', async () => {
      const result = await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['quizzes'],
      });
      expect(result).toEqual(mockEvent);
    });

    it('should throw if event not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(
        exceptions.event.notFound()
      );
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const updateEventDto = { name: 'Updated Event' };
      const updatedEvent = { ...mockEvent, ...updateEventDto };
      mockRepository.save.mockResolvedValue(updatedEvent);
      const result = await service.update(1, updateEventDto);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['quizzes'],
      });
      expect(repository.save).toHaveBeenCalledWith(updatedEvent);
      expect(result).toEqual(updatedEvent);
    });
  });

  describe('remove', () => {
    it('should remove an event', async () => {
      await service.remove(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['quizzes'],
      });
      expect(repository.remove).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe('isEventStarted', () => {
    it('should return true if event has started', async () => {
      mockRepository.findOne.mockResolvedValue({
        ...mockEvent,
        startTime: new Date('2023-01-01T00:00:00Z'),
      });
      const result = await service.isEventStarted(1);
      expect(result).toBe(true);
    });

    it('should return false if event has not started', async () => {
      const result = await service.isEventStarted(1);
      expect(result).toBe(false);
    });
  });
});
