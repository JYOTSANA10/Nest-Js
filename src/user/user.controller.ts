import { Controller,Get,Req,Res,UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user-dashboard')
export class UserController {

  constructor(private readonly userService: UserService) {}


    // @UseGuards(AuthGuard('jwt'))
    @Get('/product')
    UserData(@Req() req,@Res() res) {

        // console.log("req",req['user']);
        
        // console.log("user")
        return this.userService.getallProduct(res)

    }

    @Get('cart')
    UserCart(@Req() req,@Res() res) {

        console.log("req",req.query.id)
        return this.userService.cart(req.query.id,res)

    }
}
