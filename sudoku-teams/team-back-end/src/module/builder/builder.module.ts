import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildTeam } from './build-team.schema';
import { BuilderService } from './builder. service';

@Module({
    imports: [
        MongooseModule.forFeature([
          {name: 'team',schema:BuildTeam},
        ])
      ],
      providers: [BuilderService],
      exports: [BuilderService],
})
export class BuilderModule {}
