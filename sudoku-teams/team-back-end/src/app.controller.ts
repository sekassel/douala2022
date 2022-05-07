import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import Team from './module/builder/team';

@Controller()
export class AppController {
  private logger: Logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('query/')
  async getQuery(): Promise<any>{
   // this.logger.log('controller key',key)
    const result = await this.appService.getList();
    this.logger.log('list key',result) 
    return result;
  }

  @Post('new')
  async postTeam(@Body() team: Team){
    try{
      const c = await this.appService.handleTeam(team);
      return c; 
    }catch(error){
      return error;
    }
  }
}
