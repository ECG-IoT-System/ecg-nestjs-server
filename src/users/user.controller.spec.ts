import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModule } from './user.module'
import { AppModule } from '../app.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Ecgdata } from '../ecgdata/ecgdata.entity';
import { Ecgdata12 } from '../ecgdata12/ecgdata12.entity';
import { Gsensor } from '../gsensor/gsensor.entity';
import { Mac } from '../macs/mac.entity';

describe('UserController', () => {
    let module: TestingModule;
    let userController: UserController;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        userController = module.get<UserController>(UserController);
    });

    // describe('findAll', () => {
        // it('get all', async () => {
        //     console.log('---', userController)
        //     expect(userController).toBeDefined();
        //     expect(await userController.findAll()).toBe('Hello World!');
        // });
    // });
});
