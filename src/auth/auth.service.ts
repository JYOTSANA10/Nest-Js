import { ForbiddenException, Injectable } from '@nestjs/common';
import express, { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthContoller } from './auth.controller';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(email: string, pass: string, req: Request, res: Response) {
    const hash = await argon.hash(pass);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: email,
          pass: hash,
          role_id:2,
        },
      });

      res.redirect('/auth/login');

      // Redirect('/auth/login')
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

  async login(dto2: AuthDto,res) {
    console.log('dto2', dto2);

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto2.email,
      },
    });
    console.log(user);

    if (!user) {
      throw new ForbiddenException('You are not registered');
    }

    const PassMatch = await argon.verify(user.pass, dto2.pass);

    if (!PassMatch) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    const token= await this.signToken(user.id, user.email,user.role_id);

    // const token = await this.signToken(
    //   userId: user.id,
    //   email: user.email,
      
    // );
    console.log(token);
    

    if (!token) {
      throw new ForbiddenException();
    }
    res.cookie('token', token);

    if(user.role_id==2){
      console.log("USer");
      
      res.redirect('/user-dashboard/product')
    }else if(user.role_id==1){
      console.log("Admin");

      res.redirect('/admin');
    }
   

    
  }

  signToken(userId: number, email: string,role:number) {
    const payload = { id:userId, email:email,role:role };
    const secret = this.config.get('SECREAT_KEY');

    return this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: secret,
    });
  }

  async signOut(req,res){
    try {
      const clear=await res.clearCookie('token');
      // console.log("clear",clear);
      
      res.redirect('/auth/login')

    }catch(error) {
      throw error;
    }
  }
}
