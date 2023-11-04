import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserRepository } from '../users/users.repository';
import { Hash } from '../../common/utils/hash.util';
// import { User } from '@prisma/client';
import { JwtPayload, Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, VerificationDto } from './dtos/signup.dto';
import { AuthRepository } from './auth.repository';
import { OtpService } from './otp.service';
import { MailService } from '../mail/mail.service';
import { TokenExpiredError } from 'jsonwebtoken';
import { Verification } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
    private readonly otp: OtpService,
    private readonly mailService: MailService,
  ) {}

  async login(loginUser: LoginDto) {
    const user = await this.userRepository.find(loginUser.email);

    if (!user) {
      throw new BadRequestException('Email does not exist');
    }
    const isPasswordValid = await Hash.compare(
      loginUser.password,
      user.hashedPassword,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Credentials invalid');
    }
    const userData = {
      sub: user.id,
      role: user.role,
      name: user.name,
    } 
    
    return await this.getTokens(userData);
  }

  async getTokens(payload: JwtPayload): Promise<Tokens> {
    const secretKey = process.env.SECRET_KEY;
    const accessTokenOptions = { expiresIn: '15m' };
    const refreshTokenOptions = { expiresIn: '7d' };

    const accessToken = await this.signToken(
      payload,
      secretKey,
      accessTokenOptions,
    );
    const refreshToken = await this.signToken(
      payload,
      secretKey,
      refreshTokenOptions,
    );
    await this.updateRefreshTokenHash(payload.sub, refreshToken);

    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  async signToken(
    payload: JwtPayload,
    secretKey: string,
    options: any,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      ...options,
    });
  }

  async logout(userId: number): Promise<boolean> {
    return await this.userRepository.logout(userId);
  }

  async updateRefreshTokenHash(
    sub: number,
    refresh_token: string,
  ): Promise<void> {
    const hashedRefreshToken: string = await Hash.hash(refresh_token);

    await this.userRepository.updateRefreshTokenHash(sub, hashedRefreshToken);
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<Tokens> {
    const user = await this.userRepository.findById(userId);

    if (!user || !user.hashedRT) throw new ForbiddenException('Access Denied');

    const rtMatches = await Hash.compare(refreshToken, user.hashedRT);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    return await this.getTokens({
      sub: user.id,
      role: user.role,
      name: user.name,
    });
  }

  async sendCode(verificationDto: VerificationDto) {
    await this.validateEmailForSignUp(verificationDto.email);
    const varification = await this.authRepository.findVerification(
      verificationDto.email,
    );

    if (
      varification &&
      this.otp.requestesALot(varification.try, varification.lastResendTime)
    ) {
      throw new BadRequestException('you have requested a lot');
    }

    const otp = this.otp.generate().toString();
    const hashedOtp = await Hash.hash(otp);

    await this.authRepository.upsertVarification(verificationDto, hashedOtp);
    await this.mailService.sendOtp(+otp, verificationDto.email);

    return { success: true };
  }

  async updatePassword(password: string, id: number, token: string) {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new BadRequestException('user not found');
    }

    const secret = process.env.SECRET + user.hashedPassword;

    try {
      await this.jwtService.verify(token, { secret: secret });
      const hashedPassword = await Hash.hash(password);

      await this.userRepository.updatePassword(id, hashedPassword);

      return { success: true };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      } else {
        throw new BadRequestException(
          'Invalid token or password update failed',
        );
      }
    }
  }

  async validateResetPasswordToken(id: number, token: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new BadRequestException('user not found');
    }
    const secret = process.env.SECRET_KEY + user.hashedPassword;

    try {
      await this.jwtService.verify(token, { secret: secret });
      return { sucess: true };
    } catch (error) {
      return { message: 'some thing is manipulated Or link is expired...' };
    }
  }

  async validateEmailForSignUp(email: string): Promise<boolean | undefined> {
    const user = await this.userRepository.find(email);

    if (user) {
      throw new HttpException('email already exists', 400);
    }
    return true;
  }

  async generateUniqueLink(email: string) {
    const user = await this.userRepository.find(email);

    if (!user) {
      throw new BadRequestException('user not found');
    }

    const secret = process.env.SECRET_KEY + user.hashedPassword;
    const jwtPayload: JwtPayload = {
      sub: user.id,
      role: user.role,
      name: user.name,
    };
    const token = await this.jwtService.sign(jwtPayload, {
      secret: secret,
      expiresIn: '15m',
    });
    const link = `https://cookiefoo.ir/new-password/${user.id}/${token}`;
    await this.mailService.forgetPassword(link, email);

    return { sucess: true };
  }
  
  async validateVerifications(
    email: string,
    otp: number,
  ): Promise<boolean | undefined> {
    const verification = await this.authRepository.findVerification(email);
    if (!verification) {
      throw new BadRequestException('not found');
    }
    await this.otp.validate(otp, verification);

    return true;
  }

  async signUp(signUPDto: SignUpDto): Promise<Tokens> {
    const isEmailVerified = await this.validateVerifications(signUPDto.email, signUPDto.otp);
    if (!isEmailVerified) {
       throw new UnauthorizedException('email is not verified')
    } 
    const res = await this.validateEmailForSignUp(signUPDto.email);
    const hashedPassword = await Hash.hash(signUPDto.password);

    const user = await this.userRepository.create({
      email: signUPDto.email,
      name: signUPDto.name,
      phone: signUPDto.phone,
      hashedPassword: hashedPassword,
    });

    return await this.getTokens({
      sub: user.id,
      role: user.role,
      name: user.name,
    });
  }
}
