import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { EcgdataModule } from './ecgdata/ecgdata.module';
import { MacModule } from './macs/mac.module';
import { CoefModule } from './coefs/coef.module';
import { Ecgdata12Module } from './ecgdata12/ecgdata12.module';
import { LocationModule } from './location/location.module';
import { URL } from 'url';
import { RssiModule } from './rssi/rssi.module';
import { CheckModule } from './check/check.module';

const dbUrl = new URL(process.env.DATABASE_URL);
const socketPath = dbUrl.searchParams.get('socketPath');
const dbConfig: any = {
  type: dbUrl.protocol.slice(0, -1),
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port, 10),
  username: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  logging: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.DATABASE_AUTO_UPDATE === 'true',
};

if (socketPath) dbConfig.extra = { socketPath };

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
    MacModule,
    CoefModule,
    EcgdataModule,
    Ecgdata12Module,
    LocationModule,
    RssiModule,
    CheckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
