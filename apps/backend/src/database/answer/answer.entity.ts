import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Quiz } from '@database/quiz/quiz.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string; // Could be a UUID or username

  @ManyToOne(() => Quiz, (quiz) => quiz.userAnswers)
  quiz: Quiz;

  @Column()
  selectedAnswer: number; // Index of user's chosen option

  @Column({ default: false })
  isCorrect: boolean;

  @Column({ nullable: true })
  reward: number; // e.g., USDT amount, null if not rewarded
}
