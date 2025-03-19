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

    // Fetch event and check if started
    const event = await this.eventsService.findOne(createAnswerDto.eventId); // Throws notFound if missing
    const isStarted = await this.eventsService.isEventStarted(
      createAnswerDto.eventId
    );
    if (!isStarted) throw exceptions.answer.eventNotStarted();

    const quizQuestions = event.quiz?.questions || [];

    // Validation based on level
    if (validationLevel === 'moderate' || validationLevel === 'strict') {
      if (!createAnswerDto.answers || !Array.isArray(createAnswerDto.answers)) {
        warnings.push('Answers must be an array');
      } else {
        // Moderate: Check all questions answered, no extra fields
        if (validationLevel === 'moderate') {
          const answeredIndexes = new Set(
            createAnswerDto.answers.map((a) => a.questionIndex)
          );
          if (
            quizQuestions.length > 0 &&
            answeredIndexes.size < quizQuestions.length
          ) {
            warnings.push('Not all questions were answered');
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

        // Strict: Check answers match options
        if (validationLevel === 'strict' && quizQuestions.length > 0) {
          createAnswerDto.answers.forEach((userAnswer, i) => {
            if (
              typeof userAnswer.questionIndex !== 'number' ||
              userAnswer.questionIndex >= quizQuestions.length
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
    }

    // Save regardless of warnings
    const answerEntity = this.answersRepository.create({
      userId: createAnswerDto.userId || 'unknown', // Accept garbage userId
      event,
      answers: createAnswerDto.answers || [], // Accept empty or invalid answers
    });

    await this.answersRepository.save(answerEntity);
    return { warnings };
  }
}
