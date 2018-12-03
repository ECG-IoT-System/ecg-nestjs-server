import { Entity, Column, PrimaryGeneratedColumn, ObjectID, OneToMany } from 'typeorm';
import { Coef } from 'src/coefs/coef.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @Column({ unique: true })
  username: string;

  @OneToMany(type => Coef, coef => coef.user)
  coefs: Coef[];
}