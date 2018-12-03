import { Entity, Column, PrimaryGeneratedColumn, ObjectID, OneToMany } from 'typeorm';
import { Ecgdata } from 'src/gateways/entities/ecgdata.entity';
import { Mac } from 'src/macs/mac.entity';
import { Coef } from 'src/coefs/coef.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @Column({ unique: true })
  username: string;

  @OneToMany(type => Ecgdata, ecgdaton => ecgdaton.user)
  ecgdata: Ecgdata[];

  @OneToMany(type => Mac, mac => mac.user)
  macs: Mac[];
  
  @OneToMany(type => Coef, coef => coef.user)
  coefs: Coef[];
}