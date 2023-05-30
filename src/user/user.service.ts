import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getallProduct(res) {
    try {
        const cart="undefined";
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
        cart
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
  
}
