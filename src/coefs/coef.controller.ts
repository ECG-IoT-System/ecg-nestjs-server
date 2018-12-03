import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { CoefParams } from './view-models/coef-params.model';
import { CoefService } from './coef.service';
import { Coef } from './coef.entity';

@Controller()
export class CoefController {
    constructor(private readonly coefService: CoefService) {}

    @Post('coefs')
    createCoef(@Body() params: CoefParams): Promise<Coef> {
        console.log(params);
        return this.coefService.createOne(params);
    }
    
    @Post('user/:id/coefs')
    createCoefbyid(@Body() params , @Param('id') id: string): Promise<Coef> {
        params.user_id = id
        return this.coefService.createOne(params);
    }
    @Get('coefs')
    findAll(): Promise<Coef[]> {
        return this.coefService.findAll();
    }

}
