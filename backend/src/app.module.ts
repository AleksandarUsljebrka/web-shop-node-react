import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.host,
      database: DatabaseConfiguration.database,
      port:3306,
      username:DatabaseConfiguration.username,
      password:DatabaseConfiguration.password,
      entities:[Administrator]
    }),
    TypeOrmModule.forFeature([Administrator])
  ],
  controllers: [AppController],
  providers: [AdministratorService],
})
export class AppModule {}
