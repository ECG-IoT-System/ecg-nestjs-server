import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Ecgdata } from '../ecgdata/ecgdata.entity';
import { Ecgdata12 } from '../ecgdata12/ecgdata12.entity';
import { Gsensor } from '../gsensor/gsensor.entity';
import { Mac } from '../macs/mac.entity';


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

describe('UserController', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            // imports: [TypeOrmModule.forFeature([User, Ecgdata, Ecgdata12, Gsensor, Mac])],
            // controllers: [UserController],
            // providers: [UserService],
            imports: [TypeOrmModule.forRoot(dbConfig)],
            controllers: [UserController],
            // providers: [UserService],
        }).compile();
    });

    describe('findAll', () => {
        it('get all', async () => {
            const userController: UserController = module.get<UserController>(UserController);
            expect(await userController.findAll()).toBe('Hello World!');
        });
    });
});
