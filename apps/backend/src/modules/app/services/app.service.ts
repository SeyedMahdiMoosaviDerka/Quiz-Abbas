import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../../database/event/event.entity';
import { Quiz } from '../../../database/quiz/quiz.entity';
import { CreateEventDto } from '@app/common/dto/event/create-event.dto';
import { Answer } from '@app/database/answer/answer.entity';
import { CreateQuizDto } from '@app/common/dto/quiz/create-quiz.dto';
import { SubmitAnswerDto } from '@app/common/dto/answer/submit-answer.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>
  ) {}
  async createEvent(dto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(dto);
    return this.eventRepository.save(event);
  }
  async getEvents(): Promise<Event[]> {
    return this.eventRepository.find({ relations: ['quizzes'] });
  }
  async createQuiz(dto: CreateQuizDto): Promise<Quiz> {
    const event = await this.eventRepository.findOneBy({ id: dto.eventId });
    if (!event) throw new Error('Event not found');
    const quiz = this.quizRepository.create({ ...dto, event });
    return this.quizRepository.save(quiz);
  }
  async getQuizzes(eventId: number): Promise<Quiz[]> {
    return this.quizRepository.find({ where: { event: { id: eventId } } });
  }
  async submitAnswer(dto: SubmitAnswerDto): Promise<Answer> {
    const quiz = await this.quizRepository.findOneBy({ id: dto.quizId });
    if (!quiz) throw new Error('Quiz not found');
    const isCorrect = quiz.correctAnswer === dto.selectedAnswer;
    const reward = isCorrect ? 50 : null; // Example: 50 USDT for correct answer
    const answer = this.answerRepository.create({
      ...dto,
      isCorrect,
      reward,
    });
    return this.answerRepository.save(answer);
  }
}
