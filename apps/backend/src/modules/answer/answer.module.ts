import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '@database/answer/answer.entity';
import { AnswerController } from './controllers/answer.controller';
import { AnswerService } from './services/answer.service';
import { EventModule } from '@modules/event/event.module';
import { QuizModule } from '@modules/quiz/quiz.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), EventModule, QuizModule],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
