import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ManyToOne, JoinColumn , ObjectIdColumn , Index} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  user: User;

  @Column({ type: 'double' })
  x: number;

  @Column({ type: 'double' })
  y: number;

  @Column({ type: 'double' })
  @Index()
  timestamp: number;

}