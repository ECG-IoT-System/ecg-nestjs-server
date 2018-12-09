import { Controller, Post, Param, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { Ecgdata12Service } from './ecgdata12.service';
import { UserService } from '../users/user.service';
import { Ecgdata12Params } from './view-models/ecgdata12-params.model';
import { ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';
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
        this.userService.updateLasttime({ id, lasttime_12L:params[params.length-1].time });

        return res.status(HttpStatus.OK).json({ statusCode: 200, message: 'success create'});

    }
}
