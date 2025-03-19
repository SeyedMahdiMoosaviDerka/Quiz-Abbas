import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../../../database/answer/answer.entity';
import { CreateAnswerDto } from '../../../common/dto/answer/create-answer.dto';
import { EventsService } from '../../event/services/event.service';
import { exceptions } from '../../../common/exceptions';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
    private eventsService: EventsService
  ) {}

  async create(
    createAnswerDto: CreateAnswerDto,
    validationLevel: 'none' | 'moderate' | 'strict' = 'none'
  ): Promise<{ warnings: string[] }> {
    const warnings: string[] = [];

    // Check for duplicate submission
    const existingAnswer = await this.answersRepository.findOne({
      where: {
        userId: createAnswerDto.userId,
        event: { id: createAnswerDto.eventId },
      },
    });
    if (existingAnswer) throw exceptions.answer.duplicateSubmission();

    const event = await this.eventsService.findOne(createAnswerDto.eventId);
    const now = new Date();
    if (now < event.startTime) throw exceptions.answer.eventNotStarted();
    if (now > event.startTime) throw exceptions.event.closed();

    const quizQuestions = event.quizzes || [];

    // Validation based on level
    if (!createAnswerDto.answers || !Array.isArray(createAnswerDto.answers)) {
      warnings.push('Answers must be an array');
    } else {
      if (validationLevel === 'none') {
        createAnswerDto.answers.forEach((answer, i) => {
          if (
            typeof answer.questionIndex !== 'number' ||
            answer.questionIndex < 0
          ) {
            warnings.push(`Invalid question index at position ${i}`);
          }
          if (typeof answer.answer !== 'string' || !answer.answer.trim()) {
            warnings.push(`Invalid answer format at position ${i}`);
          }
        });
      }

      // Moderate validation
      if (validationLevel === 'moderate' || validationLevel === 'strict') {
        const answeredIndexes = new Set(
          createAnswerDto.answers.map((a) => a.questionIndex)
        );
        if (
          quizQuestions.length > 0 &&
          answeredIndexes.size < quizQuestions.length
        ) {
          warnings.push('Not all quiz questions were answered');
        }
        createAnswerDto.answers.forEach((answer, i) => {
          if (
            typeof answer.questionIndex !== 'number' ||
            answer.questionIndex < 0
          ) {
            warnings.push(`Invalid question index at position ${i}`);
          }
          if (typeof answer.answer !== 'string' || !answer.answer) {
            warnings.push(`Invalid answer format at position ${i}`);
          }
          if (Object.keys(answer).length > 2) {
            warnings.push(`Extra fields detected in answer at position ${i}`);
          }
        });
      }

      // Strict validation
      if (validationLevel === 'strict' && quizQuestions.length > 0) {
        createAnswerDto.answers.forEach((userAnswer, i) => {
          if (
            typeof userAnswer.questionIndex !== 'number' ||
            userAnswer.questionIndex >= quizQuestions.length ||
            userAnswer.questionIndex < 0
          ) {
            warnings.push(
              `Invalid question index ${userAnswer.questionIndex} at position ${i}`
            );
          } else if (
            typeof userAnswer.answer !== 'string' ||
            !quizQuestions[userAnswer.questionIndex].options.includes(
              userAnswer.answer
            )
          ) {
            warnings.push(
              `Invalid answer "${userAnswer.answer}" for question ${userAnswer.questionIndex}`
            );
          }
        });
      }
    }

    // Save answers
    const answerEntity = this.answersRepository.create({
      userId: createAnswerDto.userId || 'unknown',
      event,
      answers: createAnswerDto.answers || [],
    });

    await this.answersRepository.save(answerEntity);
    return { warnings };
  }
}
