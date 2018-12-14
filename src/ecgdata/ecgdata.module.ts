import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcgdataService } from './ecgdata.service';
import { EcgdataController } from './ecgdata.controller';
import { Ecgdata } from './ecgdata.entity';
import { Gsensor } from '../gsensor/gsensor.entity';
import { Mac } from '../macs/mac.entity';
import { Rssi } from '../rssi/rssi.entity';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { RssiService } from 'src/rssi/rssi.service';
import { GsensorService } from 'src/gsensor/gsensor.service';
import { MacService } from 'src/macs/mac.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ecgdata, Gsensor, Mac, Rssi, User])],
  providers: [EcgdataService, GsensorService, UserService, RssiService, MacService],
  controllers: [EcgdataController],
})

export class EcgdataModule {}