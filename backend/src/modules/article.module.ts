import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleFeature } from 'entities/article-feature.entity';
import { ArticlePrice } from 'entities/article-price.entity';
import { Article } from 'entities/article.entity';
import { ArticleController } from 'src/controllers/api/article.controller';
import { ArticleService } from 'src/services/article/article.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Article,
      ArticlePrice,
      ArticleFeature
    ])
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
