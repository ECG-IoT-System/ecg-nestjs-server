import { Entity, Column, PrimaryGeneratedColumn, ObjectID, OneToMany } from 'typeorm';
import { Ecgdata } from '../ecgdata/ecgdata.entity';
import { Mac } from '../macs/mac.entity';
import { Coef } from '../coefs/coef.entity';
import { Gsensor } from '../gsensor/gsensor.entity';
import { Ecgdata12 } from '../ecgdata12/ecgdata12.entity';
import { Rssi } from '../rssi/rssi.entity';
import { Location } from '../location/location.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  // @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'double' })
  lasttime: number;

  @Column({ type: 'double' })
  lasttime_12L: number;

  @Column({ type: 'double' })
  lasttime_afstat: number;

  @OneToMany(type => Ecgdata, ecgdata => ecgdata.user)
  ecgdata: Ecgdata[];

  @OneToMany(type => Ecgdata, ecgdata => ecgdata.user)
  ecgdata12: Ecgdata12[];

  @OneToMany(type => Ecgdata, gsensor => gsensor.user)
  gsensors: Gsensor[];

  @OneToMany(type => Ecgdata, rssi => rssi.user)
  rssis: Rssi[];

  @OneToMany(type => Mac, mac => mac.user)
  macs: Mac[];

  @OneToMany(type => Coef, coef => coef.user)
  coefs: Coef[];

  @OneToMany(type => Location, location => location.user)
  locations: Location[];
}