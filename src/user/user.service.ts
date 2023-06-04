import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getallProduct(res) {
    try {
      const cart = 'undefined';
      const user_id = 2;
      // console.log('Category');
      const product = await this.prisma.product.findMany({
        where: {
          isdeleted: false,
        },
      });
      //   console.log(product);

      // return product;

      res.render('user-product', {
        product: product,
        cart,
        user_id,
      });
    } catch (error) {
      throw error;
    }
  }

  async cart(id, res) {
    try {
      const product = await this.prisma.product.findMany({
        where: {
          isdeleted: false,
        },
      });

      const cart = await this.prisma.product.findFirst({
        where: {
          id: +id,
          isdeleted: false,
        },
      });

      console.log(cart);
      res.render('user-product', {
        cart: cart,
        product: product,
      });
    } catch (error) {
      throw error;
    }
  }

  async confirm(id, res) {
    const show_cart = await this.prisma.cart.findMany({
      where: {
        user_id: +id,
        isdeleted: false,
        number_of_items: { gt: 0 },
      },
      include: { product: true },
    });
    console.log(show_cart);
    var cart = [];
    for (var i = 0; i < show_cart.length; i++) {
      cart.push(show_cart[i].id);
    }

    console.log(cart);

    res.render('order', {
      show_cart: show_cart,
      cart: cart,
    });
  }

  async order(req, res) {
    try {
      var fist = req.query.cart;
      var cart_id = fist.toString();
      console.log('cart_id', fist, cart_id);
      const cart = await this.prisma.order.create({
        data: {
          // cart_id: cart_id,
          user: { connect: { id: +req.user.userId } },
        },
      });
      console.log(cart);

      const show_cart = await this.prisma.cart.findMany({
        where: {
          user_id: +req.user.userId,
          isdeleted: false,
          number_of_items: { gt: 0 },
        },
        include: {
          product: {
            select: { id: true },
          },
        },
      });
     
      console.log("id_arr", );
      
      for (var i = 0; i < show_cart.length; i++) {
        console.log('id_arr====', show_cart[i].product.id);

        const order = await this.prisma.orderProduct.create({
          data: {
            order: { connect: { id: +cart.id } },
            product: { connect: { id: +show_cart[i].product.id } },
            number_of_items:+show_cart[i].number_of_items
          },
        });
      }
      // return cart;
    } catch (error) {
      throw error;
    }
  }

  async orderList(req, res) {
    try {
      const orders = await this.prisma.order.findMany({
        where: { user_id: +req.user.userId },
      });
      var product_arr=[];
      for(var i = 0; i < orders.length; i++){
      const product = await this.prisma.orderProduct.findMany({
        where: { order_id: +orders[i].id },
      });
      console.log("product",product);
      
      product_arr.push(product);
    }
      console.log("product_arr====",product_arr);
      res.render('order-list', {
        orders: orders,
        product:product_arr,
      });
    } catch (error) {
      throw error;
    }
  }
}
