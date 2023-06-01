import { Controller,Get,Post,Render,Req,Res,UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
// import { AdminRoleGuard } from 'src/auth/admin-role.guard';

@Controller('user-dashboard')
export class UserController {

  constructor(private readonly userService: UserService) {}


    
    @Get('/product')
    @UseGuards(AuthGuard('jwt'))
    async UserData(@Req() req,@Res() res) {

       
        
        // console.log("req",req['user']);
        
        // console.log("user")
        return await this.userService.getallProduct(res)

    }

    @Get('cart')
    UserCart(@Req() req,@Res() res) {

        console.log("req",req.query.id)
        return this.userService.cart(req.query.id,res)

    }

    @Get('/confirm')
    @UseGuards(AuthGuard('jwt'))
   
    async Confirm(@Req() req,@Res() res){

        // console.log(req);
        

       return await this.userService.confirm(req.user.userId,res)
    }

    @Post('/order')
    @UseGuards(AuthGuard('jwt'))
    async Order(@Req() req,@Res() res){
        
        // return await this.userService.order(req.user.userId,res)
    }
}
