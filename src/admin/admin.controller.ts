import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Render,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {UserDto, CategoryDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
// import { AdminRoleGuard } from 'src/auth/admin-role.guard';
import { UseRoles } from 'nest-access-control';

@Controller('admin')
@UseGuards(AuthGuard('jwt'))

export class AdminController {
  constructor(private adminservice: AdminService) {}

  @Get('/')
 @UseGuards(AuthGuard('jwt'))
  @UseRoles({
    possession:"any",
    action:'create',
    resource:'product'
  })
  @Render('admindashboard.ejs')
  Admin(@Req() req) {
    console.log('admin');
  }

  @Get('search')
  async User(@Req() req, @Res() res) {
    console.log("user",req.query.data);

    const data= await this.adminservice.search(req.query,res)

    res.send(data)
  }

  // @Post('add')
  // addProduct(@Body() dto: AdminDto) {
  //   // console.log(data)
  //   return this.adminservice.addProduct(dto);
  // }

  // @Get('read')
  // readProduct() {
  //   return this.adminservice.readProduct();
  // }

  // @Put('edit')
  // editProduct(@Body() dto: AdminDto) {
  //   // console.log(data)
  //   return this.adminservice.editProduct(dto);
  // }

  // @Put('delete')
  // deleteProduct(@Body() dto: AdminDto) {
  //   return this.adminservice.deleteProduct(dto);
  // }

  @Get('add-user')
  // @Render('edit-form')
  getaddUser(@Req() req ,@Res() res) {

    this.adminservice.getaddUser(req,res);
    return {user:"undefined"}
  }


  @Post('add-user')
  addUser(@Body() @Req() req, @Res() res) {
    console.log('user', req);
    return this.adminservice.addUser(req,res);
  }

  @Get('user')
  readUser(@Req() req,@Res() res) {
    // console.log(res.body);
    // const res2=res.body;
    // let res3 = JSON.parse(res2.toString());
    return this.adminservice.readUser(req,res);
  }

  @Get('edit-user')
  @Render('edit-form')
  getEditUser( @Req() req, @Res() res) {
    console.log("getedituser", +req.query.id);
    
    return this.adminservice.getEditUser(+req.query.id,res);

  }

  @Post('edit-user')
  editUser(@Body() userDto:UserDto,@Res() res) {
    console.log(userDto)
    return this.adminservice.editUser(userDto,res);
  }

  // @Post('edit-category')
  // async update(@Body() updateCategoryDto: UpdateCategoryDto, @Res() res) {
  //   console.log(updateCategoryDto);

  //   return await this.categoriesService.update(updateCategoryDto, res);
  // }

  @Post('delete-user')
 async deleteUser(id: number, @Req() req, @Res() res) {
    console.log('delete user', req.query.id);

    const data=await this.adminservice.deleteUser(req, res);
    res.send(data);
  }

  @Post('sort-user')
  async Sort(@Req() req, @Res() res) {
    console.log('user', req.query.data);

    const data = await this.adminservice.sort(req.query, res);

    res.send(data);
  }

  @Post('/page')
  async Pagination(@Req() req, @Res() res) {
    // console.log('findAll');

    const data= await this.adminservice.pagination(req, res);
    res.send(data);
  }
}
