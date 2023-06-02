import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getallProduct(res) {
    try {
        const cart="undefined";
        const user_id=2
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
        user_id
        
      });
    } catch (error) {
      throw error;
    }
  }

  async cart(id,res) {

    try{

        const product = await this.prisma.product.findMany({
            where: {
              isdeleted: false,
            },
          });

        const cart = await this.prisma.product.findFirst({
            where:{
                id:+id,
                isdeleted: false
            }
        })

        console.log(cart);
        res.render('user-product', {
            cart: cart,
            product: product
          });
        
    }catch (error) {
        throw error;
      }
    }

    async confirm(id,res){

      const show_cart = await this.prisma.cart.findMany({
        where: {
          user_id: +id,
          isdeleted: false,
          number_of_items: { gt:0 }
        },
        include: { product: true },
      });
      console.log(show_cart);
      var cart=[]
      for(var i=0;i<show_cart.length;i++){
        
        cart.push(show_cart[i].id)
      }
      
      console.log(cart);
      

      res.render('order',{
        show_cart:show_cart,
        cart:cart
      })
    }


    async order(req,res) {

      try{
        var fist=req.query.cart
        var cart_id=fist.toString()
        console.log("cart_id",fist,cart_id)
        const cart = await this.prisma.order.create({
          data: {
            cart_id: cart_id,
            user: { connect: { id: +req.user.userId } },
          },
        });

        return cart;

      }catch (error) {
        throw error;
      }

    }

    async orderList(req,res){

      try{

        const orders=await this.prisma.order.findMany({
          where: { user_id: +req.user.userId},
        })

        console.log(orders);
         res.render('order-list',{
          orders:orders
         })

      }catch (error) {
        throw error;
      }
    }
  
}
