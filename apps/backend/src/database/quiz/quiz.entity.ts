import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Event } from '@database/event/event.entity';
import { Answer } from '@database/answer/answer.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column('json')
  options: string[]; // e.g., ["Option A", "Option B", "Option C"]

  @Column()
  correctAnswer: number; // Index of correct option (0-based)

  @ManyToOne(() => Event, (event) => event.quizzes)
  event: Event;

  @OneToMany(() => Answer, (answer) => answer.quiz)
  userAnswers: Answer[];
}
