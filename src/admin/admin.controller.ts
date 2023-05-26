import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Render,
  Res,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto, UserDto, CategoryDto } from './dto';

@Controller('admin')
export class AdminController {
  constructor(private adminservice: AdminService) {}

  @Get('/')
  @Render('admindashboard.ejs')
  Admin() {
    console.log('admin');
  }

  // @Get('user')
  // @Render('admin-user.ejs')
  // User(){
  //   console.log("user");

  // }

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

  @Put('delete')
  deleteProduct(@Body() dto: AdminDto) {
    return this.adminservice.deleteProduct(dto);
  }

  @Get('add-user')
  @Render('edit-form')
  getaddUser() {
    console.log('admin');
  }


  @Post('add-user')
  addUser(@Body() @Req() req, @Res() res) {
    console.log('user', req);
    return this.adminservice.addUser(req,res);
  }

  @Get('user')
  readUser(@Res() res) {
    // console.log(res.body);
    // const res2=res.body;
    // let res3 = JSON.parse(res2.toString());
    return this.adminservice.readUser(res);
  }

  @Get('edit-user')
  @Render('edit-form')
  getEditUser( @Req() req, @Res() res) {
    console.log("getedituser", req.query.id);
    
    // return this.adminservice.getEditUser(req.query.id,res);

  }

  @Put('edit-user')
  editUser(@Res() res) {
    console.log(res)
    // return this.adminservice.editUser(dto);
  }

  @Put('delete-user')
  deleteUser(id: number, @Req() req, @Res() res) {
    console.log('delete user', req.query.id);

    return this.adminservice.deleteUser(req.query.id, res);
  }

  @Post('add-category')
  addCategory(@Body() dto: CategoryDto) {
    console.log('user', dto);
    return this.adminservice.addCategory(dto);
  }

  //   @Get('read-category')
  //   readCategory() {
  //     return this.adminservice.readCategory();
  //   }

  @Put('edit-category')
  editCategory(@Body() dto: CategoryDto) {
    // console.log(data)
    return this.adminservice.editCategory(dto);
  }

  @Put('delete-category')
  deleteCategory(@Body() dto: CategoryDto) {
    return this.adminservice.deleteCategory(dto);
  }
}
