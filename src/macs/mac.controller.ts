import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { MacParams } from './view-models/mac-params.model';
import { MacService } from './mac.service';
import { Mac } from './mac.entity';

@Controller()
export class MacController {
    constructor(private readonly macService: MacService) {}

    @Post('macs')
    createMac(@Body() params: MacParams): Promise<Mac> {
        return this.macService.createOne(params);
    }
}
