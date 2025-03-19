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
  sportType?: string;

  @Column('json', { nullable: true })
  homeTeam?: Team;

  @Column('json', { nullable: true })
  awayTeam?: Team;

  @OneToMany(() => Quiz, (quiz) => quiz.event)
  quizzes!: Quiz[];
}
