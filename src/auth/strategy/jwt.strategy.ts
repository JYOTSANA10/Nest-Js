import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private config: ConfigService, private jwtService: JwtService) {
    super({
      //  jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('SECREAT_KEY'),

      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log('jwt', request);

          let data = request.cookies.token;
          console.log('COKKIE', data);

          if (!data) {
            throw new UnauthorizedException();
          }
          const payload = this.jwtService.verifyAsync(data, {
            secret: this.config.get('SECREAT_KEY'),
          });
          console.log(payload);
          
          return data;
        },
      ]),
    });
  }

  validate(payload: any) {
    return {
      userId: payload.id,
      username: payload.email,
      role: payload.role,
    };
  }
}
