import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleFeature } from 'entities/article-feature.entity';
import { ArticlePrice } from 'entities/article-price.entity';
import { Article } from 'entities/article.entity';
import { Photo } from 'entities/photo.entity';
import { ArticleController } from 'src/controllers/api/article.controller';
import { ArticleService } from 'src/services/article/article.service';
import { PhotoService } from 'src/services/photo/photo.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Article,
      ArticlePrice,
      ArticleFeature,
      Photo
    ])
  ],
  controllers: [ArticleController],
  providers: [ArticleService, PhotoService],
})
export class ArticleModule {}
