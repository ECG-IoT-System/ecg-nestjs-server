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

  @Column({ length: 6000 })
  F: string;

  @Column({ length: 6000 })
  K: string;

  @Column({ length: 6000 })
  HH: string;

}