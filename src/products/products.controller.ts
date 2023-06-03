import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { log } from 'console';
import { async } from 'rxjs';
import { Path } from '@nestjs/config';

@Controller('admin/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('add-product')
  @Render('add-product')
  async getAddCategory(@Res() res) {
    return await this.productsService.getproduct(res);
  }

  static storage = diskStorage({
    destination: './public/uploads',
    filename(req, file, callback) {
      // console.log('1');

      let name = file.originalname.split('.')[0];
      name = name.split(' ').join('-');
      const fileExtName = extname(file.originalname);
      // console.log('hello');

      callback(null, name + Date.now() + fileExtName);
    },
  });

  @Post('add-product')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @Res() res,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log('createProductDto', createProductDto);

    const filepath = file.filename;

    console.log(file);

    return await this.productsService.create(createProductDto, res, filepath);
  }

  @Get('product')
  async findAll(@Req() req, @Res() res) {
    // console.log(req)
    return await this.productsService.findAll(req, res);
  }

  @Get('edit-product')
  // @Render('product-show')
  async findOne(@Req() req, @Res() res) {
    console.log('edit controller', req.query);

    return await this.productsService.findOne(+req.query.id, res);
  }

  @Post('edit-product')
  async update(@Body() updateProductDto: UpdateProductDto, @Res() res,@UploadedFile()
  file: Express.Multer.File,) {
    console.log('updateProductDto', updateProductDto);

    return await this.productsService.update(updateProductDto, res);
  }

  @Post('delete-product')
  async remove(@Req() req, @Res() res) {
    console.log(+req.query.id);
    const data= await this.productsService.remove(req, res);
    res.send(data);
  }

  @Get('search-product')
  async User(@Req() req, @Res() res) {
    console.log('user', req.query.data);

    const data = await this.productsService.search(req.query.data, res);

    res.send(data);
  }
}
