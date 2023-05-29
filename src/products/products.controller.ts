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
  getAddCategory(@Res() res) {

    return this.productsService.getcategory(res);
  }

  static storage = diskStorage({
    destination: './uploads',
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
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         cb(null, `${file.originalname}`);
  //       },
  //     }),
  //   }),
  // )
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createProductDto: CreateProductDto,
    @Res() res,
    @UploadedFile()
    file: Express.Multer.File,
  ) {

    console.log(createProductDto);
    
    const filepath = file.filename;

    // return file;
    return this.productsService.create(createProductDto, res, filepath);
  }

  @Get('product')
  findAll(@Req() req, @Res() res) {
    // console.log(req)
    return this.productsService.findAll(req, res);
  }

  @Get('edit-product')
  @Render('add-product')
  findOne(@Req() req, @Res() res) {
    console.log("edit controller",req.query);
    
    return this.productsService.findOne(+req.query.id,res);

  }

  @Post('edit-product')
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Res() res
  ) {
      console.log("updateProductDto",updateProductDto);
      
    // return this.productsService.update(updateProductDto,res);
  }

  @Post('delete-product')
  async remove(@Req() req, @Res() res) {
    console.log(+req.query.id);
    return await this.productsService.remove(+req.query.id, res);
  }
}
