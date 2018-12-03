import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Ecgdata } from '../gateways/entities/ecgdata.entity';
import { Mac } from '../macs/mac.entity';
import { Ecgdata12 } from '../ecgdata12/ecgdata12.entity';
import { Gsensor } from '../gateways/entities/gsensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Ecgdata, Ecgdata12, Gsensor, Mac])],
  providers: [UserService],
  controllers: [UserController],
})

export class UserModule {}