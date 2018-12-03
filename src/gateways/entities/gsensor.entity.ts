import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Gsensor {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @Column({ type: 'int', nullable: true })
  device_id: number;

  @Column({ type: 'double', nullable: true })
  axisX: number;

  @Column({ type: 'double', nullable: true })
  axisY: number;

  @Column({ type: 'double', nullable: true })
  axisZ: number;
}