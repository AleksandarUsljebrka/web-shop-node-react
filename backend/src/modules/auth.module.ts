import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/api/auth.controller';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user/user.service';
import { AdministratorModule } from './administrator.module';
import { UserModule } from './user.module';

@Module({
  imports:[
    AdministratorModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: []
})
export class AuthModule {}
