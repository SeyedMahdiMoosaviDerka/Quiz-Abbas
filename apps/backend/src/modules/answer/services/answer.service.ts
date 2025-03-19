import { CreateAnswerDto } from '@app/common/dto/answer/create-answer.dto';
import { Answer } from '@app/database/answer/answer.entity';
import { EventsService } from '@app/modules/event/services/event.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
    private eventsService: EventsService
  ) {}

  async create(
    createAnswerDto: CreateAnswerDto,
    validationLevel: 'none' | 'moderate'
  ): Promise<{ warnings: string[] }> {
    const warnings: string[] = [];
    const event = await this.eventsService.findOne(createAnswerDto.eventId);
    if (!event) throw new Error('Event not found');

    const quizQuestions = event.quiz.questions;

    if (validationLevel === 'moderate') {
      for (const userAnswer of createAnswerDto.answers) {
        if (userAnswer.questionIndex >= quizQuestions.length) {
          warnings.push(`Invalid question index ${userAnswer.questionIndex}`);
          continue;
        }
        if (
          !quizQuestions[userAnswer.questionIndex].options.includes(
            userAnswer.answer
          )
        ) {
          warnings.push(
            `Invalid answer "${userAnswer.answer}" for question ${userAnswer.questionIndex}`
          );
        }
      }
    }

    const answerEntity = this.answersRepository.create({
      userId: createAnswerDto.userId,
      event,
      answers: createAnswerDto.answers,
    });

    await this.answersRepository.save(answerEntity);
    return { warnings };
  }
}
