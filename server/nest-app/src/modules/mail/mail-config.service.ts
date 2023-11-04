import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class MailConfigSerivce implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      transport: {
        host: process.env.MAIL_HOST,
        service: 'Gmail',
        secure: true,
        port: +process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
        debug: true,
        logger: true,
      },
      defaults: {
        from: '"Cookiefoo" <info@mail.cookiefoo.ir>',
      },
      template: {
        dir: join(__dirname, '../../../public/', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    } as MailerOptions;
  }
}
