import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto, res, filepath) {
    try {
      console.log(createProductDto.category);
      var id_arr = [];
      for (var i = 0; i < createProductDto.category.length; i++) {
        const id = await this.prisma.category.findFirst({
          where: {
            name: createProductDto.category[i],
          },
        });
        console.log('id', id.id);
        id_arr.push(id.id);
      }
      console.log(id_arr);
      let categoryObject = id_arr.toString().split(',');
      console.log(categoryObject);

      let result = Object.keys(categoryObject).map((key) => ({
        id: Number(categoryObject[key]),
      }));

      console.log(result);

      await this.prisma.product.create({
        data: {
          name: createProductDto.name,
          price: Number(createProductDto.price),
          category: {
            connect: result,
          },

          image: filepath,

          description: createProductDto.description,
        },
      });

      res.redirect('/admin/products/product');
    } catch (error) {
      throw error;
    }
  }

  async getproduct(res) {
    const product = 'undefined';
    const category = await this.prisma.category.findMany({
      where: {
        isdeleted: false,
      },
    });
    // console.log(category);

    res.render('add-product', {
      product,
      category: category,
    });
  }

  async findAll(req, res) {
    try {
      // console.log('Category');
      const product = await this.prisma.product.findMany({
        include: { category: true },
        where: {
          isdeleted: false,
        },
      });
      // console.log(product);

      res.render('products', {
        product: product,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, res) {
    console.log(id);
    try {
      const category = await this.prisma.category.findMany({
        where: {
          isdeleted: false,
        },
      });

      const product = await this.prisma.product.findUnique({
        where: {
          id: Number(id),
        },
        include: { category: true },
      });

      res.render('product-show', {
        product: product,
        category: category,
      });
    } catch (error) {
      throw error;
    }
  }

  async update(updateProductDto: UpdateProductDto, res) {
    console.log('update data in product=', typeof updateProductDto.category);

    try {
      // if (typeof updateProductDto.category == 'string') {
      //   const id = await this.prisma.category.findFirst({
      //     where: {
      //       name: updateProductDto.category,
      //     },
      //   });

      //   const product = await this.prisma.product.update({
      //     data: {
      //       name: updateProductDto.name,

      //       price: Number(updateProductDto.price),
      //       description: updateProductDto.description,
      //       category: {
      //         connect: id,
      //       },
      //     },
      //     where: {
      //       id: Number(updateProductDto.id),
      //     },
      //   });
      // } else {
      var id_arr = [];
      for (var i = 0; i < updateProductDto.category.length; i++) {
        const id = await this.prisma.category.findFirst({
          where: {
            name: updateProductDto.category[i],
          },
        });
        console.log('id', id);
        id_arr.push(id.id);
      }
      console.log(id_arr);
      let categoryObject = id_arr.toString().split(',');
      console.log(categoryObject);

      let result = Object.keys(categoryObject).map((key) => ({
        id: Number(categoryObject[key]),
      }));

      console.log(result);

      const product = await this.prisma.product.update({
        where: {
          id: Number(updateProductDto.id),
        },
        data: {
          name: updateProductDto.name,
          price: Number(updateProductDto.price),
          description: updateProductDto.description,
          category: { connect: result },
        },
      });
      console.log('product', product);

      res.redirect('/admin/products/product');
    } catch (error) {
      throw error;
    }
  }

  async remove(req, res) {
    try {
      // console.log('try');
      await this.prisma.product.update({
        data: {
          isdeleted: true,
        },
        where: {
          id: +req.query.id,
        },
      });

      const product = await this.prisma.product.findMany({
        where: {
          isdeleted: false,
        },
      });

      return product;
    } catch (error) {
      throw error;
    }
  }

  async search(data, res) {
    try {
      const search = await this.prisma.product.findMany({
        include:{category:true},
        where: {

          AND: [
            {
              isdeleted: false,
            },
            {
              OR: [
                {
                  name: {
                    startsWith: data,
                  },
                },
               
                {
                  description: {
                    startsWith: data,
                  },
                },
              ],
            },
          ],
        },
       
      });
      console.log(search);
      return search;
    } catch (error) {
      throw error;
    }
  }

  async sort(req, res) {
    try{
      if(req.data=='name'){
      const sort = await this.prisma.product.findMany({
        orderBy:{
          name: req.type,
        },
        include:{category:true},
        where:{
          isdeleted: false,
        }
      })
      return sort;
    }else if(req.data=='price'){
      const sort = await this.prisma.product.findMany({
        orderBy:{
          price: req.type,
        },
        include:{category:true},
        where:{
          isdeleted: false,
        }
      })
      return sort;
    }
     
    }catch(error) {
      throw error;
    }
  }
}
