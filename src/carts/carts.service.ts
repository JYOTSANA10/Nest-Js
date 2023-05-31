import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

 
  async cart(id :CreateCartDto , res) {
    try {
      
      // const cart = await this.prisma.cart.create({
      //   data: {
      //     product: id.id,
      //     user: id.user_id,
      //   },
      // });

      // console.log(cart);
      // res.render('cart', {
      //     cart: cart,
      // });
    } catch (error) {
      throw error;
    }
  }
  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all carts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
