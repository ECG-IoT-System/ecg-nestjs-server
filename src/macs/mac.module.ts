import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MacService } from './mac.service';
import { MacController } from './mac.controller';
import { Mac } from './mac.entity';
import { User } from '../users/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Mac, User])],
  providers: [MacService],
  controllers: [MacController],
})

export class MacModule {}