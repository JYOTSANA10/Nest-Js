import { Controller, Get, Post, Body, Patch, Param, Delete ,Res,Req, Render} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}


  @Post('cart')
  UserCart(@Req() req,@Res() res) {

      console.log("req",req.query.id,req.query.user_id)
      return this.cartsService.cart(req.query,res)

  }

  @Get('minus-item')
  Minus(@Req() req,@Res() res ){
    console.log("minus",req.query.id)
    return this.cartsService.minus(req.query.id,res)

  }

  @Get('plus-item')
  Plus(@Req() req,@Res() res ){
    console.log("plus",req.query.id)
    return this.cartsService.plus(req.query.id,res)

  }

  @Get('delete-item')
  Delete(@Req() req,@Res() res ){
    console.log("delete",req.query.id)
    return this.cartsService.delete(req.query.id,res)

  }

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  

  @Get('user-cart')
  
  findAll(@Req() req,@Res() res) {
    console.log("req",req.query.user_id)
    
    return this.cartsService.findAll(req.query.user_id,res);
    
    
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
