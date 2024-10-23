import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ApiResponse } from 'src/misc/api.response.class';
import { Repository } from 'typeorm';
import { UserRegistrationDto } from 'src/dtos/auth/user.registration.dto';
import * as crypto from 'crypto';
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
