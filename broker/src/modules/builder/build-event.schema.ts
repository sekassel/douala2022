import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Schema as MongooseSchema} from 'mongoose'





@Schema()
export class BuildEvent {

    @Prop({ required: true})
    topic: string;

    @Prop({ required: true,})
    _id:String;

    @Prop({ required: true})
    time: string;

    @Prop({ required: true , type: MongooseSchema.Types.Mixed })
    payload: any;    
}

export const BuildEventSchema = SchemaFactory.createForClass(BuildEvent)