import { Controller, Post, Get, Delete, Param, Query, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { Ecgdata12Service } from './ecgdata12.service';
import { UserService } from '../users/user.service';
import { Ecgdata12Params } from './view-models/ecgdata12-params.model';
import { ApiUseTags, ApiImplicitBody, ApiImplicitQuery } from '@nestjs/swagger';
import { Ecgdata12 } from './ecgdata12.entity';

@Controller()
@ApiUseTags(Ecgdata12.name)
export class Ecgdata12Controller {
    constructor(
        private readonly ecgdata12Service: Ecgdata12Service,
        private readonly userService: UserService,
        ) {}

    @Post('users/:id/ecgdata12')
    @ApiImplicitBody({ name: 'Array', type: Ecgdata12Params, isArray: true })
    async createEcgdata12(@Param('id') id: string, @Body() params: Ecgdata12Params[], @Res() res) {
        // move to enum
        const keys = ['L1', 'L2', 'L3', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'aVR', 'aVL', 'aVF'];

        const body = [];
        params.forEach(obj => {
            const rst = { user: id, timestamp: obj.time };
            keys.forEach((key, index) => {
                rst[key] = obj.ecg[index];
            });
            body.push(rst);
        });

        this.ecgdata12Service.createEcgdata12(body);
        this.userService.updateLasttime({ id, lasttime_12L: params[params.length - 1].time });

        return res.status(HttpStatus.OK).json({ statusCode: 200, message: 'success create'});

    }

    @Get('users/:id/ecgdata12')
    @ApiImplicitQuery({ name: 'to', required: false })
    @ApiImplicitQuery({ name: 'limit', required: false })
    async findUserEcgdata(
        @Param('id') id: string,
        @Query('from') from: string,
        @Query('to') to?: string,
        @Query('limit') limit?: number,
    ): Promise<Ecgdata12[]> {
        if (!from) throw new HttpException('from is required', HttpStatus.BAD_REQUEST);

        return this.ecgdata12Service.findEcgdata12ByUser({ id, from, to, limit });
    }

    @Get('users/:id/ecgdata12/all')
    async findUserEcgdata12_all(
        @Param('id') id: string,
    ): Promise<Ecgdata12[]> {
        return this.ecgdata12Service.findEcgdata12ByUser({ id });
    }

    @Delete('users/:id/ecgdata12')
    async deleteUserEcgdata12(
        @Param('id') id: string,
    ){
        return this.ecgdata12Service.deleteEcgdata12ByUser({ id });
    }

}
