import {
  Controller,
  Body,
  Req,
  HttpStatus,
  HttpCode,
  Get,
  Post,
  Res,
  UseGuards,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { RtGuard } from './guards/rt.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { CookieOptions } from 'express';
import { Response, Request } from 'express';
import { UserInit } from './types';
import {
  GetCurrentUser,
  Public,
} from '../../common/decorators';
import {
  ForgetPasswordDto,
  ResetPasswordtDto,
} from './dtos/forget-password.dto';
import { SignUpDto, VerificationDto } from './dtos/signup.dto';
import { ValidateOtpDto } from './dtos/validate-otp.dto';
import { GetCurrentUserId } from '../../common/decorators/'
import { TokenInterceptor } from '../../common/interceptors/token.interceptor';

@Controller('auth')
export class AuthController {
  private readonly atExp = 15 * 60 * 1000;
  private readonly rtExp = 7 * 24 * 60 * 60 * 1000;
  constructor(private readonly authService: AuthService) {}

  private setCookie = (
    res: Response,
    name: string,
    value: string,
    maxAge: number,
  ) => {
    const cookieOptions: CookieOptions = {
      maxAge,
      httpOnly: true,
      domain: process.env.NODE_ENV === 'production' ? '.cookiefoo.ir' : '',
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : false,
    };
    res.cookie(name, value, cookieOptions);
  };

  @Public()
  @Post('signup')
  async signup(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
    ) {
    const tokens = await this.authService.signUp(signUpDto);
    this.setCookie(res, 'access_token', tokens.accessToken, this.atExp);
    this.setCookie(res, 'refresh_token', tokens.refreshToken, this.rtExp);
    return { success: true };
  }
  
  @Get('')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor)
  async init(@Req() req): Promise<UserInit> {
    const user: UserInit = req.user;
    return {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Req() req: Request, @Res() res: Response) {
    const tokens = await this.authService.login(loginDto);
    
    this.setCookie(res, 'access_token', tokens.accessToken, this.atExp);
    this.setCookie(res, 'refresh_token', tokens.refreshToken, this.rtExp);
    
    return res.send({ success: true });
  }
  
  @Get('logout')
  @UseInterceptors(TokenInterceptor)
  async logout(@Res() res: Response, @Req() req, @GetCurrentUserId() userId: number) {
    console.log(req.user);
    const isLoggedOut = await this.authService.logout(userId);

    const clearCookieOptions: CookieOptions = {
      httpOnly: true,
      domain: process.env.NODE_ENV === 'production' ? '.cookiefoo.ir' : '',
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : false,
    };
    res.clearCookie('access_token', clearCookieOptions);
    res.clearCookie('refresh_token', clearCookieOptions);

    return res.send(isLoggedOut);
  }

  @Public()
  @Post('send-code')
  @HttpCode(HttpStatus.CREATED)
  async sendCode(@Body() verificationDto: VerificationDto) {
    return await this.authService.sendCode(verificationDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshtoken: string,
    @Res() res: Response,
  ) {
    const tokens = await this.authService.refreshTokens(userId, refreshtoken);
    this.setCookie(res, 'access_token', tokens.accessToken, this.atExp);
    this.setCookie(res, 'refresh_token', tokens.refreshToken, this.rtExp);

    return res.send({ sucess: true });
  }

  @Public()
  @Post('forget-password')
  async forgetPassword(@Body() body: ForgetPasswordDto) {
    return await this.authService.generateUniqueLink(body.email);
  }

  @Public()
  @Get('reset-password/:id/:token')
  async validateResetPasswordToken(
    @Param('id', ParseIntPipe) id: number,
    @Param('token') token: string,
  ) {
    return await this.authService.validateResetPasswordToken(id, token);
  }

  @Public()
  @Post('reset-password/:id/:token')
  async RestPassword(
    @Param('id', ParseIntPipe) id: number,
    @Param('token') token: string,
    @Body() body: ResetPasswordtDto,
  ) {
    return await this.authService.updatePassword(body.password, id, token);
  }
}
