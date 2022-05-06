import { Prop ,Schema,SchemaFactory } from "@nestjs/mongoose";

@Schema() 
export class Team{
    @Prop({ require: true})
    admin:string

    @Prop({require:true})
    teamName:string

<<<<<<< HEAD
    @Prop({require:true})
=======
    @Prop({require: true})
>>>>>>> 811d1ee7a13e09b1827b5a918365b4260a08fb37
    members:Array<String>

}
export const BuildTeam = SchemaFactory.createForClass(Team);