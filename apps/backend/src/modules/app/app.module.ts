import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { EventModule } from '@modules/event/event.module';
import { QuizModule } from '@modules/quiz/quiz.module';
import { AnswerModule } from '../answer/answer.module';

@Module({
  imports: [DatabaseModule, EventModule, QuizModule, AnswerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
