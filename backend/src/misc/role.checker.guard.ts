import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class RoleCheckerGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req:Request = context.switchToHttp().getRequest();
        const role = req.token.role;

        const allowToRoles = 
            this.reflector.get<('administrator' | 'user')[]>('allow_to_roles',context.getHandler());
        console.log(req.token);
        
        if(!allowToRoles.includes(role))
            return false;

        return true;
    }
}