import { Event } from '@app/database/event/event.entity';
import { Quiz } from '@app/database/quiz/quiz.entity';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'quiz_db',
  entities: [Event, Quiz],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();
  const eventRepository = dataSource.getRepository(Event);
  const quizRepository = dataSource.getRepository(Quiz);

  const quiz = quizRepository.create({
    questions: [
      { title: 'Numbers of goals', options: ['3', '4', '6'] },
      { title: 'Numbers of corner', options: ['1', '2', '3', '4'] },
      { title: 'Winner', options: ['Team A', 'Team B'] },
    ],
  });
  await quizRepository.save(quiz);

  const event = eventRepository.create({
    name: 'Manchester City vs Manchester United',
    startTime: new Date('2025-03-20T14:00:00Z'),
    info: 'Bet on the match outcome!',
    quiz,
  });
  await eventRepository.save(event);

  await dataSource.destroy();
}

seed().catch(console.error);
