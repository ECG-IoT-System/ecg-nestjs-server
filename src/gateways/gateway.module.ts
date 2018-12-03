import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { Ecgdata } from './entities/ecgdata.entity';
import { Gsensor } from './entities/gesensor.entity';
import { Mac } from 'src/macs/mac.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ecgdata, Gsensor, Mac])],
  providers: [GatewayService],
  controllers: [GatewayController],
})

export class GatewayModule {}