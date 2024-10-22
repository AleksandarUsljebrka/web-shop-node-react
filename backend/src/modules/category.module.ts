import { Module } from '@nestjs/common';
import { CategoryController } from '../controllers/api/category.controller';
import { CategoryService } from 'src/services/category/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Category
    ])
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
