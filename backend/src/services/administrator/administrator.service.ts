import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'src/entities/administrator.entity';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import { EditAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import { Repository } from 'typeorm';
import { LoginAdministratorDto } from 'src/dtos/administrator/login.administrator.dto';
import { LoginInfoDto } from 'src/dtos/auth/login.info.dto';
import * as jwt from 'jsonwebtoken';
import { JwtDataDto } from 'src/dtos/auth/jwt.data.dto';
import { Request } from 'express';
import { jwtSecret } from 'config/jwt.secret';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator) 
        private readonly administrator:Repository<Administrator>
    ){}

    getAll():Promise<Administrator[]>{
        return this.administrator.find();
    }
    async login(data:LoginAdministratorDto, req:Request):Promise<LoginInfoDto | ApiResponse>{
        let administrator:Administrator = await this.administrator.findOne({
            where:{username:data.username}
        })

        if(administrator ===null || administrator === undefined){
            return new Promise(resolve => resolve(new ApiResponse('error', -3001)));
        }
        const crypto = require('crypto');
        
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if(administrator.passwordHash !== passwordHashString){
            return new Promise(resolve => resolve(new ApiResponse('error',-3002)));
        }

        const jwtData = new JwtDataDto();
        jwtData.role = 'administrator';
        jwtData.id = administrator.administratorId;
        jwtData.identity = administrator.username;

        let now = new Date();
        now.setDate(now.getDate() + 14);
        const exp = now.getTime() /1000;
        jwtData.exp = exp;

        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers['user-agent'];

        let token:string = jwt.sign(jwtData.toPlainObject(), jwtSecret);
        const response:LoginInfoDto = new LoginInfoDto(
            administrator.administratorId,
            administrator.username,
            token
        )
        console.log(jwtData)
        return new Promise(resolve => resolve(response));
    }
    async findById(id:number):Promise<Administrator | ApiResponse>{
        let admin:Administrator = await this.administrator.findOne({where:{administratorId:id}});
        
        if(admin === undefined || admin === null){
            return new Promise(resolve => {
                resolve(new ApiResponse('error', -1002));
            });
        }
        return this.administrator.findOne({where:{administratorId:id}});
    }
    create(data:AddAdministratorDto):Promise<Administrator | ApiResponse>{
        const crypto = require('crypto');
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);

        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let newAdmin:Administrator = new Administrator();
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;

        return new Promise((resolve)=>{
            this.administrator.save(newAdmin)
            .then(data => resolve(data))
            .catch(error =>{
                const response = new ApiResponse("error", -1001);
                resolve(response);
            })
        })
    }

    async update(id:number, data:EditAdministratorDto):Promise<Administrator | ApiResponse>{
        let admin:Administrator = await this.administrator.findOne({where:{administratorId:id}});
        
        if(admin === undefined || admin === null){
            return new Promise(resolve => {
                resolve(new ApiResponse('error', -1002));
            });
        }
        const crypto = require('crypto');

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        admin.passwordHash = passwordHashString;

        return this.administrator.save(admin);
    }
}
