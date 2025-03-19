import { DataSource } from 'typeorm';
import { Event } from '../../database/event/event.entity';
import { Quiz } from '../../database/quiz/quiz.entity';

export async function seedDatabase(dataSource: DataSource) {
  const eventRepository = dataSource.getRepository(Event);
  const quizRepository = dataSource.getRepository(Quiz);

  const event = eventRepository.create({
    name: 'Manchester City vs United',
    startTime: new Date('2025-04-01T15:00:00Z'),
    info: 'Answer 5/5 questions and win 50 USDT',
  });
  await eventRepository.save(event);

  const quizzes = [
    { question: 'Who will win?', answers: ['City', 'United', 'Draw'], event },
    {
      question: 'First goal scorer?',
      answers: ['Haaland', 'Rashford', 'None'],
      event,
    },
  ];
  await quizRepository.save(quizzes);
}
