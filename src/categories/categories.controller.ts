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

  @Post('/category/page')
  async Pagination(@Req() req, @Res() res) {
    // console.log('findAll');

    const data= await this.categoriesService.pagination(req, res);
    res.send(data);
  }

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
    const data= await this.categoriesService.remove(req, res);
    res.send(data);
  }

  @Get('search-category')
  async User(@Req() req, @Res() res) {
    console.log("user",req.query.data);

    const data= await this.categoriesService.search(req.query,res)

    res.send(data)
  }

  @Post('sort-category')
  async Sort(@Req() req, @Res() res) {
    console.log('user', req.query.data);

    const data = await this.categoriesService.sort(req.query, res);

    res.send(data);
  }
}
