import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from 'src/entities/administrator.entity';
import { AdministratorController } from 'src/controllers/api/administrator.controller';
import { AuthController } from 'src/controllers/api/auth.controller';
import { AdministratorService } from 'src/services/administrator/administrator.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Administrator
    ])
  ],
  controllers: [AdministratorController],
  providers: [AdministratorService],
  exports:[AdministratorService]
})
export class AdministratorModule {}
