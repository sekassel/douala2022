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
     const c= await this.modeBuilderService.store(team)
     //console.log("app c=",c)
     return c
  }

  async getList(){
    //console.log('app use', use)
    const l= await this.modeBuilderService.getTeams()
    //console.log('app list', l)
    return l
  }

}
