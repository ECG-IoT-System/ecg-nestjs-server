import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Pad {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @ManyToOne(type => User)
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