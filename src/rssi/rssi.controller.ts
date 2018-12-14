import { Controller, Get, Post, Put, Param, Query, Body, HttpException, HttpStatus, Res, Delete } from '@nestjs/common';
import { RssiService } from './rssi.service';
import { ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { Ecgdata } from '../ecgdata/ecgdata.entity';
import { Rssi } from '../rssi/rssi.entity';
import { DeleteResult } from 'typeorm';

@Controller()
@ApiUseTags(Ecgdata.name)
export class RssiController {
    constructor(
        private readonly rssiService: RssiService,
    ) { }

    @Get('users/:id/rssi')
    @ApiImplicitQuery({ name: 'to', required: false })
    @ApiImplicitQuery({ name: 'limit', required: false })
    async findUserRssi(
        @Param('id') id: string,
        @Query('from') from: string,
        @Query('to') to?: string,
        @Query('limit') limit?: string,
    ): Promise<Rssi[]> {
        if (!from) throw new HttpException('from is required', HttpStatus.BAD_REQUEST);

        return this.rssiService.findRssiByUser({ id, from, to, limit });
    }

    @Get('users/:id/rssi/all')
    async findUserRssi_all(@Param('id') id: string): Promise<Rssi[]> {
        return this.rssiService.findRssiByUser({ id });
    }

    @Delete('users/:id/rssi')
    async deleteUserRssi(@Param('id') id: string): Promise<DeleteResult> {
        return this.rssiService.deleteRssiByUser({ id });
    }
}
