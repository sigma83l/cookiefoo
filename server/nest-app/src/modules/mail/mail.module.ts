import { Module } from '@nestjs/common';
import { MailConfigSerivce } from './mail-config.service';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailConfigSerivce,
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
