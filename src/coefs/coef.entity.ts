import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Coef {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @Column({ type: 'int' })
  version: number;

  @Column()
  description: string;

  @Column()
  F: string;

  @Column()
  K: string;

  @Column()
  HH: string;
  
}