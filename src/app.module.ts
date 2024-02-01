import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { SkillsModule } from './skills/skills.module';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/colaboradoresDB'),
    UsersModule,
    SkillsModule,
    CollaboratorModule,
    MailerModule,
  ],
})
export class AppModule {}
