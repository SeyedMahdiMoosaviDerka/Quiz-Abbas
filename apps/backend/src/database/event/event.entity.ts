import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column()
  info: string;

  @OneToOne(() => Quiz, (quiz) => quiz.event)
  quiz: Quiz;
}
