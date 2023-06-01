import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  Render,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('cart')
  @UseGuards(AuthGuard('jwt'))
  UserCart(@Req() req, @Res() res) {
    console.log('req', req.query.id, req.user.userId);
    return this.cartsService.cart(req.query,req.user.userId, res);
  }

  @Get('minus-item')
  Minus(@Req() req, @Res() res) {
    console.log('minus', req.query.id);
    return this.cartsService.minus(req.query.id, res);
  }

  @Put('plus-item')
  async Plus(@Req() req, @Res() res) {
    console.log('plus', req.query.id);
   const item=await this.cartsService.plus(req.query.id, res);

  
    return item;
  }

  @Get('delete-item')
  Delete(@Req() req, @Res() res) {
    console.log('delete', req.query.id);
    return this.cartsService.delete(req.query.id, res);
  }

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get('user-cart')
  @UseGuards(AuthGuard('jwt'))

  async findAll(@Req() req, @Res() res) {
    // console.log('req', req.query.user_id);
    console.log('token', req.user.userId);

    return this.cartsService.findAll(req.user.userId, res);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartsService.update(+id, updateCartDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cartsService.remove(+id);
  // }
}
