import { Entity, Column, PrimaryGeneratedColumn, ObjectID, OneToMany } from 'typeorm';
import { Ecgdata } from 'src/gateways/entities/ecgdata.entity';
import { Mac } from 'src/macs/mac.entity';
import { Coef } from 'src/coefs/coef.entity';
import { Gsensor } from 'src/gateways/entities/gsensor.entity';
import { Ecgdata12 } from 'src/ecgdata12/ecgdata12.entity';
import { Rssi } from 'src/gateways/entities/rssi.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @Column({ unique: true })
  username: string;

  @OneToMany(type => Ecgdata, ecgdaton => ecgdaton.user)
  ecgdata: Ecgdata[];

  @OneToMany(type => Ecgdata, ecgdaton => ecgdaton.user)
  ecgdata12: Ecgdata12[];

  @OneToMany(type => Ecgdata, gsensor => gsensor.user)
  gsensors: Gsensor[];

  @OneToMany(type => Ecgdata, rssi => rssi.user)
  rssis: Rssi[];

  @OneToMany(type => Mac, mac => mac.user)
  macs: Mac[];
  
  @OneToMany(type => Coef, coef => coef.user)
  coefs: Coef[];
}