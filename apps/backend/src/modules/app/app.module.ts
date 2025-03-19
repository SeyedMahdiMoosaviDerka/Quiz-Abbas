import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from '@app/database/quiz/quiz.entity';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { Answer } from '@app/database/answer/answer.entity';
import { Event } from '@app/database/event/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root', // Replace with your actual password
      database: 'sports_quiz',
      autoLoadEntities: true, // Ensure all entities are here
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Quiz, Answer, Event]),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
