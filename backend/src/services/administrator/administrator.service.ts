import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'entities/administrator.entity';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import { EditAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import { Repository } from 'typeorm';
import crypto from 'crypto';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator) 
        private readonly administrator:Repository<Administrator>
    ){}

    getAll():Promise<Administrator[]>{
        return this.administrator.find();
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
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        admin.passwordHash = passwordHashString;

        return this.administrator.save(admin);
    }
}
