import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { Pad } from './entities/pad.entity';
import { Rssi } from './entities/rssi.entity';
import { Mac } from 'src/macs/mac.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pad, Rssi, Mac])],
  providers: [GatewayService],
  controllers: [GatewayController],
})

export class GatewayModule {}