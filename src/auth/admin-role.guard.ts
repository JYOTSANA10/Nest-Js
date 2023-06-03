import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.token;
    console.log('token', token);

    if (!token) {
      throw new UnauthorizedException();
    } else {
      // const payload = this.jwtService.verifyAsync(token, {
      //   // secret: this.config.get('SECREAT_KEY'),
      // });
      // console.log(payload);
      return true;
    }
    // //   try {
    // //     const payload = await this.jwtService.verifyAsync(
    // //       token,
    // //       {
    // //         secret: this.config.get('SECREAT_KEY'),
    // //       }
    // //     );

    // //     request['user'] = payload;
    //   } catch {
    //     throw new UnauthorizedException();
    //   }
    return false;
  }
}
