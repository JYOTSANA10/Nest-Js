import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";


@Injectable()
export class AdminRoleGuard implements CanActivate{

    constructor(){}

    async canActivate(context:ExecutionContext){

        const request=context.switchToHttp().getRequest();
        console.log("req",request.user);
        

        if(request?.user){
            const {id}=request.user;
        }

        return false;
    }

}