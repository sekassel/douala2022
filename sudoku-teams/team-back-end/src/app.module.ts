import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuilderModule } from './module/builder/builder.module';
import {MongooseModule } from '@nestjs/mongoose';
import { BuilderService } from './module/builder/builder. service';

@Module({
  imports: [BuilderModule,
    MongooseModule.forRoot('mongodb+srv://Neambo:Ne@mbo1998@cluster0.ic5iv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService,BuilderService],
})
export class AppModule {}
