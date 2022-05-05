import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuilderModule } from './module/builder/builder.module';
import {MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Neambo:rU9r5MNEz9qJfL4a@cluster0.ic5iv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    BuilderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
