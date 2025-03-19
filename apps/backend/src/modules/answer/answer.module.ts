import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '@database/answer/answer.entity';
import { Quiz } from '@database/quiz/quiz.entity';
import { AnswerController } from './controllers/answer.controller';
import { AnswerService } from './services/answer.service';
import { EventModule } from '@modules/event/event.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Quiz]), EventModule],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
