import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../types/Payload.type';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request?.cookies['refresh_token'];
          if (!token) return null;

          return token;
        },
      ]),
      secretOrKey: process.env.SECRET_KEY,
      passReqToCallback: true,
    });
  }

  Extract(request: Request): string | null {
    const token = request?.cookies['refresh_token'];

    if (!token) throw new ForbiddenException('Refresh token malformed');

    return token;
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshToken {
    const refreshToken = this.Extract(req);

    return {
      sub: payload.sub,
      name: payload.name,
      role: payload.role,
      refreshToken,
    };
  }
}
