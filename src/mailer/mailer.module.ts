import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[ConfigModule,ConfigModule.forRoot()],
  providers: [MailerService],
})
export class MailerModule {}
