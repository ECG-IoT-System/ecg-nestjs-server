import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Mac {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @Column({ type: 'int' })
  device_id: number;

  @Column()
  @Index()
  mac: string;
}