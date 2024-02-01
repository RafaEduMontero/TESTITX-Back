import { Module } from '@nestjs/common';
import { CollaboratorController } from './collaborator.controller';
import { CollaboratorService } from './collaborator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Collaborator } from './entities/collaborator.entity';
import { CollaboratorSchema } from './schema/collaborator.schema';
import { COLLABORATOR_REPOSITORY } from './collaborator.repository';
import { CollaboratorMongoRepository } from './collaborator.mongo.repository';
import { MAILER_REPOSITORY, MailerRepository } from 'src/mailer/mailer.repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Collaborator.name,schema:CollaboratorSchema}])
  ],
  providers: [
    CollaboratorService,
    ConfigService,
    {
      provide: COLLABORATOR_REPOSITORY,
      useClass: CollaboratorMongoRepository
    },
    {
      provide: MAILER_REPOSITORY,
      useClass: MailerRepository
    }
  ],
  controllers: [CollaboratorController]
})
export class CollaboratorModule {}
