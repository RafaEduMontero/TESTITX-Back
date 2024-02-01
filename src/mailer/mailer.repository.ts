import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from 'nodemailer';
import { SendMailDto } from "./dto/email.dto";

export const MAILER_REPOSITORY = "MailerRepository";

@Injectable()
export class MailerRepository{
    constructor(private readonly consfigservice:ConfigService){}

    mailTrasport(){
        const transporter = nodemailer.createTransport({
            host: this.consfigservice.get<string>('MAIL_HOST'),
            port: this.consfigservice.get<string>('MAIL_PORT'),
            secure: false,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: this.consfigservice.get<string>('MAIL_USER'),
              pass: this.consfigservice.get<string>('MAIL_PASSWORD'),
            },
          });

          return transporter;
    }

    async sendMail(dto:SendMailDto){
        const{recipients,subject,html} = dto;

        const transport = this.mailTrasport();

        const options = {
            from: {
                name: this.consfigservice.get<string>('APP_NAME'),
              address: this.consfigservice.get<string>('DEFAULT_EMAIL_FROM'),
            },
            to: recipients,
            subject,
            html
        }

        try{
            const result = await transport.sendMail(options)
        }catch(error){
            console.log('Error: ',error);
        }
        
    }
}