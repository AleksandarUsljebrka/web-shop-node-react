import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from "config/jwt.secret";
import { UserService } from "src/services/user/user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(
        private readonly administratorService:AdministratorService,
        private readonly userService:UserService
    ){}

    async use(req: Request, res: Response, next: NextFunction) {
        if(!req.headers.authorization){
            throw new HttpException("Token not found", HttpStatus.UNAUTHORIZED);
        }
        const token = req.headers.authorization;

        const tokenParts = token.split(' ');
        if(tokenParts.length !== 2){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED);
        }
        const tokenString = tokenParts[1];

        let jwtData:JwtDataDto;
        
        try{
            jwtData = jwt.verify(tokenString, jwtSecret);
        }catch(err){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED);   
        }
        if(jwtData === null || jwtData === undefined){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED);
        }
        if(jwtData.ip !== req.ip.toString()){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED);
        }
        if(jwtData.ua !== req.headers["user-agent"]){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED);
        }
        
        if(jwtData.role ==='administrator'){
            const admin = await this.administratorService.findById(jwtData.id);
    
            if(admin === null || admin === undefined){
                throw new HttpException("Accont doesn't exist", HttpStatus.UNAUTHORIZED);
            }
        }else if(jwtData.role === 'user'){
            const user = await this.userService.findById(jwtData.id);
            if(user === null || user === undefined){
                throw new HttpException("User account doesn't exist!",HttpStatus.UNAUTHORIZED);
            }
        }
            
        const currentTimestamp = new Date().getTime() / 1000;
        if(jwtData.exp <= currentTimestamp){
            throw new HttpException("Token has expired", HttpStatus.UNAUTHORIZED);
        }

        req.token = jwtData;
        
        next();
    }
    
}