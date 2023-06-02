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

      await this.prisma.product.create({
        data: {
          name: createProductDto.name,
          price: Number(createProductDto.price),
          category: createProductDto.category,
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
        where: {
          isdeleted: false,
        },
      });

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
      });

      res.render('add-product', {
        product: product,
        category: category,
      });
    } catch (error) {
      throw error;
    }
  }

  async update(updateProductDto: UpdateProductDto, res) {
    console.log('update data in product=', updateProductDto);

    try {
      console.log('try');
      const product = await this.prisma.product.update({
        data: {
          name: updateProductDto.name,
          category: updateProductDto.category,
          price: Number(updateProductDto.price),
          description: updateProductDto.description,
        },
        where: {
          id: Number(updateProductDto.id),
        },
      });

      console.log('update product', product);

      res.redirect('/admin/products/product');
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, res) {
    console.log(id);

    try {
      // console.log('try');
      const product = await this.prisma.product.update({
        data: {
          isdeleted: true,
        },
        where: {
          id: id,
        },
      });
      return res.redirect('/admin/products/product');
    } catch (error) {
      throw error;
    }
  }

  async search(data, res) {
    try {
      const search = await this.prisma.product.findMany({
        where: {
          OR: [
            {
              name: {
                startsWith: data,
              },
            },
            {
              category: {
                startsWith: data,
              },
            },
            {
              description:{
                startsWith:data
              }
            }
          ],
        },
       
      });
      console.log(search);
      return search;
    } catch (error) {
      throw error;
    }
  }
}
