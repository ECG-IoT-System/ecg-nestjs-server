import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { CoefParams } from './view-models/coef-params.model';
import { CoefService } from './coef.service';
import { Coef } from './coef.entity';
import { User } from '../users/user.entity';
import { ApiUseTags } from '@nestjs/swagger';

@Controller()
@ApiUseTags(Coef.name)
export class CoefController {
    constructor(private readonly coefService: CoefService) {}

    @Post('users/:id/coefs')
    createCoefbyid(@Param('id') id: string, @Body() params: CoefParams): Promise<Coef> {
        return this.coefService.createOne({ ...params, user: id });
    }

    @Get('coefs')
    findAll(): Promise<User[]> {
        return this.coefService.findAll();
    }

    @Get('users/:id/coefs')
    findbyUserId(@Param('id') id: string, @Query('v') version){
        if (version) return this.coefService.findbyUserId_version(id, version);
        return this.coefService.findbyUserId(id);
    }

}
