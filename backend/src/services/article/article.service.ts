import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleFeature } from 'src/entities/article-feature.entity';
import { ArticlePrice } from 'src/entities/article-price.entity';
import { Article } from 'src/entities/article.entity';
import { Feature } from 'src/entities/feature.entity';
import { CreateArticleDto } from 'src/dtos/article/create.article.dto';
import { UpdateArticleDto } from 'src/dtos/article/update.article.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly article: Repository<Article>,

    @InjectRepository(ArticlePrice)
    private readonly articlePrice: Repository<ArticlePrice>,

    @InjectRepository(ArticleFeature)
    private readonly articleFeature: Repository<ArticleFeature>,
  ) {}
  async create(
    createArticleDto: CreateArticleDto,
  ): Promise<Article | ApiResponse> {
    let newArticle: Article = new Article();

    newArticle.name = createArticleDto.name;
    newArticle.categoryId = createArticleDto.categoryId;
    newArticle.excerpt = createArticleDto.excerpt;
    newArticle.description = createArticleDto.description;
    newArticle.status = createArticleDto.status;

    let savedArticle: Article = await this.article.save(newArticle);

    let newArticlePrice: ArticlePrice = new ArticlePrice();
    newArticlePrice.price = createArticleDto.price;
    newArticlePrice.articleId = savedArticle.articleId;

    await this.articlePrice.save(newArticlePrice);

    for (let feature of createArticleDto.features) {
      let newFeature: ArticleFeature = new ArticleFeature();
      newFeature.articleId = savedArticle.articleId;
      newFeature.value = feature.value;
      newFeature.featureId = feature.featureId;

      await this.articleFeature.save(newFeature);
    }

    return await this.article.findOne({
      where: {
        articleId: savedArticle.articleId,
      },
      relations: ['category', 'articleFeatures', 'articleFeatures.feature'],
    });
  }

  findAll() {
    return this.article.find({
      relations: [
        'articleFeatures',
        'articleFeatures.feature',
        'category',
        'photos',
      ],
    });
  }

  async findOne(id: number): Promise<Article | ApiResponse> {
    let article = await this.article.findOne({
      where: { articleId: id },
      relations: ['articleFeatures.feature', 'category', 'photos'],
    });

    if (article === null || article === undefined) {
      return new Promise((resolve) => {
        resolve(new ApiResponse('error', -1002));
      });
    }
    return article;
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article | ApiResponse> {
    
    let article = await this.article.findOne({ where: { articleId: id } });
    console.log(article);

    if (article === null || article === undefined) {
      return new Promise((resolve) => {
        resolve(new ApiResponse('error', -1002));
      });
    }
    article.name = updateArticleDto.name;
    article.categoryId = updateArticleDto.categoryId;
    article.excerpt = updateArticleDto.excerpt;
    article.description = updateArticleDto.description;
    article.status = updateArticleDto.status;
    article.isPromoted = updateArticleDto.isPromoted;

    let savedArticle: Article = await this.article.save(article);

    let existingArticlePrice = await this.articlePrice.findOne({
      where: { articleId: savedArticle.articleId },
    });

    if (existingArticlePrice) {
      existingArticlePrice.price = updateArticleDto.price;
      await this.articlePrice.save(existingArticlePrice);
    } else {
      let newArticlePrice: ArticlePrice = new ArticlePrice();
      newArticlePrice.articleId = savedArticle.articleId;
      newArticlePrice.price = updateArticleDto.price;
      await this.articlePrice.save(newArticlePrice);
    }

    for (let feature of updateArticleDto.features) {
      let existingArticleFeature = await this.articleFeature.findOne({
        where: {
          articleId: savedArticle.articleId,
          featureId: feature.featureId,
        },
      });
      if (existingArticleFeature) {
        existingArticleFeature.value = feature.value;
        await this.articleFeature.save(existingArticleFeature);
      }
      else{

        let newFeature: ArticleFeature = new ArticleFeature();
        newFeature.articleId = savedArticle.articleId;
        newFeature.value = feature.value;
        newFeature.featureId = feature.featureId;
        
        await this.articleFeature.save(newFeature);
      }
    }

    return await this.article.findOne({
      where: {
        articleId: savedArticle.articleId,
      },
      relations: ['category', 'articleFeatures', 'articleFeatures.feature'],
    });
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
