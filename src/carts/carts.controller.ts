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
@UseGuards(AuthGuard('jwt'))

export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('cart')
  @UseGuards(AuthGuard('jwt'))
  UserCart(@Req() req, @Res() res) {
    console.log('req', req.query.id, req.user.userId);
    return this.cartsService.cart(req.query,req.user.userId, res);
  }

  @Put('minus-item')
  async Minus(@Req() req, @Res() res) {
    console.log('minus', req.query.id);
    const data=await this.cartsService.minus(req, res);
    res.send(data)
  }

  @Put('plus-item')
  async Plus(@Req() req, @Res() res) {
    console.log('plus', req.query.id);
   const data=await this.cartsService.plus(req, res);

  
    res.send(data);
  }

  @Put('delete-item')
  async Delete(@Req() req, @Res() res) {
    console.log('delete', req.query.id);
    const data=await this.cartsService.delete(req, res);
    res.send(data)
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
