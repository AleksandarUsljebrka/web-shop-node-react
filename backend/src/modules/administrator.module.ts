import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorController } from 'src/controllers/api/administrator.controller';
import { AuthController } from 'src/controllers/api/auth.controller';
import { AdministratorService } from 'src/services/administrator/administrator.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Administrator
    ])
  ],
  controllers: [AdministratorController,AuthController],
  providers: [AdministratorService],
  exports:[AdministratorService]
})
export class AdministratorModule {}