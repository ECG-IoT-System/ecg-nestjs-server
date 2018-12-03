import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { GatewayModule } from './gateways/gateway.module';
import { MacModule } from './macs/mac.module';
import { CoefModule } from './coefs/coef.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    GatewayModule,
    MacModule,
    CoefModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
