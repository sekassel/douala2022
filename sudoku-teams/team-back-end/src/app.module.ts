import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuilderModule } from './module/builder/builder.module';

@Module({
  imports: [BuilderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
