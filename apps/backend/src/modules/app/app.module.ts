import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '@database/event/event.entity';
import { Quiz } from '@database/quiz/quiz.entity';
import { Answer } from '@database/answer/answer.entity';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { EventModule } from '@modules/event/event.module';
import { QuizModule } from '@modules/quiz/quiz.module';
import { AnswerModule } from '../answer/answer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root', // Replace with your actual password
      database: 'sports_quiz',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    EventModule,
    QuizModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
