import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../../database/answer/answer.entity';
import { Quiz } from '../../database/quiz/quiz.entity';
import { AnswerController } from './controllers/answer.controller';
import { AnswerService } from './services/answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Quiz])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
