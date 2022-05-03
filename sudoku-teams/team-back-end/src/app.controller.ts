import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import Team from './module/builder/team';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('new')
  async postCommand(@Body() team: Team){
    try{
      
      const c = await this.appService.handleCommand(team);
      return c; 
    }catch(error){
      return error;
    }
  }
}
