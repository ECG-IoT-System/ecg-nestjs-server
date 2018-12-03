import { Controller, Get, Post, Param, Query, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayParams } from './view-models/gateway-params.model';

@Controller()
export class GatewayController {
    constructor(
        private readonly gatewayService: GatewayService, 
        ) {}

    @Post('pads/signals')
    async createSignals(@Body() params: GatewayParams, @Res() res) {
        if (!params.data && params.gsensor && params.mac && params.time) {
            throw new HttpException('Data, Gsensor, Mac, Signals are required', HttpStatus.BAD_REQUEST)
        }

        let mac = await this.gatewayService.findMac(params.mac);

        if (!mac) {
            throw new HttpException('Mac Mapping Address is undefined', HttpStatus.BAD_REQUEST)
        }

        let user = mac.user;
        let device_id = mac.device_id;

        if (params.rssi) {
            let param = {
                user: user.id,
                mac: params.mac,
                rssi: params.rssi,
                timestamp: params.time[0]
            }

            this.gatewayService.createRssi(param);
        }

        // move to pipes
        let timediff = params.time[1] - params.time[0];

        // pad singals
        let signals_rate = timediff / params.data.length;
        let body = [];
        params.data.forEach(function(data, index) {
            let timestamp = params.time[0] + index * signals_rate;
            body.push({ user: user.id, device_id, data, timestamp });
        })

        // gsensor
        let gsensor_rate = timediff / params.gsensor.length;
        let gbody = [];
        groupArr(params.gsensor, 3)
        .map(function(value, index) {
            console.log("i", index)
            let timestamp = params.time[0] + index * gsensor_rate;
            let axis = { axisX: value[0], axisY: value[1], axisZ: value[2] }
            gbody.push({ user: user.id, device_id, timestamp, ...axis });
        })

        function groupArr(data, n) {
            var group = [];
        ​
            for (var i = 0, j = 0; i < data.length; i++) {
                if (i >= n && i % n === 0)
                    j++;
                group[j] = group[j] || [];
                group[j].push(data[i])
            }
        ​
            return group;
        }
        // move to pipes -- end

        this.gatewayService.createSignals(body);
        this.gatewayService.createGensors(gbody);

        return res.status(HttpStatus.OK).json({ statusCode: 200, message: "success create"});
    }
}
