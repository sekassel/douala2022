import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BuilderModule } from './modules/builder/builder.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { EventsGateway } from './modules/gateway/event.gateway';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root:melle1234@microback.tht2n.mongodb.net/brokerDB?retryWrites=true&w=majority'),
    BuilderModule,
    GatewayModule
  ],
  controllers: [AppController],
  providers: [AppService,EventsGateway],
})
export class AppModule {}
