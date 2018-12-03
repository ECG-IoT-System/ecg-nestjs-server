import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/users/user.entity';
import { Ecgdata } from 'src/gateways/entities/ecgdata.entity';
import { Mac } from 'src/macs/mac.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Ecgdata, Mac])],
  providers: [UserService],
  controllers: [UserController],
})

export class UserModule {}