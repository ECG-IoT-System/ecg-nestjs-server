import { Controller, Get, Post, Param, Query, Body , HttpStatus , HttpException ,Res } from '@nestjs/common';
import { LocationParams } from './view-models/location-params.model';
import { LocationService } from './location.service';
import { Location } from './location.entity';
import { User } from '../users/user.entity';
import { ApiUseTags , ApiImplicitQuery} from '@nestjs/swagger';

@Controller()
@ApiUseTags(Location.name)
export class LocationController {
    constructor(
        private readonly locationService: LocationService)  {}
    @Post('users/:id/location')
    async createLocation(@Param('id') id: string, @Body() params: LocationParams, @Res() res) {
        
        this.locationService.createOne({ ...params , user : id });
        
        return res.status(HttpStatus.OK).json({ statusCode: 200, message: 'success create'});
    }

    @Get('users/:id/location')
    @ApiImplicitQuery({ name: 'to', required: false })
    @ApiImplicitQuery({ name: 'limit', required: false })
    async findUserEcgdata(
        @Param('id') id: string,
        @Query('from') from: string,
        @Query('to') to?: string,
        @Query('limit') limit?: number,
    ): Promise<Location[]> {
        if (!from) throw new HttpException('from is required', HttpStatus.BAD_REQUEST);
        
        return this.locationService.findLocationByUser({ id, from, to, limit });
    }
    
    @Get('users/:id/location/all')
    async findUserLocation_all(
        @Param('id') id: string,
    ): Promise<Location[]> {
        return this.locationService.findLocationByUser({ id });
    }

}
