import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckController } from './check.controller';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [CheckController],
})

export class CheckModule {}