import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ManyToOne, JoinColumn, Index ,ObjectIdColumn} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Mac {
  @PrimaryGeneratedColumn()
  //@ObjectIdColumn()
  id: ObjectID;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  user: User;

  @Column({ type: 'int' })
  device_id: number;

  @Column()
  @Index()
  mac: string;
}