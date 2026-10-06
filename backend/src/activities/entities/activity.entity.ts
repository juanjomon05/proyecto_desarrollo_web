// external imports
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// internal imports
import { Subject } from '../../subjects/entities/subject.entity.js';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subjectId: number;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  subject: Subject;

  @Column({ length: 150 })
  title: string;

  @Column({ type: 'varchar', length: 20 })
  type: string;

  @Column({ type: 'varchar', length: 10 })
  dueDate: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'pendiente',
  })
  status: string;

  @Column({ type: 'real', nullable: true })
  grade: number | null;

  @Column({ type: 'real', nullable: true })
  weight: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
