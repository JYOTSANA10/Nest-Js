import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'prisma/prisma.service';
import { userInfo } from 'os';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async cart(id,user_id, res) {
    try {
      const find = await this.prisma.cart.findMany({
        where: {
          product_id: +id.id,
          user_id:+user_id,
          isdeleted:false
        },
      });
      console.log(find.length);
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
            user: { connect: { id: +user_id } },
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
        isdeleted: false,
        number_of_items: { gt:0 }
      },
      include: { product: true },
    });
    console.log(show_cart);
   

   

    res.render('cart.ejs', { show_cart: show_cart });
  }

  async minus(req, res) {
    try {
      await this.prisma.cart.update({
        data: {
          number_of_items: { decrement: 1 },
        },
        where: {
          // product: { connect: { id: +id.id } },
          id: +req.query.id,
        },
      });

      const cart = await this.prisma.cart.findMany({
        where: {
          user_id: +req.user.userId,
          isdeleted: false,
          number_of_items: { gt:0 }
        },
        include: { product: true },
      });

      return cart;
      
    } catch (error) {
      throw error;
    }
  }
  async plus(req, res) {
    try {
      await this.prisma.cart.update({
        data: {
          number_of_items: { increment: 1 },
        },
        where: {
          // product: { connect: { id: +id.id } },
          id: +req.query.id,
        },
      });

      const cart = await this.prisma.cart.findMany({
        where: {
          user_id: +req.user.userId,
          isdeleted: false,
          number_of_items: { gt:0 }
        },
        include: { product: true },
      });

      return cart;
     
    } catch (error) {
      throw error;
    }
  }

  async delete(req, res) {
    try {
      await this.prisma.cart.update({
        data: {
          isdeleted: true,
        },
        where: {
          // product: { connect: { id: +id.id } },
          id: +req.query.id,
        },
      });

      const cart = await this.prisma.cart.findMany({
        where: {
          user_id: +req.user.userId,
          isdeleted: false,
          number_of_items: { gt:0 }
        },
        include: { product: true },
      });

      return cart;
      // res.redirect('/carts/cart')
      
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
