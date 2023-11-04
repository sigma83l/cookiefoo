import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}
  async sendOtp(otp: number, email: string) {
    return await this.mailService.sendMail({
      to: email,
      subject: 'your confirmation code',
      template: './otp',
      context: {
        otp,
      },
    });
  }

  async forgetPassword(link: string, email: string) {
    return await this.mailService.sendMail({
      to: email,
      subject: 'password recovery link',
      template: './forgetPassword',
      context: {
        link,
      },
    });
  }
}
