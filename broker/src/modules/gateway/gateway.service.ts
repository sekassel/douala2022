import { Injectable } from '@nestjs/common';
import { EventsGateway } from './event.gateway';

@Injectable()
export class GatewayService {

    constructor(eventgateway:EventsGateway){}

    useGate(){
        // this.eventgateway.

    }
}
