import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { resolve } from 'path';
import { CreateCategoryDto } from 'src/dtos/category/create.category.dto';
import { UpdateCategoryDto } from 'src/dtos/category/update.category.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly category: Repository<Category>,
  ) {}
  create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category | ApiResponse> {
    let category: Category = new Category();

    Object.assign(category, createCategoryDto);

    return new Promise((resolve) => {
      this.category
        .save(category)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          resolve(new ApiResponse('error', -1001));
        });
    });
  }

  findAll() {
    return this.category.find({
      relations: [
        'categories',
        'articles',
        'articles.articleFeatures',
        'articles.articlePrices',
        'articles.photos'
      ],
    });
  }

  async findOne(id: number): Promise<Category | ApiResponse> {
    let category = await this.category.findOne({
      where: { categoryId: id },
      relations: ['categories'],
    });

    if (category === null || category === undefined) {
      return new Promise((resolve) => {
        resolve(new ApiResponse('error', -1002));
      });
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | ApiResponse> {
    let category = await this.category.findOne({ where: { categoryId: id } });
    console.log(category);

    let parentCategoryId = await this.category.findOne({
      where: { categoryId: updateCategoryDto.parentCategoryId },
    });

    if (
      category === null ||
      category === undefined ||
      parentCategoryId === undefined ||
      parentCategoryId === null
    ) {
      return new Promise((resolve) => {
        resolve(new ApiResponse('error', -1002));
      });
    }
    Object.assign(category, updateCategoryDto);

    return this.category.save(category);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
