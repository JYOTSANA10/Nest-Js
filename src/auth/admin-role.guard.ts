// import { CanActivate, ExecutionContext, Injectable , UnauthorizedException } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { JwtService } from "@nestjs/jwt";


// @Injectable()
// export class AdminRoleGuard implements CanActivate{

//     constructor(private jwtService: JwtService,private config: ConfigService){}

//     async canActivate(context:ExecutionContext){

//         const request=context.switchToHttp().getRequest();
//         const token = this.extractTokenFromHeader(request);
        

//         if (!token) {
//             throw new UnauthorizedException();
//           }
//           try {
//             const payload = await this.jwtService.verifyAsync(
//               token,
//               {
//                 secret: this.config.get('SECREAT_KEY'),
//               }
//             );
           
//             request['user'] = payload;
//           } catch {
//             throw new UnauthorizedException();
//           }
//           return true;
//         }

        
    

