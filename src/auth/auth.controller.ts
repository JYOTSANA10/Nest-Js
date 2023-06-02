import { Body, Controller, Get, Post, Redirect, Render,Req,Res ,UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
// import { AdminRoleGuard } from 'src/auth/admin-role.guard';



@Controller('auth')
export class AuthContoller {
  constructor(private authservice: AuthService) {}

  
  @Get('register')
  @Render('register.ejs')
  GetRegister(){
    console.log("get");
    
  }

  @Post('register')
  register(@Req() req, @Res() res) {
    console.log(req.body.email);

    return this.authservice.register(req.body.email,req.body.pass,req, res);
   
  }
 

  @Get('login')
  @Render('login.ejs')
  GetLogin(){
    console.log("get-login");
    
  }

  // @UseGuards(AdminRoleGuard)
  @Post('login')
  login(@Body() dto2: AuthDto,@Res() res) {
    // console.log(dto2);

    return this.authservice.login(dto2,res);
  }

  @Get('sign-out')
  SignOut(@Req() req,@Res() res) {
    console.log("sign-out");
    
    return this.authservice.signOut(req,res);

  }

}
