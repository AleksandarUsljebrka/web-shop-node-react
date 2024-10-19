import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { Article } from 'entities/article.entity';
import { CreateArticleDto } from 'src/dtos/article/create.article.dto';
import { UpdateArticleDto } from 'src/dtos/article/update.article.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import { ArticleService } from 'src/services/article/article.service';

@Controller('api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto):Promise<Article | ApiResponse> {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<Article | ApiResponse> {
    return this.articleService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto):Promise<Article | ApiResponse> {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
