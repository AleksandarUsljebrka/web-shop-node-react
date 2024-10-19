import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CreateCategoryDto } from '../../dtos/category/create.category.dto';
import { UpdateCategoryDto } from '../../dtos/category/update.category.dto';
import { CategoryService } from 'src/services/category/category.service';
import { Category } from 'entities/category.entity';
import { ApiResponse } from 'src/misc/api.response.class';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto):Promise<Category | ApiResponse> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<Category | ApiResponse> {
    return this.categoryService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto):Promise<Category | ApiResponse> {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
