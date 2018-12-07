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

    @Post('users')
    createUser(@Body() params: UserParams): Promise<User> {
        return this.userService.createOne(params);
    }
}
