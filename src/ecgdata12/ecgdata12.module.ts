import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ecgdata12Service } from './ecgdata12.service';
import { Ecgdata12Controller } from './ecgdata12.controller';
import { Ecgdata12 } from './ecgdata12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ecgdata12])],
  providers: [Ecgdata12Service],
  controllers: [Ecgdata12Controller],
})

export class Ecgdata12Module {}