import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';

interface Team {
  name: string;
  country: string;
  logoUrl?: string;
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'timestamp' })
  startTime!: Date;

  @Column()
  info!: string;

  @Column({ nullable: true })
  sportType?: string; // For multi-sport support

  @Column('json', { nullable: true })
  homeTeam?: Team; // Team details

  @Column('json', { nullable: true })
  awayTeam?: Team; // Team details

  @OneToMany(() => Quiz, (quiz) => quiz.event) // Support up to 5 quizzes
  quizzes!: Quiz[];
}
