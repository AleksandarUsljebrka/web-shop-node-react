import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtDataAdministratorDto } from "src/dtos/administrator/jwt.data.administrator.dto";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from "config/jwt.secret";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private readonly administratorService:AdministratorService){}

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

        let jwtData:JwtDataAdministratorDto;
        
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
        
        const admin = await this.administratorService.findById(jwtData.administratorId);
        // console.log("TOKEN: ",admin);
        if(admin === null || admin === undefined){
            throw new HttpException("Accont doesn't exist", HttpStatus.UNAUTHORIZED);
        }
        const currentTimestamp = new Date().getTime() / 1000;
        if(jwtData.exp <= currentTimestamp){
            throw new HttpException("Token has expired", HttpStatus.UNAUTHORIZED);
        }
        next();
    }
    
}