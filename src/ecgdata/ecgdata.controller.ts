import { Controller, Get, Post, Put, Param, Query, Body, HttpException, HttpStatus, Res, Delete } from '@nestjs/common';
import { EcgdataService } from './ecgdata.service';
import { UserService } from '../users/user.service'
import { EcgdataParams } from './view-models/ecgdata-params.model';
import { ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { Ecgdata } from './entities/ecgdata.entity';
import { Gsensor } from './entities/gsensor.entity';
import { Rssi } from './entities/rssi.entity';

@Controller()
@ApiUseTags(Ecgdata.name)
export class EcgdataController {
    constructor(
        private readonly ecgdataService: EcgdataService,
        private readonly userService: UserService,
        ) {}

    @Get('users/:id/ecgdata')
    @ApiImplicitQuery({ name: 'to', required: false })
    @ApiImplicitQuery({ name: 'limit', required: false })
    async findUserEcgdata(
        @Param('id') id: string,
        @Query('from') from: string,
        @Query('to') to?: string,
        @Query('limit') limit?: string,
    ): Promise<Ecgdata[]> {
        if (!from) throw new HttpException('from is required', HttpStatus.BAD_REQUEST);
        
        return this.ecgdataService.findEcgdataByUser({ id, from, to, limit });
    }
    @Get('users/:id/ecgdata/all')
    async findUserEcgdata_all(
        @Param('id') id: string,
    ): Promise<Ecgdata[]> {
        return this.ecgdataService.findEcgdataByUser({ id });
    }

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
        
        return this.ecgdataService.findGsensorByUser({ id, from, to, limit });
    }
    @Get('users/:id/gsensor/all')
    async findUserGsensor_all(
        @Param('id') id: string,
    ): Promise<Gsensor[]> {
        return this.ecgdataService.findGsensorByUser({ id });
    }

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
        
        return this.ecgdataService.findRssiByUser({ id, from, to, limit });
    }
    @Get('users/:id/rssi/all')
    async findUserRssi_all(
        @Param('id') id: string,
    ): Promise<Rssi[]> {
        return this.ecgdataService.findRssiByUser({ id });
    }


    @Post('ecgdata')
    async createEcgdata(@Body() params: EcgdataParams, @Res() res) {
        if (!params.data && params.gsensor && params.mac && params.time) {
            throw new HttpException('Data, Gsensor, Mac, Signals are required', HttpStatus.BAD_REQUEST);
        }
        const mac = await this.ecgdataService.findMac(params.mac);

        if (!mac) {
            throw new HttpException('Mac Mapping Address is undefined', HttpStatus.BAD_REQUEST);
        }
        //console.log(params);
        const user = mac.user;
        const device_id = mac.device_id;

        if (params.rssi) {
            const param = {
                user: user.id,
                mac: params.mac,
                rssi: params.rssi,
                timestamp: params.time[0],
            };

            this.ecgdataService.createRssi(param);
        }

        // move to pipes
        const timediff = params.time[1] - params.time[0];

        // pad singals
        const signals_rate = timediff / params.data.length;
        const body = [];
        params.data.forEach((data, index) => {
            const timestamp = params.time[0] + index * signals_rate;
            body.push({ user: user.id, device_id, data, timestamp });
        });

        // gsensor
        const gsensor_rate = timediff / params.gsensor.length;
        const gbody = [];
        groupArr(params.gsensor, 3)
        .forEach((value, index) => {
            const timestamp = params.time[0] + index * gsensor_rate;
            const axis = { axisX: value[0], axisY: value[1], axisZ: value[2] };
            gbody.push({ user: user.id, device_id, timestamp, ...axis });
        });

        function groupArr(data, n) {
            const group = [];
        ​
            for (let i = 0, j = 0; i < data.length; i++) {
                if (i >= n && i % n === 0)
                    j++;
                group[j] = group[j] || [];
                group[j].push(data[i]);
            }
        ​
            return group;
        }
        // move to pipes -- end 
        this.ecgdataService.createEcgdata(body);
        this.ecgdataService.createGensors(gbody);

        this.ecgdataService.updateMaclasttime({user:user.id, mac:params.mac},{lasttime:params.time[1]});    
        this.userService.updateLasttime({id:user.id,lasttime:params.time[1]});
        return res.status(HttpStatus.OK).json({ statusCode: 200, message: 'success create'});
        // console.log('ecg upload:'+ecg_save);
        // console.log('gsensor upload:'+gsensor_save);
        // console.log('mac time update:'+mac_lasttime);
        // console.log('user time update:'+user_lasttime);

    }
    @Put('users/:id/ecgdata')
    async updateEcgdataAfstat(
        @Param('id') id: string,
        @Query('from') from: string,
        @Query('to') to?: string,
        @Query('afstat') afstat?: string,
    ){
        if (!from || !to || !afstat) throw new HttpException('from is required', HttpStatus.BAD_REQUEST);
        this.userService.updateLasttime({id:id,lasttime_afstat:to})
        return this.ecgdataService.updateAfstatByUser({ id, from, to, afstat });
    }

    @Delete('users/:id/ecgdata')
    async deleteUserEcgdata(
        @Param('id') id: string,
    ){
        this.userService.updateLasttime({id:id,lasttime:0})
        this.userService.updateLasttime({id:id,lasttime_afstat:0})
        return this.ecgdataService.deleteEcgdataByUser({ id });
    }

    @Delete('users/:id/gsensor')
    async deleteUserGsensor(
        @Param('id') id: string,
    ){
        return this.ecgdataService.deleteGsensorByUser({ id });
    }

    @Delete('users/:id/rssi')
    async deleteUserRssi(
        @Param('id') id: string,
    ){
        return this.ecgdataService.deleteRssiByUser({ id });
    }


}
