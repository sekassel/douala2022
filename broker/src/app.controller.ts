import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventsGateway } from './modules/gateway/event.gateway';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private eventGateWay:EventsGateway) {}

  @Get()
  getHello(): string {
    // const socket = io('http://localhost/4001')

   console.log( this.eventGateWay.server.emit('events',"ici"))


    return this.appService.getHello();
  }
}
