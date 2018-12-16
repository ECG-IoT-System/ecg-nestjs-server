import { Controller, Get, HttpException, HttpStatus, Res } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { ApiUseTags } from '@nestjs/swagger';

@Controller()
@ApiUseTags('Check')
export class CheckController {
    constructor(private readonly userService: UserService) { }

    @Get('live')
    livenessCheck(@Res() res) {
      return res.send(HttpStatus.OK)
    }
  
    @Get('ready')
    readinessCheck(@Res() res) {
      try {
        this.userService.findAll()
      }
      catch(e) {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
      }
  
      return res.send(HttpStatus.OK)
    }
}
