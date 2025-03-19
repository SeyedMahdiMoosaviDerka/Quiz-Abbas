import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../../../database/answer/answer.entity';
import { Quiz } from '../../../database/quiz/quiz.entity';
import { SubmitAnswerDto } from '../../../common/dto/answer/submit-answer.dto';
import { exceptions } from '../../../common/exceptions';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>
  ) {}

  async submit(dto: SubmitAnswerDto): Promise<Answer> {
    const quiz = await this.quizRepository.findOneBy({ id: dto.quizId });
    if (!quiz) exceptions.quiz.notFound();
    const answer = this.answerRepository.create(dto);
    return this.answerRepository.save(answer);
  }
}
