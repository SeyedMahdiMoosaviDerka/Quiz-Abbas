import { Event } from '@app/database/event/event.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>
  ) {}

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
      .then((event) => new Date() > event.startTime);
  }
}
