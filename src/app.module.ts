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
const dbConfig: any = {
  type: dbUrl.protocol,
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port, 10),
  username: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  logging: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
}

const socketPath = dbUrl.searchParams.get('socketPath');
if (socketPath) dbConfig.extra = { socketPath }

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
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
