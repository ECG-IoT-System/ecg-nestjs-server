import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ManyToOne, JoinColumn, Index , ObjectIdColumn} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Ecgdata12 {
  @PrimaryGeneratedColumn()
  // @ObjectIdColumn()
  id: ObjectID;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  user: User;

  @Column({ type: 'double' })
  @Index()
  timestamp: number;

  @Column({ type: 'double' }) L1: number;
  @Column({ type: 'double' }) L2: number;
  @Column({ type: 'double' }) L3: number;
  @Column({ type: 'double' }) V1: number;
  @Column({ type: 'double' }) V2: number;
  @Column({ type: 'double' }) V3: number;
  @Column({ type: 'double' }) V4: number;
  @Column({ type: 'double' }) V5: number;
  @Column({ type: 'double' }) V6: number;
  @Column({ type: 'double' }) aVR: number;
  @Column({ type: 'double' }) aVL: number;
  @Column({ type: 'double' }) aVF: number;
}