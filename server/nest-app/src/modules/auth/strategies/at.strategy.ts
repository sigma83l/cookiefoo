import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from '../types/Payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = this.Extract(req);
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }
  Extract(request: Request): string | null {
    const token = request?.cookies['access_token'];
    if (!token) return null;

    return token; 
  }
  validate(payload: JwtPayload): JwtPayload {
    return { sub: payload.sub, role: payload.role, name: payload.name };
  }
}
