import { Injectable, Redirect } from '@nestjs/common';
import express, { Request, Response } from 'express';
import * as argon from 'argon2';

import { PrismaService } from 'prisma/prisma.service';
import { UserDto, CategoryDto } from './dto';
import { where } from 'sequelize';

@Injectable({})
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // async addProduct(dto: AdminDto) {
  //   // console.log('service', dto.category);

  //   try {
  //     // console.log("try");

  //     const product = await this.prisma.product.create({
  //       data: {
  //         name: dto.name,
  //         price: dto.price,
  //         category: dto.category,
  //       },
  //     });

  //     return product;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async readProduct() {
  //   try {
  //     const product = await this.prisma.product.findMany();
  //     return product;
  //   } catch (error) {
  //     throw error;
  //   }

  // }

  // async editProduct(dto: AdminDto) {

  //   console.log(dto);

  //   try {
  //     const product = await this.prisma.product.update({
  //       data: dto,
  //       where:{
  //           id: dto.id,
  //       }
  //     })
  //     return product;
  //   } catch (error) {
  //     throw error;
  //   }

  // }

  // async deleteProduct(dto: AdminDto) {

  //   try {
  //       const product = await this.prisma.product.update({
  //         data: {
  //           isdeleted :true,
  //         },
  //         where:{
  //             id: dto.id,
  //         }
  //       })
  //       return product;
  //     } catch (error) {
  //       throw error;
  //     }
  // }

  //    User    //

  async getaddUser(req, res) {
    try {
      const user = 'undefined';
      const role = await this.prisma.role.findMany();

      res.render('edit-form', {
        role: role,
        user: user,
      });
    } catch (error) {
      throw error;
    }
  }

  async addUser(req, res) {
    // console.log('service', dto.category);

    const hash = await argon.hash(req.password);

    try {
      console.log('try', req);
      if (req.role == 'User') {
        await this.prisma.user.create({
          data: {
            name: req.name,
            email: req.email,
            role_id: 2,
            pass: hash,
          },
        });
      } else {
        await this.prisma.user.create({
          data: {
            name: req.name,
            email: req.email,
            role_id: 1,
            pass: hash,
          },
        });
      }

      res.redirect('/admin/user/');
    } catch (error) {
      throw error;
    }
  }

  async readUser(res: Response) {
    // console.log('service', dto.category);

    try {
      const user = await this.prisma.user.findMany({
        where: {
          isdeleted: false,
          id: { gt: 1 },
        },
        include: { role: true },
      });
      console.log(user);

      res.render('admin-user', {
        user: user,
      });

    } catch (error) {
      throw error;
    }
  }

  async getEditUser(req, res) {
    // console.log('service', dto.category);

    console.log(req);

    let id = JSON.parse(req.toString());

    try {
      const role = await this.prisma.role.findMany();

      const user = await this.prisma.user.findUnique({
        where: {
          id: +id,
        },
        include: { role: true },
      });
      console.log(user);

      res.render('edit-form', {
        user: user,
        role: role,
      });
    } catch (error) {
      throw error;
    }
  }

  async editUser(dto: UserDto, res) {
    // console.log('service', dto.category);

    try {
      // console.log("try");
      if (dto.role == 'User') {
        const user = await this.prisma.user.update({
          data: {
            name: dto.name,
            email: dto.email,
            role_id: 2,
          },
          where: {
            id: +dto.id,
          },
        });
      } else {
        const user = await this.prisma.user.update({
          data: {
            name: dto.name,
            email: dto.email,
            role_id: 1,
          },
          where: {
            id: +dto.id,
          },
        });
      }

      res.redirect('/admin/user');
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(req, res) {
    console.log('service', req);
   

    try {
      // console.log("try");
      await this.prisma.user.update({
        data: {
          isdeleted: true,
        },
        where: {
          id: +req.query.id,
        },
      });
      const user = await this.prisma.user.findMany({
        where: {
          isdeleted: false,
          id: { gt: 1 },
        },
        include: { role: true },

      });
      return user;
      
    } catch (error) {
      throw error;
    }
  }

  async addCategory(dto: CategoryDto) {
    // console.log('service', dto.category);

    try {
      console.log('try');

      const category = await this.prisma.category.create({
        data: dto,
      });
      return category;
    } catch (error) {
      throw error;
    }
  }

  async readCategory(dto: CategoryDto) {
    // console.log('service', dto.category);

    try {
      const category = await this.prisma.category.findMany();
      return category;
    } catch (error) {
      throw error;
    }
  }

  async editCategory(dto: CategoryDto) {
    // console.log('service', dto.category);

    try {
      // console.log("try");
      const category = await this.prisma.category.update({
        data: dto,
        where: {
          id: dto.id,
        },
      });
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
          isdeleted: true,
        },
        where: {
          id: dto.id,
        },
        
      });
      return category;
    } catch (error) {
      throw error;
    }
  }

    async search(data,res) {
      try {
        const search = await this.prisma.user.findMany({
          where: {
            AND:[
              {
                isdeleted:false,
              },
              {

                OR: [
                  {
                    email: {
                      startsWith: data,
                    },
                  },
                  {
                    name: {
                      startsWith: data,
                    }
                  },
                  
                ],
              }
            ]
            
          },
          include:{role:true}
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
        const sort = await this.prisma.user.findMany({
          orderBy:{
            name: req.type,
          },
          include:{role:true},
          where:{
            isdeleted: false,
          }
        })
        return sort;
      }else if(req.data=='email'){
        const sort = await this.prisma.user.findMany({
          orderBy:{
            email: req.type,
          },
          include:{role:true},
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
