import { Injectable } from '@nestjs/common';
import { Team } from './module/builder/build-team.schema';
import { BuilderService } from './module/builder/builder. service';


@Injectable()
export class AppService {
  
  constructor(
    private readonly modeBuilderService: BuilderService,
  ){}
  
  getHello(): string {
    return 'Hello cour!';
  }

  async handleTeam(team: Team ) {
    console.log('team app =', team)
    return await this.modeBuilderService.store(team)
  }
}
