import { Controller, Get, Post, Body, Param, Delete, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { LoginAdministratorDto } from 'src/dtos/administrator/login.administrator.dto';
import { LoginInfoAdministratorDto } from 'src/dtos/administrator/login.info.administrator.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import { AdministratorService } from 'src/services/administrator/administrator.service';

@Controller('auth')
export class AuthController {
  constructor(public readonly administratorService: AdministratorService) {}

  @Post('login')
  login(@Body() data:LoginAdministratorDto, @Req() req:Request):Promise<ApiResponse | LoginInfoAdministratorDto>{
    return this.administratorService.login(data, req);
  }
}
