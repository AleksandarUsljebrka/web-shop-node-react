import { Controller, Get, Post, Body, Param, Delete, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { LoginAdministratorDto } from 'src/dtos/administrator/login.administrator.dto';
import { LoginInfoAdministratorDto } from 'src/dtos/administrator/login.info.administrator.dto';
import { UserRegistrationDto } from 'src/dtos/auth/user.registration.dto';
import { User } from 'src/entities/user.entity';
import { ApiResponse } from 'src/misc/api.response.class';
import { AdministratorService } from 'src/services/administrator/administrator.service';
import { UserService } from 'src/services/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    public readonly administratorService: AdministratorService,
    public readonly userService: UserService
  ) {}

  @Post('login')
  login(@Body() data:LoginAdministratorDto, @Req() req:Request):Promise<ApiResponse | LoginInfoAdministratorDto>{
    return this.administratorService.login(data, req);
  }
  @Post('register')
  register(@Body() data:UserRegistrationDto):Promise<User | ApiResponse>{
    return this.userService.register(data);
  }
}
