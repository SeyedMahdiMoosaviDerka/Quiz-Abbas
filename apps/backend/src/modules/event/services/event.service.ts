import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../../database/event/event.entity';
import { CreateEventDto } from '../../../common/dto/event/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(dto);
    return this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({ relations: ['quizzes'] });
  }
}
