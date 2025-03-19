import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from '../services/event.service';

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  const mockEvent = {
    id: 1,
    name: 'Test Event',
    startTime: new Date('2025-03-20T14:00:00Z'),
    sportType: 'Football',
    quizzes: [],
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockEvent),
    findAll: jest.fn().mockResolvedValue([mockEvent]),
    findOne: jest.fn().mockResolvedValue(mockEvent),
    update: jest.fn().mockResolvedValue(mockEvent),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [{ provide: EventService, useValue: mockService }],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an event', async () => {
      const createEventDto = {
        name: 'Test Event',
        startTime: '2025-03-20T14:00:00Z',
      };
      const result = await controller.create(createEventDto);
      expect(service.create).toHaveBeenCalledWith(createEventDto);
      expect(result).toEqual(mockEvent);
    });
  });

  describe('findAll', () => {
    it('should return all events', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockEvent]);
    });
  });

  describe('findOne', () => {
    it('should return an event by id', async () => {
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockEvent);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const updateEventDto = { name: 'Updated Event' };
      const result = await controller.update('1', updateEventDto);
      expect(service.update).toHaveBeenCalledWith(1, updateEventDto);
      expect(result).toEqual(mockEvent);
    });
  });

  describe('remove', () => {
    it('should remove an event', async () => {
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
