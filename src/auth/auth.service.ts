import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

  async register(dto: AuthDto) {
    const hash = await argon.hash(dto.pass);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          pass: hash,
        },
      });

      return user;
    } catch (error) {
      // if(error instanceof PrismaClientKnownRequestError ){
      console.log(error.code);

      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials Taken');
      }

      // }
      throw error;
    }
  }

  async login(dto2: AuthDto) {
    console.log("dto2",dto2);

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto2.email
      },
    });
    console.log(user);
    
    if(!user) {
        throw new ForbiddenException('You are not registered');
    }

    const PassMatch = await argon.verify(user.pass,dto2.pass);

    if(!PassMatch) {
        throw new ForbiddenException('Credentials Incorrect');
    }

    return this.signToken(user.id,user.email);
  }

  signToken(userId:number,email:string){

    const payload = { userId, email };
    const secret = this.config.get('SECREAT_KEY')
    

    return this.jwt.signAsync(payload,{
      expiresIn:'1h',
      secret: secret,
    })

  }
 
}
