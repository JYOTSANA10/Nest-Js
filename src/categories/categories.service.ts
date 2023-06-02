import axios, { isCancel, AxiosError } from 'axios';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto, res) {
    try {
      console.log('try');

      const category = await this.prisma.category.create({
        data: createCategoryDto,
      });
      res.redirect('/categories/category');
    } catch (error) {
      throw error;
    }
  }

  async findAll(req, res) {
    try {
      console.log('Category');
      const category = await this.prisma.category.findMany({
        where:{
          isdeleted :false,
        }
      });
      res.render('categories', {
        category: category,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, res) {
    console.log(id);
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id: id,
        },
      });

      res.render('add-category', {
        category: category,
      });
    } catch (error) {
      throw error;
    }
    // return `This action returns a #${id} category`;
  }

  async update(updateCategoryDto: UpdateCategoryDto,res) {

    console.log(updateCategoryDto);
    
    try {
      console.log('try');
      const category = await this.prisma.category.update({
        data: {
          name:updateCategoryDto.name
        },
        where: {
          id: +updateCategoryDto.id,
        },
      });

      res.redirect('/categories/category');
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, res) {
    console.log(id);

    try {
      // console.log('try');
      const category = await this.prisma.category.update({
        data: {
          isdeleted: true,
        },
        where: {
          id: id,
        },
      });
      return res.redirect('/categories/category');

    } catch (error) {
      throw error;
    }
  }

  async search(data, res) {
    try {
      const search = await this.prisma.category.findMany({
        where: {
          OR: [
            {
              name: {
                startsWith: data,
              },
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
}
