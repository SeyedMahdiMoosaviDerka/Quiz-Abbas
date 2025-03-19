import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../../database/event/event.entity';
import { CreateEventDto } from '@common/dto/event/create-event.dto';
import { exceptions } from '@common/exceptions';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    const now = new Date();
    if (new Date(dto.startTime) < now) throw exceptions.event.alreadyStarted();
    const event = this.eventRepository.create(dto);
    return this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({ relations: ['quizzes'] });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['quizzes'],
    });
    if (!event) throw exceptions.event.notFound();
    return event;
  }

  async isEventStarted(id: number): Promise<boolean> {
    const event = await this.findOne(id);
    return new Date() >= event.startTime;
  }

  async isEventClosed(id: number): Promise<boolean> {
    return await this.isEventStarted(id);
  }
}
