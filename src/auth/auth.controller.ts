import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthContoller{
    constructor(private authservice:AuthService){}

    @Post('register')
    register(){
        return 'Register';
    }

    @Post('login')
    login(){
        return 'Login';
        
    }
}