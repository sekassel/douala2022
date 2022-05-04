import { Injectable } from '@nestjs/common';
import { BuilderService } from './module/builder/builder. service';
import team from './module/builder/team';

@Injectable()
export class AppService {
  
  constructor(
    private readonly modeBuilderService: BuilderService,
  ){}
  
  getHello(): string {
    return 'Hello cour!';
  }
  async handleTeam(team: team) {
    return await this.modeBuilderService.store(team)
  }
}
