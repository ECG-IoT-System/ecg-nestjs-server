import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ecgdata12Service } from './ecgdata12.service';
import { Ecgdata12Controller } from './ecgdata12.controller';
import { Ecgdata12 } from './ecgdata12.entity';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/user.entity';
import { Ecgdata } from '../ecgdata/entities/ecgdata.entity';
import { Mac } from '../macs/mac.entity';
import { Gsensor } from '../ecgdata/entities/gsensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Ecgdata, Ecgdata12, Gsensor, Mac])],
  providers: [Ecgdata12Service,UserService],
  controllers: [Ecgdata12Controller],
})

export class Ecgdata12Module {}