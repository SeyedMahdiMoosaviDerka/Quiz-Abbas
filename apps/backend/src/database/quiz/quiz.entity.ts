import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Event } from '../event/event.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  question!: string; // Single question text

  @Column('json')
  options!: string[]; // Predefined answer options

  @ManyToOne(() => Event, (event) => event.quizzes)
  event!: Event;
}
