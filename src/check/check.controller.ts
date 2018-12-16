import { Controller, Get, HttpException, HttpStatus, Res } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CheckService } from './check.service';

@Controller()
@ApiUseTags('Check')
export class CheckController {
    constructor(private readonly checkService: CheckService) { }

    @Get('live')
    livenessCheck(@Res() res) {
      return res.send(HttpStatus.OK)
    }
  
    @Get('ready')
    readinessCheck(@Res() res) {
      try {
        this.checkService.checkUsers()
      }
      catch(e) {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
      }
  
      return res.send(HttpStatus.OK)
    }
}
