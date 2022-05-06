import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
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

  @Post('new')
<<<<<<< HEAD
  async postTeam(@Body() team:Team ){
=======
  async postTeam(@Body() team: Team){
>>>>>>> 811d1ee7a13e09b1827b5a918365b4260a08fb37
    try{

      const c = await this.appService.handleTeam(team);
      return c; 
    }catch(error){
      return error;
    }
  }
}
