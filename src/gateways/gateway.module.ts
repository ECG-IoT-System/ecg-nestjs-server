import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { Ecgdata } from './entities/ecgdata.entity';
import { Gsensor } from './entities/gsensor.entity';
import { Mac } from '../macs/mac.entity';
import { Rssi } from './entities/rssi.entity';
import { Ecgdata12 } from '../ecgdata12/ecgdata12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ecgdata, Ecgdata12, Gsensor, Mac, Rssi])],
  providers: [GatewayService],
  controllers: [GatewayController],
})

export class GatewayModule {}