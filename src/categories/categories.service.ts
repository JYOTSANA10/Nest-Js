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
        skip: skip,
        take: perPage,
        where:{
          isdeleted :false,
        }
      });
      const lastPage = Math.ceil(total / perPage);
      res.render('categories', {
        category: category,
        lastPage: lastPage
      });
    } catch (error) {
      throw error;
    }
  }

  async pagination(req, res) {
    try {
      console.log('Category');
      
      const page =  req.query.page||1;
      const perPage =  2;
  
      const skip = page > 0 ? perPage * (page - 1) : 0;
      const category = await this.prisma.category.findMany({
        skip: skip,
        take: perPage,
        where:{
          isdeleted :false,
        }
      });
    
      return category;
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

  async remove(req, res) {

    try {
      // console.log('try');
       await this.prisma.category.update({
        data: {
          isdeleted: true,
        },
        where: {
          id: +req.query.id,
        },
      });

      const category = await this.prisma.category.findMany({
        where:{
          isdeleted :false,
        }
      });

      return category;

    } catch (error) {
      throw error;
    }
  }

  async search(req, res) {
    try {
      const page =  req.page||1;
      const perPage =  2;
  
      const skip = page > 0 ? perPage * (page - 1) : 0;
      const search = await this.prisma.category.findMany({
        skip: skip,
        take: perPage,
        where: {
          AND:[
            {
              isdeleted :false,
            },{

              OR: [
                {
                  name: {
                    startsWith: req.data,
                  },
                },
                
              ],
            }
          ]
          
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
      
      const page =  1;
      const perPage =  2;
  
      const skip = page > 0 ? perPage * (page - 1) : 0;
      const sort = await this.prisma.category.findMany({
        skip: skip,
        take: perPage,
        orderBy:{
          name: req.type,
        },
       
        where:{
          isdeleted: false,
        }
      })
      return sort;
    
     
    }catch(error) {
      throw error;
    }
  }
}
