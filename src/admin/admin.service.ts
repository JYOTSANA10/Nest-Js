import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AdminDto,UpdateProduct } from './dto';
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
    
  }
}
