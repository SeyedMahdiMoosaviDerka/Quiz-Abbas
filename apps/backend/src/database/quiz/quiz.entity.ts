import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Event } from '../event/event.entity';

interface Question {
  title: string;
  options: string[];
}

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  questions: Question[];

  @OneToOne(() => Event, (event) => event.quiz)
  event: Event;
}
