import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Req,
  Res,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('add-category')
  @Render('add-category')
  getAddCategory() {
    return { category: 'undefined' };
  }

  @Post('add-category')
  create(@Body() createCategoryDto: CreateCategoryDto, @Res() res) {
    console.log(createCategoryDto);

    return this.categoriesService.create(createCategoryDto, res);
  }

  @Get('/category')
  async findAll(@Req() req, @Res() res) {
    // console.log('findAll');

    return await this.categoriesService.findAll(req, res);
  }

  // @Get('edit-category?id')
  // findOne(@Param('id') id: number) {
  //   console.log("get",id);

  //   // return this.categoriesService.findOne(+id);
  // }

  @Get('edit-category')
  @Render('add-category')
  async findOne(@Req() req, @Res() res) {
    console.log(req.query);

    return await this.categoriesService.findOne(+req.query.id, res);
  }

  @Post('edit-category')
  async update(@Body() updateCategoryDto: UpdateCategoryDto, @Res() res) {
    console.log(updateCategoryDto);

    return await this.categoriesService.update(updateCategoryDto, res);
  }

  @Post('delete-category')
  async remove(@Req() req, @Res() res) {
    console.log(+req.query.id);
    return await this.categoriesService.remove(+req.query.id, res);
  }

  @Get('search-category')
  async User(@Req() req, @Res() res) {
    console.log("user",req.query.data);

    const data= await this.categoriesService.search(req.query.data,res)

    res.send(data)
  }
}
