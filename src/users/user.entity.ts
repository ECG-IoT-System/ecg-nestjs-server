import { Entity, Column, PrimaryGeneratedColumn, ObjectID } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @Column({ unique: true })
  username: string;
}