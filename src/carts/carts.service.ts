import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async cart(id, res) {
    try {
      const find = await this.prisma.cart.findMany({
        where: {
          product_id: +id.id,
        },
      });
      // console.log(find[0].id);
      if (find.length) {
        console.log('if');
        // const items=find[0].number_of_items+1;

        const cart = await this.prisma.cart.update({
          data: {
            number_of_items: { increment: 1 },
          },
          where: {
            // product: { connect: { id: +id.id } },
            id: find[0].id,
          },
        });
      } else {
        const cart = await this.prisma.cart.create({
          data: {
            product: { connect: { id: +id.id } },
            user: { connect: { id: +id.user_id } },
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }
  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  async findAll(user_id, res) {
    const show_cart = await this.prisma.cart.findMany({
      where: {
        user_id: +user_id,
        isdeleted:false,
      },
      include: { product: true },
    });
    console.log(show_cart);
    for(let i = 0; i < show_cart.length; i++) {
      
     
       var total = total+show_cart[i].product.price;
    }
    
    console.log(total);
    
    res.render('cart.ejs', { show_cart: show_cart });
  }

  async minus(id, res) {
    try {
      const cart = await this.prisma.cart.update({
        data: {
          number_of_items: { decrement: 1 },
        },
        where: {
          // product: { connect: { id: +id.id } },
          id: +id,
        },
      });

      return cart;
      // res.redirect('/carts/cart')
      // window.location.reload();
      
    } catch (error) {
      throw error;
    }
  }
  async plus(id, res) {
    try {
      const cart = await this.prisma.cart.update({
        data: {
          number_of_items: { increment: 1 },
        },
        where: {
          // product: { connect: { id: +id.id } },
          id: +id,
        },
      });

      return cart;
      // res.redirect('/carts/cart')
      // window.location.reload();
      
    } catch (error) {
      throw error;
    }
  }

  async delete(id, res) {
    try {
      const cart = await this.prisma.cart.update({
        data: {
          isdeleted:true,
        },
        where: {
          // product: { connect: { id: +id.id } },
          id: +id,
        },
      });

      return cart;
      // res.redirect('/carts/cart')
      // window.location.reload();
      
    } catch (error) {
      throw error;
    }
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
