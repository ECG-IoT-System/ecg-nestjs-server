import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ManyToOne, JoinColumn, Index ,ObjectIdColumn} from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Ecgdata {
  @PrimaryGeneratedColumn()
  //@ObjectIdColumn()
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
  timestamp: number;
}