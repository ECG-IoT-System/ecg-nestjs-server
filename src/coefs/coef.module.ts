import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoefService } from './coef.service';
import { CoefController } from './coef.controller';
import { Coef } from './coef.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coef])],
  providers: [CoefService],
  controllers: [CoefController],
})

export class CoefModule {}