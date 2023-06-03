import {
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
// import { AdminRoleGuard } from 'src/auth/admin-role.guard';
import { AdminRoleGuard } from 'src/auth/admin-role.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('user-dashboard')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/product')
  @UseGuards(AdminRoleGuard)
  @UseGuards(AuthGuard('jwt'))
  async UserData(@Req() req, @Res() res) {
    // console.log("req",req['user']);

    // console.log("user")
    return await this.userService.getallProduct(res);
  }

  @Get('cart')
  UserCart(@Req() req, @Res() res) {
    console.log('req', req.query.id);
    return this.userService.cart(req.query.id, res);
  }

  @Get('/confirm')
  @UseGuards(AuthGuard('jwt'))
  async Confirm(@Req() req, @Res() res) {
    // console.log(req);

    return await this.userService.confirm(req.user.userId, res);
  }

  @Post('/order')
  @UseGuards(AuthGuard('jwt'))
  async Order(@Req() req, @Res() res) {
    console.log('order', req.query);

    return await this.userService.order(req, res);
  }

  @Get('/final')
  @Render('confirm')
  Final() {
    console.log('Order confirmation');
  }

  @Get('/order-list')
  @UseGuards(AuthGuard('jwt'))
  async OrderList(@Req() req, @Res() res) {
    console.log(req.user);

    return await this.userService.orderList(req, res);
  }
}
