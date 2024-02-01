import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill } from './entities/skill.entity';
import { SkillSchema } from './schema/skill.schema';
import { SKIll_REPOSITORY } from './skill.repository';
import { SkillMongoRepository } from './skill.mongo.repository';
import { COLLABORATOR_REPOSITORY } from 'src/collaborator/collaborator.repository';
import { CollaboratorMongoRepository } from 'src/collaborator/collaborator.mongo.repository';
import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import { CollaboratorSchema } from 'src/collaborator/schema/collaborator.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Skill.name,schema:SkillSchema}]),
    MongooseModule.forFeature([{ name: Collaborator.name, schema: CollaboratorSchema }])
  ],
  providers: [
    SkillsService,
    {
      provide: COLLABORATOR_REPOSITORY,
      useClass: CollaboratorMongoRepository
    },
    {
      provide: SKIll_REPOSITORY,
      useClass: SkillMongoRepository
    }
  ],
  controllers: [SkillsController],
})
export class SkillsModule {}
