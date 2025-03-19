import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '5432'),
          username: process.env.DB_USERNAME || 'postgres',
          password: process.env.DB_PASSWORD || 'root',
          database: process.env.DB_NAME || 'sports_quiz_test', // Use a test DB
          entities: ['src/**/*.entity{.ts,.js}'],
          synchronize: true, // Drop and recreate schema for tests
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/events (CRUD)', () => {
    let eventId: number;

    it('POST /events - should create an event', async () => {
      const response = await request(app.getHttpServer())
        .post('/events')
        .send({
          name: 'Test Event',
          startTime: '2025-03-20T14:00:00Z',
          sportType: 'Football',
        })
        .expect(201);
      eventId = response.body.id;
      expect(response.body.name).toBe('Test Event');
    });

    it('GET /events - should list events', () => {
      return request(app.getHttpServer())
        .get('/events')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('GET /events/:id - should get an event', () => {
      return request(app.getHttpServer())
        .get(`/events/${eventId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(eventId);
        });
    });

    it('PUT /events/:id - should update an event', () => {
      return request(app.getHttpServer())
        .put(`/events/${eventId}`)
        .send({ name: 'Updated Event' })
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe('Updated Event');
        });
    });

    it('DELETE /events/:id - should delete an event', () => {
      return request(app.getHttpServer())
        .delete(`/events/${eventId}`)
        .expect(200);
    });
  });

  it('POST /answers - should submit an answer', () => {
    return request(app.getHttpServer())
      .post('/answers')
      .send({
        eventId: 1,
        quizId: 1,
        answer: 'Option A',
        userId: 'user123',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.answer).toBe('Option A');
      });
  });
});
