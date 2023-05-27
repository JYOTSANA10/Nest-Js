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
    return {category:'undefined'};
  }

  @Post('add-category')
  create(@Body() createCategoryDto: CreateCategoryDto, @Res() res) {
    console.log(createCategoryDto);

    return this.categoriesService.create(createCategoryDto, res);
  }

  @Get('/category')
  findAll(@Req() req, @Res() res) {
    // console.log('findAll');

    return this.categoriesService.findAll(req, res);
  }

  // @Get('edit-category?id')
  // findOne(@Param('id') id: number) {
  //   console.log("get",id);
    
  //   // return this.categoriesService.findOne(+id);
  // }

  @Get('edit-category')
  @Render('add-category')
  findOne(@Req() req, @Res() res) {
    console.log(req.query);
    
    return this.categoriesService.findOne(+req.query.id,res);

  }
 

  @Post('edit-category')
  update(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res
  ) {
      console.log(updateCategoryDto);
      
    return this.categoriesService.update(updateCategoryDto,res);
  }

  @Post('delete-category')
  remove(@Req() req, @Res() res) {
    console.log(+req.query.id);
    return this.categoriesService.remove(+req.query.id, res);
  }
}
