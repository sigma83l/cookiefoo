import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/at.strategy';
import { RefreshTokenStrategy } from './strategies/rt.strategy';
import { UserRepository } from '../users/users.repository';
import { MailService } from '../mail/mail.service';
import { OtpService } from './otp.service';
import { AuthRepository } from './auth.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.SECRET_KEY }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    AuthRepository,
    JwtStrategy, 
    RefreshTokenStrategy, 
    UserRepository, 
    MailService,
    OtpService,
    JwtService,
    PrismaService,
  ],
  exports: [UserRepository, PrismaService],
})
export class AuthModule {}
