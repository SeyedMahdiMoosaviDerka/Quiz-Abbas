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

  async create(dto: CreateQuizDto): Promise<Quiz> {
    const event = await this.eventRepository.findOneBy({ id: dto.eventId });
    if (!event) exceptions.event.notFound();

    const questions = [
      {
        title: dto.question,
        options: dto.answers,
      },
    ];
    const quiz = this.quizRepository.create({ questions, event });
    return this.quizRepository.save(quiz);
  }

  async findByEvent(eventId: number): Promise<Quiz[]> {
    const event = await this.eventRepository.findOneBy({ id: eventId });
    if (!event) exceptions.event.notFound();
    return this.quizRepository.find({ where: { event: { id: eventId } } });
  }
}
