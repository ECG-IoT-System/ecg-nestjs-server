import { Controller, Get, Post, Param, Query, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../users/user.entity';
import { UserParams } from './view-models/user-params.model';
import { Between, MoreThan } from 'typeorm';
import { Ecgdata } from '../ecgdata/entities/ecgdata.entity';
import { ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';

@Controller()
@ApiUseTags(User.name)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('users')
    @ApiImplicitQuery({ name: 'username', required: false })
    findAll(@Query('username') username?: string): Promise<User[]> {
        if (username) {
            return this.userService.findByUsername(username);
        }

        return this.userService.findAll();
    }

    @Get('users/:id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Get('users/:id/ecgdata')
    findUserEcgdata(
        @Param('id') id: string,
        @Query('from') from: string,
        @Query('to') to?: string,
        @Query('limit') limit?: string,
    ): Promise<Ecgdata[]> {

        if (!from) throw new HttpException('from is required', HttpStatus.BAD_REQUEST);

        //if (to) return this.userService.findEcgdataByUser({ user_id: id, timestamp: Between(from, to) });
        if (to) return this.userService.findEcgdataByUser(id, from, to);

        return this.userService.findEcgdataByUser_limit(id, from,limit || 2304);
    }

    @Post('users')
    createUser(@Body() params: UserParams): Promise<User> {
        return this.userService.createOne(params);
    }
}
