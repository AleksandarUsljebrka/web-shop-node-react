import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ApiResponse } from 'src/misc/api.response.class';
import { Repository } from 'typeorm';
import { UserRegistrationDto } from 'src/dtos/user/user.registration.dto';
import * as crypto from 'crypto';
import { LoginInfoDto } from 'src/dtos/auth/login.info.dto';
import { JwtDataDto } from 'src/dtos/auth/jwt.data.dto';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from 'config/jwt.secret';
import { LoginUserDto } from 'src/dtos/user/LoginUserDto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private readonly user:Repository<User>
    ){}

    async register(data:UserRegistrationDto):Promise<User | ApiResponse>{
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        const newUser:User = new User();
        newUser.email = data.email;
        newUser.forename = data.forename;
        newUser.surename = data.surename;
        newUser.phoneNumber = data.phoneNumber;
        newUser.postalAddress = data.postalAddress;
        newUser.passwordHash = passwordHashString;

        try{
            const savedUser = await this.user.save(newUser);
            if(!savedUser){
                throw new Error();
            }

            return savedUser;
        }catch(err){
            return new ApiResponse('error', -6001, 'This user account can not be created.');
        }


    }

    async login(data:LoginUserDto, req:Request):Promise<LoginInfoDto | ApiResponse>{
        let user:User = await this.user.findOne({
            where:{email:data.email}
        })

        if(user ===null || user === undefined){
            return new Promise(resolve => resolve(new ApiResponse('error', -3001)));
        }
        const crypto = require('crypto');
        
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if(user.passwordHash !== passwordHashString){
            return new Promise(resolve => resolve(new ApiResponse('error',-3002)));
        }

        const jwtData = new JwtDataDto();
        jwtData.role = 'user';
        jwtData.id = user.userId;
        jwtData.identity = user.email;

        let now = new Date();
        now.setDate(now.getDate() + 14);
        const exp = now.getTime() /1000;
        jwtData.exp = exp;

        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers['user-agent'];

        let token:string = jwt.sign(jwtData.toPlainObject(), jwtSecret);
        const response:LoginInfoDto = new LoginInfoDto(
            user.userId,
            user.email,
            token
        )
        
        return new Promise(resolve => resolve(response));
    }

    getAll():Promise<User[]>{
        return this.user.find();
    }
  
    async findById(id:number):Promise<User | ApiResponse>{
        let admin:User = await this.user.findOne({where:{userId:id}});
        
        if(admin === undefined || admin === null){
            return new Promise(resolve => {
                resolve(new ApiResponse('error', -1002));
            });
        }
        return this.user.findOne({where:{userId:id}});
    }
  

   
}
