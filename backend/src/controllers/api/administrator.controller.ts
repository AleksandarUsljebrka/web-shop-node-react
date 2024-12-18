import { Body, Controller, Get, Param, Post, Put, SetMetadata, UseGuards } from "@nestjs/common";
import { Administrator } from "src/entities/administrator.entity";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";

@Controller('api/administrator')
export class AdministratorController{
    constructor(
        private administratorService:AdministratorService
    ){}

    @Get('/all')
    @UseGuards(RoleCheckerGuard)
    @SetMetadata('allow_to_roles', ['administrator'])
    findAll():Promise<Administrator[]>{
        return this.administratorService.getAll();
    }
   
    @Get('/:id')
    @UseGuards(RoleCheckerGuard)
    @SetMetadata('allow_to_roles', ['administrator'])
    findById(@Param('id') administratorId:number):Promise<Administrator | ApiResponse>{
        return this.administratorService.findById(administratorId);
    }

    @Post()
    @SetMetadata('allow_to_roles', ['administrator'])
    @UseGuards(RoleCheckerGuard)
    create(@Body() data:AddAdministratorDto):Promise<Administrator | ApiResponse>{
        return this.administratorService.create(data);
    }

    @Put('/:id')
    @UseGuards(RoleCheckerGuard)
    @SetMetadata('allow_to_roles', ['administrator'])
    update(@Param('id') id:number, @Body() data:EditAdministratorDto):Promise<Administrator | ApiResponse>{
        return this.administratorService.update(id,data);
    }
}