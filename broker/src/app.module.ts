import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BuilderModule } from './modules/builder/builder.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root:melle1234@microback.tht2n.mongodb.net/brokerDB?retryWrites=true&w=majority'),
    BuilderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
