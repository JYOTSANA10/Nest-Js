import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthContoller {
  constructor(private authservice: AuthService) {}

  
  // @Get('index')
  // @Render('register.ejs')
  // GetRegister(){
  //   // return 'Register Get';
  // }

  @Post('register')
  register(@Body() dto: AuthDto) {
    console.log(dto);

    return this.authservice.register(dto);
  }

  @Post('login')
  login(@Body() dto2: AuthDto) {
    // console.log(dto2);

    return this.authservice.login(dto2);
  }
}
