import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { MacParams } from './view-models/mac-params.model';
import { MacService } from './mac.service';
import { Mac } from './mac.entity';

@Controller()
export class MacController {
    constructor(private readonly macService: MacService) {}

    @Get('users/:id/macs')
    findUserMac(@Param('id') id: string): Promise<Mac[]> {
        return this.macService.findMacByUserId(id);
    }

    @Post('users/:id/macs')
    createMac(@Param('id') id: string, @Body() params: MacParams): Promise<Mac> {
        return this.macService.createMac({ ...params, user: id });
    }
}
