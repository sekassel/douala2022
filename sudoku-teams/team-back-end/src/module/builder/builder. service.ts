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
        //console.log('team builde',team)
        const Nteam={
                admin:team.admin,
                teamName:team.teamName,
                members:team.members
        }
        //console.log('nteam',Nteam)

        const c =  await  this.TeamModel.findOneAndUpdate (
            { teamName:team.teamName},
            Nteam,
            {upsert:true, new: true}).exec();
           
            return c; 
    }


    async getTeams() {
        const l =  await this.TeamModel.find()
        //console.log('builder list',l)
        return l
    }

    async addMember(member:string){
        
    }


}