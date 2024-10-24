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
    
    let article = await this.article.findOne({ where: { articleId: id }, relations:['articlePrices', 'articleFeatures'] });
    
    if (article === null || article === undefined) {
      return new Promise((resolve) => {
        resolve(new ApiResponse('error', -1002, 'Article not found'));
      });
    }
    article.name = updateArticleDto.name;
    article.categoryId = updateArticleDto.categoryId;
    article.excerpt = updateArticleDto.excerpt;
    article.description = updateArticleDto.description;
    article.status = updateArticleDto.status;
    article.isPromoted = updateArticleDto.isPromoted;

    let savedArticle: Article = await this.article.save(article);

    if(savedArticle === null || savedArticle === undefined){
      return new ApiResponse('error', -1003, 'Could not save changes');
    }

    const newPrice:string = Number(updateArticleDto.price).toFixed(2);
    const lastPrice = article.articlePrices[article.articlePrices.length - 1];
    const lastPriceString:string = Number(lastPrice).toFixed(2);

   
    if (lastPriceString !== newPrice) {
      let newArticlePrice: ArticlePrice = new ArticlePrice();
      newArticlePrice.articleId = savedArticle.articleId;
      newArticlePrice.price = updateArticleDto.price;
      const savedArticlePrise = await this.articlePrice.save(newArticlePrice);

      if(!savedArticle){
        return new ApiResponse('error', -5003, 'Could not save the new article price');
      }
    
    }

    if(updateArticleDto.features !== null){
      await this.articleFeature.remove(article.articleFeatures);

  
    for (let feature of updateArticleDto.features) {
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
