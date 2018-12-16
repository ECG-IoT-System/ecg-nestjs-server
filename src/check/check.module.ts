import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckController } from './check.controller';
import { User } from '../users/user.entity';
import { CheckService } from './check.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CheckService],
  controllers: [CheckController],
})

export class CheckModule {}