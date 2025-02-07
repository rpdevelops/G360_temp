import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  attributed: string;

  @Column('text', { array: true }) // Storing observers as a Postgres array
  observers: string[];

  @Column()
  date: Date;

  @Column()
  startTime: string; // ISO datetime string

  @Column()
  endTime: string;   // ISO datetime string

  @Column({ default: 'Aberta' })
  status: string;
}
