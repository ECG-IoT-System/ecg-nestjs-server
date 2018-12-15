import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ManyToOne, JoinColumn , ObjectIdColumn} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Coef {
  @PrimaryGeneratedColumn()
  // @ObjectIdColumn()
  id: ObjectID;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  user: User;

  @Column({ type: 'int' })
  version: number;

  @Column()
  description: string;

  @Column({ type: 'text' })
  F: string;

  @Column({ type: 'text' })
  K: string;

  @Column({ type: 'text' })
  HH: string;

}