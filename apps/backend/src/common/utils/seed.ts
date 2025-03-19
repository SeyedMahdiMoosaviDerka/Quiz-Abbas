import { Event } from '@app/database/event/event.entity';
import { Quiz } from '@app/database/quiz/quiz.entity';
import { Answer } from '@app/database/answer/answer.entity';
import { DataSource } from 'typeorm';

// Seed the database with diverse sports data for testing multi-sport support
export async function seedDatabase(dataSource: DataSource) {
  const eventRepository = dataSource.getRepository(Event);
  const quizRepository = dataSource.getRepository(Quiz);
  const answerRepository = dataSource.getRepository(Answer);

  const events = [
    {
      name: 'Manchester City vs Manchester United',
      startTime: new Date('2025-03-20T14:00:00Z'),
      info: 'Bet on the match outcome!',
      sportType: 'football',
      homeTeam: {
        name: 'Manchester City',
        country: 'England',
        logoUrl: 'https://example.com/mc.png',
      },
      awayTeam: {
        name: 'Manchester United',
        country: 'England',
        logoUrl: 'https://example.com/mu.png',
      },
    },
    {
      name: 'Serena Williams vs Naomi Osaka',
      startTime: new Date('2025-03-21T16:00:00Z'),
      info: 'Predict the winner!',
      sportType: 'tennis',
      homeTeam: {
        name: 'Serena Williams',
        country: 'USA',
        logoUrl: 'https://example.com/sw.png',
      },
      awayTeam: {
        name: 'Naomi Osaka',
        country: 'Japan',
        logoUrl: 'https://example.com/no.png',
      },
    },
  ];

  for (const eventData of events) {
    const event = eventRepository.create(eventData);
    await eventRepository.save(event);

    const quizzes =
      event.sportType === 'football'
        ? [
            {
              question: 'Number of goals?',
              options: ['0', '1', '2', '3'],
              event,
            },
            {
              question: 'First scorer?',
              options: ['Player A', 'Player B', 'None'],
              event,
            },
          ]
        : [
            {
              question: 'Match duration?',
              options: ['Under 2h', '2-3h', 'Over 3h'],
              event,
            },
          ];
    await quizRepository.save(quizzes.map((q) => quizRepository.create(q)));

    const answer = answerRepository.create({
      userId: `user-${Math.random().toString(36).substr(2, 9)}`,
      event,
      answers: [{ questionIndex: 0, answer: quizzes[0].options[0] }],
    });
    await answerRepository.save(answer);
  }

  console.log('Database seeded with multi-sport data');
}
