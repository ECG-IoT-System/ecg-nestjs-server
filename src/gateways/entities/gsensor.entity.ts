import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Gsensor {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  user: User;

  @Column({ type: 'int' })
  device_id: number;

  @Column({ type: 'double' })
  axisX: number;

  @Column({ type: 'double' })
  axisY: number;

  @Column({ type: 'double' })
  axisZ: number;

  @Column({ type: 'double' })
  @Index()
  timestamp: Number
}