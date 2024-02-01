import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill } from './entities/skill.entity';
import { SkillSchema } from './schema/skill.schema';
import { SKIll_REPOSITORY } from './skill.repository';
import { SkillMongoRepository } from './skill.mongo.repository';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Skill.name,schema:SkillSchema}])
  ],
  providers: [
    SkillsService,
    {
      provide: SKIll_REPOSITORY,
      useClass: SkillMongoRepository
    }
  ],
  controllers: [SkillsController],
})
export class SkillsModule {}
