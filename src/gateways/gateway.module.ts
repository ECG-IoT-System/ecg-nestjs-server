import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { Ecgdata } from './entities/ecgdata.entity';
import { Gsensor } from './entities/gsensor.entity';
import { Mac } from 'src/macs/mac.entity';
import { Rssi } from './entities/rssi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ecgdata, Gsensor, Mac, Rssi])],
  providers: [GatewayService],
  controllers: [GatewayController],
})

export class GatewayModule {}