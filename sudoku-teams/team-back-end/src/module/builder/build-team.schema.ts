import { Prop ,Schema,SchemaFactory } from "@nestjs/mongoose";

@Schema() 
export class Team{
    @Prop({ require: true})
    useName:string

    @Prop({require:true})
    teamName:string

}
export const BuildTeam = SchemaFactory.createForClass(Team);