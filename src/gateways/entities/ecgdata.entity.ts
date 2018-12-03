import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Ecgdata {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  user: User;

  @Column({ type: 'int' })
  device_id: number;

  @Column({ type: 'double' })
  data: number;

  @Column({ type: 'double' })
  @Index()
  timestamp: Number
}