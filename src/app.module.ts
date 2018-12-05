import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { GatewayModule } from './gateways/gateway.module';
import { MacModule } from './macs/mac.module';
import { CoefModule } from './coefs/coef.module';
import { Ecgdata12Module } from './ecgdata12/ecgdata12.module';
import { URL } from 'url';

const dbUrl = new URL(process.env.DATABASE_URL);
const socketPath = dbUrl.searchParams.get('socketPath');
const extra: any = (socketPath) ? { socketPath } : {};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: dbUrl.hostname,
      port: parseInt(dbUrl.port),
      username: dbUrl.username,
      password: dbUrl.password,
      database: dbUrl.pathname.slice(1),
      extra,
      logging: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    GatewayModule,
    MacModule,
    CoefModule,
    Ecgdata12Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
