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
      const category = await this.prisma.category.findMany({
        where:{
          isdeleted :false,
        }
      });

      res.render('user-product', {
        product: product,
        cart,
        user_id,
        category:category
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
          total_amount: +req.query.total
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
        include: {product:true}
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

  async findAll(req, res) {
    try {
      console.log('Category');
      const total = await this.prisma.category.count({
          where:{
          isdeleted :false,
        }
      });
      console.log('total', total);
      const page =  req.query.page||1;
      const perPage =  2;
  
      const skip = page > 0 ? perPage * (page - 1) : 0;
      const category = await this.prisma.category.findMany({
        where:{
          isdeleted :false,
        }
      });
      const lastPage = Math.ceil(total / perPage);
      res.render('category-page', {
        category: category,
        lastPage: lastPage
      });
    } catch (error) {
      throw error;
    }
  }

  async category(req, res) {
    try {
      console.log('Category');
      const category = await this.prisma.category.findFirst({
        where:{
          name: req.query.category
        },
        include:{product: true}
      })
      console.log("category===", category);
      
     
      // const product = await this.prisma.product.findMany({
      //   include:{category:{where:{id: category.id}}},
      //   where:{
      //     isdeleted :false,
       
      //   },
      
      // });
      // console.log("product",product);
      
      return category;
    } catch (error) {
      throw error;
    }
  }
}
