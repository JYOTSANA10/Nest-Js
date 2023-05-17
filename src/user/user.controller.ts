import { Controller,Get,Req,UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get('data')
    UserData(@Req() req:Request){

        console.log("req",req['user']);
        
        return('user')

    }
}
