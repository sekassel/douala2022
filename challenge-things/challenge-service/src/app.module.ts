import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChallengesController } from './challenges/challenges.controller';

@Module({
  imports: [],
  controllers: [AppController, ChallengesController],
  providers: [AppService],
})
export class AppModule {}
