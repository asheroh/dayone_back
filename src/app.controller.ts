import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello/:id/:name')
  getHello(@Req() req: Request, @Body() Body, @Param() param): string {
    console.log(param);
    return this.appService.getHello();
  }

  @Get()
  getHi() {
    return '12312312 world';
  }
}
