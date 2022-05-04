import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger: Logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('new')
  async postTeam(@Body() team: any){
    try{
      this.logger.log('poteam.................;')
      const c = await this.appService.handleTeam(team);
      return c; 
    }catch(error){
      return error;
    }
  }
}
