import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RssiService } from './rssi.service';
import { RssiController } from './rssi.controller';
import { Ecgdata } from '../ecgdata/ecgdata.entity';
import { Gsensor } from '../gsensor/gsensor.entity';
import { Mac } from '../macs/mac.entity';
import { Rssi } from '../rssi/rssi.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ecgdata, Gsensor, Mac, Rssi, User])],
  providers: [RssiService],
  controllers: [RssiController],
})

export class RssiModule {}