import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from '../../database/quiz/quiz.entity';
import { Event } from '../../database/event/event.entity';
import { QuizController } from './controllers/quiz.controller';
import { QuizService } from './services/quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Event])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
