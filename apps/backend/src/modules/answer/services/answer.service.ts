import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '@database/answer/answer.entity';
import { CreateAnswerDto } from '@common/dto/answer/create-answer.dto';
import { EventService } from '../../event/services/event.service';
import { exceptions } from '@common/exceptions';

interface ValidationResult {
  warnings: string[];
}

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer) private answersRepository: Repository<Answer>,
    private eventService: EventService
  ) {}

  private validateAnswers(
    dto: CreateAnswerDto,
    eventQuizzes: any[],
    level: 'none' | 'moderate' | 'strict'
  ): ValidationResult {
    const warnings: string[] = [];
    if (!dto.answers || !Array.isArray(dto.answers))
      return { warnings: ['Answers must be an array'] };

    const validateBase = (answer: any, i: number) => {
      if (typeof answer.questionIndex !== 'number' || answer.questionIndex < 0)
        warnings.push(`Invalid question index at position ${i}`);
      if (typeof answer.answer !== 'string' || !answer.answer.trim())
        warnings.push(`Invalid answer format at position ${i}`);
    };

    dto.answers.forEach((answer, i) => {
      validateBase(answer, i);
      if (level === 'moderate' || level === 'strict') {
        if (Object.keys(answer).length > 2)
          warnings.push(`Extra fields in answer at position ${i}`);
      }
      if (level === 'strict' && eventQuizzes.length > 0) {
        const quiz = eventQuizzes[answer.questionIndex];
        if (!quiz || answer.questionIndex >= eventQuizzes.length)
          warnings.push(
            `Invalid question index ${answer.questionIndex} at position ${i}`
          );
        else if (!quiz.options.includes(answer.answer))
          warnings.push(
            `Invalid answer "${answer.answer}" for question ${answer.questionIndex}`
          );
      }
    });

    if (
      (level === 'moderate' || level === 'strict') &&
      eventQuizzes.length > 0
    ) {
      const answeredIndexes = new Set(dto.answers.map((a) => a.questionIndex));
      if (answeredIndexes.size < eventQuizzes.length)
        warnings.push('Not all quiz questions were answered');
    }

    return { warnings };
  }

  async create(
    dto: CreateAnswerDto,
    validationLevel: 'none' | 'moderate' | 'strict' = 'none'
  ): Promise<{ warnings: string[] }> {
    const existingAnswer = await this.answersRepository.findOne({
      where: { userId: dto.userId, event: { id: dto.eventId } },
    });
    if (existingAnswer) throw exceptions.answer.duplicateSubmission();

    const event = await this.eventService.findOne(dto.eventId);
    if (!event) throw exceptions.event.notFound();
    const now = new Date();
    if (now < event.startTime) throw exceptions.answer.eventNotStarted();
    if (now > event.startTime) throw exceptions.event.closed();

    const { warnings } = this.validateAnswers(
      dto,
      event.quizzes,
      validationLevel
    );

    const answerEntity = this.answersRepository.create({
      userId: dto.userId || 'unknown',
      event,
      answers: dto.answers || [],
    });
    await this.answersRepository.save(answerEntity);
    return { warnings };
  }
}
