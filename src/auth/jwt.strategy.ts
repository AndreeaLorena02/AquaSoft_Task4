/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'my_token', // Schimbă cu o cheie secretă sigură
    });
  }

  async validate(payload: any) {
    return {
            userId: payload.sub,
            email: payload.email,
            permissionId: payload.permissionId, // Include permissionId din token
     };
  }
}
