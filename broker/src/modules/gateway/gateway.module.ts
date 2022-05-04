import { Module } from '@nestjs/common';
import { EventsGateway } from './event.gateway';
import { GatewayService } from './gateway.service';

@Module({
    providers: [EventsGateway, GatewayService]
})
export class GatewayModule {}
