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

@Controller('admin/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('add-product')
  @Render('add-product')
  getAddCategory() {
    return { product: 'undefined' };
  }

  static storage = diskStorage({
    destination: './uploads',
    filename(req, file, callback) {
      console.log('1');

      let name = file.originalname.split('.')[0];
      name = name.split(' ').join('-');
      const fileExtName = extname(file.originalname);
      console.log('hello');

      callback(null, name + Date.now() + fileExtName);
    },
    // : (req, file, callback) => {

    // },
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
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image' }], {
      storage: ProductsController.storage,
    }),
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @Res() res,
    @UploadedFile()
    file: { image?: Express.Multer.File },
  ) {
    console.log(file);

    return file;
    // return this.productsService.create(createProductDto,res);
  }

  @Get('product')
  findAll(@Req() req, @Res() res) {
    return this.productsService.findAll(req, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
