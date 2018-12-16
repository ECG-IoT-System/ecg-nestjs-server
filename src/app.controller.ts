import { Get, Controller, HttpStatus, Res, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './users/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

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
