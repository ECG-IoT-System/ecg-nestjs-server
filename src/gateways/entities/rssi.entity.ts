import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ManyToOne, JoinColumn, Index ,ObjectIdColumn} from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Rssi {
  @PrimaryGeneratedColumn()
  //@ObjectIdColumn()
  id: ObjectID;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  user: User;

  @Column()
  mac: string;

  @Column({ type: 'int' })
  rssi: number;

  @Column({ type: 'double' })
  @Index()
  timestamp: number;
}