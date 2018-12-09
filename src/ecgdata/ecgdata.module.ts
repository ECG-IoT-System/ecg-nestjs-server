import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcgdataService } from './ecgdata.service';
import { EcgdataController } from './ecgdata.controller';
import { Ecgdata } from './entities/ecgdata.entity';
import { Gsensor } from './entities/gsensor.entity';
import { Mac } from '../macs/mac.entity';
import { Rssi } from './entities/rssi.entity';
import { Ecgdata12 } from '../ecgdata12/ecgdata12.entity';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ecgdata, Ecgdata12, Gsensor, Mac, Rssi, User])],
  providers: [EcgdataService,UserService],
  controllers: [EcgdataController],
})

export class EcgdataModule {}