import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GsensorService } from './gsensor.service';
import { GsensorController } from './gsensor.controller';
import { Gsensor } from './gsensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gsensor])],
  providers: [GsensorService],
  controllers: [GsensorController],
})

export class EcgdataModule {}