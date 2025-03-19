import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Event } from '../event/event.entity';

interface UserAnswer {
  questionIndex: number;
  answer: string;
}

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @ManyToOne(() => Event)
  event: Event;

  @Column('json')
  answers: UserAnswer[];
}
