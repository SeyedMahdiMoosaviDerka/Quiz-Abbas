import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '@database/event/event.entity';
import { CreateEventDto } from '@common/dto/event/create-event.dto';
import { exceptions } from '@common/exceptions';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create({
      ...createEventDto,
      startTime: new Date(createEventDto.startTime),
    });
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

  async update(id: number, updateEventDto: CreateEventDto): Promise<Event> {
    const event = await this.findOne(id);
    Object.assign(event, {
      ...updateEventDto,
      startTime: new Date(updateEventDto.startTime),
    });
    return this.eventRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const event = await this.findOne(id);
    await this.eventRepository.remove(event);
  }

  async isEventStarted(id: number): Promise<boolean> {
    const event = await this.findOne(id);
    return new Date() > event.startTime;
  }
}
