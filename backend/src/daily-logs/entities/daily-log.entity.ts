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
import { User } from '../../users/entities/user.entity.js';

@Entity('daily_logs')
export class DailyLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'varchar', length: 10 })
  date: string;

  @Column({ type: 'real' })
  studyHours: number;

  @Column({ type: 'real' })
  sleepHours: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
