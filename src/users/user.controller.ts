import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/users/user.entity';
import { UserParams } from './view-models/user-params.model';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('users')
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
    createUser(@Body() params: UserParams) {
        return this.userService.createOne(params);
    }
}
