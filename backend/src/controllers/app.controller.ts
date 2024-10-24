import { Controller, Get } from '@nestjs/common';
import { Administrator } from 'src/entities/administrator.entity';
import { AdministratorService } from '../services/administrator/administrator.service';

@Controller()
export class AppController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Get('api/administrator')
  getAllAdmins():Promise<Administrator[]>{
    return this.administratorService.getAll();
  }
}
