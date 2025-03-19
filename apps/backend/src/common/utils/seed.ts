import { Event } from '@app/database/event/event.entity';
import { Quiz } from '@app/database/quiz/quiz.entity';
import { Answer } from '@app/database/answer/answer.entity';
import { DataSource } from 'typeorm';

async function seedDatabase(dataSource: DataSource) {
  const eventRepository = dataSource.getRepository(Event);
  const quizRepository = dataSource.getRepository(Quiz);
  const answerRepository = dataSource.getRepository(Answer);

  // Seed multiple events
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
      name: 'Lakers vs Celtics',
      startTime: new Date('2025-03-21T20:00:00Z'),
      info: 'Predict the winner!',
      sportType: 'basketball',
      homeTeam: {
        name: 'Lakers',
        country: 'USA',
        logoUrl: 'https://example.com/lakers.png',
      },
      awayTeam: {
        name: 'Celtics',
        country: 'USA',
        logoUrl: 'https://example.com/celtics.png',
      },
    },
    {
      name: 'Real Madrid vs Barcelona',
      startTime: new Date('2025-03-22T18:00:00Z'),
      info: 'Win 50 USDT!',
      sportType: 'football',
      homeTeam: {
        name: 'Real Madrid',
        country: 'Spain',
        logoUrl: 'https://example.com/rm.png',
      },
      awayTeam: {
        name: 'Barcelona',
        country: 'Spain',
        logoUrl: 'https://example.com/barca.png',
      },
    },
  ];

  for (const eventData of events) {
    const event = eventRepository.create(eventData);
    await eventRepository.save(event);

    const quizzes = [
      { question: 'Number of goals?', options: ['0', '1', '2', '3'], event },
      {
        question: 'First scorer?',
        options: ['Player A', 'Player B', 'None'],
        event,
      },
    ];
    const savedQuizzes = await quizRepository.save(
      quizzes.map((q) => quizRepository.create(q))
    );

    const answer = answerRepository.create({
      userId: `user-${Math.random().toString(36).substr(2, 9)}`,
      event,
      answers: [{ questionIndex: 0, answer: '2' }],
    });
    await answerRepository.save(answer);
  }

  console.log('Database seeded successfully');
}

export { seedDatabase };
