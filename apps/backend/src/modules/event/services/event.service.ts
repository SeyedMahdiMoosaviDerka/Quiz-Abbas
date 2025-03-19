import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '@database/event/event.entity';
import { CreateEventDto } from '@common/dto/event/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    const event = this.eventsRepository.create({
      ...dto,
      startTime: new Date(dto.startTime),
    });
    return this.eventsRepository.save(event);
  }

  findAll(): Promise<Event[]> {
    return this.eventsRepository.find({ relations: ['quiz'] });
  }

  findOne(id: number): Promise<Event> {
    return this.eventsRepository.findOne({
      where: { id },
      relations: ['quiz'],
    });
  }

  isEventStarted(eventId: number): Promise<boolean> {
    return this.eventsRepository
      .findOne({ where: { id: eventId } })
      .then((event) => event && new Date() > event.startTime);
  }
}
