import { Injectable } from '@nestjs/common';
import { BuilderService } from './module/builder/builder. service';
import team from './module/builder/team';

@Injectable()
export class AppService {
  constructor(
    private readonly modeBuilderService: BuilderService,
  ){}
  handleCommand(team: team) {
    throw new Error('Method not implemented.');
  }
  
  getHello(): string {
    return 'Hello cour!';
  }
}
