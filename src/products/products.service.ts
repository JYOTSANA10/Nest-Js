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

  async getcategory(res) {
    const category = await this.prisma.category.findMany({
      where: {
        isdeleted: false,
      },
    });
    // console.log(category);

    res.render('add-product', {
      product: 'undefined',
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
    console.log(updateProductDto);

    try {
      console.log('try');
      const product = await this.prisma.product.update({
        data: updateProductDto,
        where: {
          id: +updateProductDto.id,
        },
      });

      console.log(product);

      // res.redirect('/admin/products/product');
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
}
