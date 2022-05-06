import { Injectable, OnModuleInit } from "@nestjs/common";
import { Model } from "mongoose";
import { Team } from "./build-team.schema";
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BuilderService implements OnModuleInit {

    constructor(
        @InjectModel('team') private TeamModel:Model<Team> 
    ){}
    
    onModuleInit() {
    }   
    async store(team: Team) {
        console.log('toring.....');
        team.members.push(team.admin)
        const c =  await  this.TeamModel.findOneAndUpdate(
            { teamName:team.teamName},
            team,
            {upsert:true, new: true}).exec();

            return c;
    }
    
}