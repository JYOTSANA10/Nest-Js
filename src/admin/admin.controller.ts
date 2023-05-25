import { Controller, Post, Get, Body, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto';

@Controller('admin')
export class AdminController {
  constructor(private adminservice: AdminService) {}

  @Post('add')
  addProduct(@Body() dto: AdminDto) {
    // console.log(data)
    return this.adminservice.addProduct(dto);
  }

  @Get('read')
  readProduct() {
    return this.adminservice.readProduct();
  }

  @Put('edit')
  editProduct(@Body() dto: AdminDto) {
    // console.log(data)
    return this.adminservice.editProduct(dto);
  }
}
