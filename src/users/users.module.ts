import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { UserMongoRepository } from './user-mongo.repository';
import { USER_REPOSITORY } from './user.repository';
import { UserSchema } from './schema/user.schema';
import { COLLABORATOR_REPOSITORY } from 'src/collaborator/collaborator.repository';
import { CollaboratorMongoRepository } from 'src/collaborator/collaborator.mongo.repository';
import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import { CollaboratorSchema } from 'src/collaborator/schema/collaborator.schema';
import { MAILER_REPOSITORY, MailerRepository } from 'src/mailer/mailer.repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Collaborator.name, schema: CollaboratorSchema }])
  ],
  providers: [
    UsersService,
    ConfigService,
    {
      provide: USER_REPOSITORY,
      useClass: UserMongoRepository,
    },
    {
      provide: COLLABORATOR_REPOSITORY,
      useClass: CollaboratorMongoRepository
    },
    {
      provide: MAILER_REPOSITORY,
      useClass: MailerRepository
    }
  ],
  controllers: [UsersController],
})
export class UsersModule {}
