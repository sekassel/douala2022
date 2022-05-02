import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BuildEvent } from './build-event.schema';
import { Model } from 'mongoose'

@Injectable()
export class BuilderService {
    constructor(
        @InjectModel('buildEvents') private buildEventModel: Model<BuildEvent>
    ){
        // this.clear()
        this.store({
            topic:'UC',
            _id : 'event001',
            time: '12h00',
            payload:{
                name:'armelle',
                score:'415'
            }



        })
    }

    async clear(){
        return this.buildEventModel.db.dropCollection('buildEvents')
    }

    async store(event:BuildEvent){
        const filter = {_id:event._id};
   
        try {
            // await     this.buildEventModel.create(event)
           return this.buildEventModel.findByIdAndUpdate(filter,event,{upsert:true})
        } catch (error) {
            console.log(error.JSON.stringify(),3,null)
            
        }
       
    }



}
