import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoefService } from './coef.service';
import { CoefController } from './coef.controller';
import { Coef } from './coef.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coef, User])],
  providers: [CoefService],
  controllers: [CoefController],
})

export class CoefModule {}