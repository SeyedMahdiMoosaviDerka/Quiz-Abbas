import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Quiz } from '@database/quiz/quiz.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startTime: Date;

  @Column()
  info: string;

  @OneToMany(() => Quiz, (quiz) => quiz.event)
  quizzes: Quiz[];
}
