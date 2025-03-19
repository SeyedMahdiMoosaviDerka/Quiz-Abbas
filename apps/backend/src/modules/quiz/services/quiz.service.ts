import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '@database/quiz/quiz.entity';
import { Event } from '@database/event/event.entity';
import { CreateQuizDto } from '@common/dto/quiz/create-quiz.dto';
import { exceptions } from '@common/exceptions';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  async create(dto: CreateQuizDto): Promise<Quiz | undefined> {
    const event = await this.eventRepository.findOneBy({ id: dto.eventId });
    if (event) {
      const quiz = this.quizRepository.create({
        question: dto.question,
        options: dto.options,
        event,
      });
      return this.quizRepository.save(quiz);
    }
    exceptions.event.notFound();
  }

  async findByEvent(eventId: number): Promise<Quiz[]> {
    const event = await this.eventRepository.findOneBy({ id: eventId });
    if (!event) exceptions.event.notFound();
    return this.quizRepository.find({ where: { event: { id: eventId } } });
  }
}
