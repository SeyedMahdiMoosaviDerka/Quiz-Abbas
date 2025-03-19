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
    const quizQuestions = event.quiz.questions;

    for (const userAnswer of createAnswerDto.answers) {
      if (userAnswer.questionIndex >= quizQuestions.length) {
        warnings.push(
          `Invalid question index ${userAnswer.questionIndex} for event ${createAnswerDto.eventId}`
        );
        continue;
      }

      if (validationLevel === 'moderate' && !userAnswer.answer) {
        warnings.push(`Question ${userAnswer.questionIndex} has no answer`);
      } else if (
        validationLevel === 'moderate' &&
        !quizQuestions[userAnswer.questionIndex].options.includes(
          userAnswer.answer
        )
      ) {
        warnings.push(
          `Invalid answer for question ${userAnswer.questionIndex}`
        );
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
