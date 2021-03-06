import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { MacParams } from './view-models/mac-params.model';
import { MacService } from './mac.service';
import { Mac } from './mac.entity';
import { User } from '../users/user.entity';
import { ApiUseTags } from '@nestjs/swagger';

@Controller()
@ApiUseTags(Mac.name)
export class MacController {
    constructor(private readonly macService: MacService) {}

    @Get('users/:id/macs')
    findUserMac(@Param('id') id: string): Promise<Mac[]> {
        return this.macService.findMacByUserId(id);
    }

    @Get('macs')
    findAll(): Promise<User[]> {
        return this.macService.findAll();
    }

    @Post('users/:id/macs')
    createMacbyId(@Param('id') id: string, @Body() params: MacParams): Promise<Mac> {
        return this.macService.createMac({ ...params, user: id });
    }
}
