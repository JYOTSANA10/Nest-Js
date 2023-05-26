import { Injectable, Redirect } from '@nestjs/common';
import express, { Request, Response } from "express";

import { PrismaService } from 'prisma/prisma.service';
import { AdminDto,UserDto,CategoryDto } from './dto';
import { where } from 'sequelize';

@Injectable({})
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async addProduct(dto: AdminDto) {
    // console.log('service', dto.category);

    try {
      // console.log("try");

      const product = await this.prisma.product.create({
        data: {
          name: dto.name,
          price: dto.price,
          category: dto.category,
        },
      });

      return product;
    } catch (error) {
      throw error;
    }
  }

  async readProduct() {
    try {
      const product = await this.prisma.product.findMany();
      return product;
    } catch (error) {
      throw error;
    }
    
  }


  async editProduct(dto: AdminDto) {

    console.log(dto);
    
    try {
      const product = await this.prisma.product.update({
        data: dto,
        where:{
            id: dto.id,
        }
      })
      return product;
    } catch (error) {
      throw error;
    }
    
  }

  async deleteProduct(dto: AdminDto) {

    try {
        const product = await this.prisma.product.update({
          data: {
            isdeleted :true,
          },
          where:{
              id: dto.id,
          }
        })
        return product;
      } catch (error) {
        throw error;
      }
  }

          //    User    //


  async addUser(req,res) {
    // console.log('service', dto.category);

    try {
      console.log("try");

      const user=await this.prisma.admin_user.create({
        data:{
            name: req.name,
            email: req.email,
            role: req.role,
            permission: req.permission
        }
      })

     res.redirect("/admin/user/")
      
    } catch (error) {
      throw error;
    }
  }


  async readUser(res: Response) {
    // console.log('service', dto.category);

    try {
     
     const user=await this.prisma.admin_user.findMany({
      where:{
        isdeleted :false,
      }
     })
     
     res.render('admin-user',{
      user: user
     })
      
    } catch (error) {
      throw error;
    }
  }
 
  
  async getEditUser(req,res) {
    // console.log('service', dto.category);

    console.log(req);
    
    let id = JSON.parse(req.toString());

    try {
     
     const user=await this.prisma.admin_user.findUnique({
      where:{
        id :id,
      }
     })
     
     res.render('edit-form',{
      user: user
     })
      
    } catch (error) {
      throw error;
    }
  }


  async editUser(dto: UserDto) {
    // console.log('service', dto.category);

    try {
      // console.log("try");
      const user=await this.prisma.admin_user.update({
        data:{
            name: dto.name,
            email: dto.email,
        },
        where:{
            id: dto.id,
        }
      })
     return user;
      
    } catch (error) {
      throw error;
    }
  }


  async deleteUser(req,res) {
    console.log('service', req);
    let id = JSON.parse(req.toString());

    try {
      // console.log("try");
      const user = await this.prisma.admin_user.update({
        data: {
          isdeleted :true,
        },
        where:{
            id: id,
        }
      })
      
      
      res.redirect("/admin/user/")
     
      

      
    } catch (error) {
      throw error;
    }
  }


  async addCategory(dto: CategoryDto) {
    // console.log('service', dto.category);

    try {
      console.log("try");

      const category=await this.prisma.category.create({
        data:dto
      })
     return category;
      
    } catch (error) {
      throw error;
    }
  }

  async readCategory(dto: CategoryDto) {
    // console.log('service', dto.category);

    try {
     
     const category=await this.prisma.category.findMany()
     return category;
      
    } catch (error) {
      throw error;
    }
  }

  async editCategory(dto: CategoryDto) {
    // console.log('service', dto.category);

    try {
      // console.log("try");
      const category=await this.prisma.category.update({
        data:dto,
        where:{
            id: dto.id,
        }
      })
     return category;
      
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(dto: CategoryDto) {
    // console.log('service', dto.category);

    try {
      // console.log("try");
      const category = await this.prisma.category.update({
        data: {
          isdeleted :true,
        },
        where:{
            id: dto.id,
        }
      })
      return category;
      

      
    } catch (error) {
      throw error;
    }
  }


}
