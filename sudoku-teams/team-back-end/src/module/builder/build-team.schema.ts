import { Prop ,Schema,SchemaFactory } from "@nestjs/mongoose";

@Schema() 
export class Team{
    @Prop({ require: true})
    admin:string

    @Prop({require:true})
    teamName:string

    @Prop({require: true})
    members:Array<String>

}
export const BuildTeam = SchemaFactory.createForClass(Team);