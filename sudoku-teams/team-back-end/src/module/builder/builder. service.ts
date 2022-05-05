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
        const collection = await this.TeamModel.find({teamName:team.teamName})

        console.log('collection', collection)
        console.log('team builde',team)

        if(collection != []){
             return 'this team exit in the data base'   
        }else{
            const Nteam={
                admin:team.admin,
                teamName:team.teamName,
                members:team.members.push(team.admin)
            }
            console.log('Nteam ', Nteam)
            const c =  await  this.TeamModel.findOneAndUpdate (
                { teamName:team.teamName},
                Nteam,
                {upsert:true, new: true}).exec();
                return c; 
        }       
                
    }
    
}