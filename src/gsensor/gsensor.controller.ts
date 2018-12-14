import { Controller, Get, Post, Put, Param, Query, Body, HttpException, HttpStatus, Res, Delete } from '@nestjs/common';
import { GsensorService } from './gsensor.service';
import { ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { Ecgdata } from '../ecgdata/ecgdata.entity';
import { Gsensor } from '../gsensor/gsensor.entity';
import { DeleteResult } from 'typeorm';

@Controller()
@ApiUseTags(Ecgdata.name)
export class GsensorController {
    constructor(
        private readonly gsensorService: GsensorService,
    ) { }

    @Get('users/:id/gsensor')
    @ApiImplicitQuery({ name: 'to', required: false })
    @ApiImplicitQuery({ name: 'limit', required: false })
    async findUserGsensor(
        @Param('id') id: string,
        @Query('from') from: string,
        @Query('to') to?: string,
        @Query('limit') limit?: string,
    ): Promise<Gsensor[]> {
        if (!from) throw new HttpException('from is required', HttpStatus.BAD_REQUEST);

        return this.gsensorService.findGsensorByUser({ id, from, to, limit });
    }

    @Get('users/:id/gsensor/all')
    async findUserGsensor_all(@Param('id') id: string): Promise<Gsensor[]> {
        return this.gsensorService.findGsensorByUser({ id });
    }

    @Delete('users/:id/gsensor')
    async deleteUserGsensor(@Param('id') id: string): Promise<DeleteResult> {
        return this.gsensorService.deleteGsensorByUser({ id });
    }
}
