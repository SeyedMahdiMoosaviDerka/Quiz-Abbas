import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '@database/event/event.entity';
import { Quiz } from '@database/quiz/quiz.entity';
import { Answer } from '@database/answer/answer.entity';
import { EventModule } from '@modules/event/event.module';
import { QuizModule } from '@modules/quiz/quiz.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'sports_quiz',
      entities: [Event, Quiz, Answer],
      synchronize: true, // Set to false in production
    }),
    EventModule,
    QuizModule,
  ],
})
export class AppModule {}
