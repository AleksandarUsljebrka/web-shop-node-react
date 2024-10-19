import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleFeature } from 'entities/article-feature.entity';
import { ArticlePrice } from 'entities/article-price.entity';
import { Article } from 'entities/article.entity';
import { Feature } from 'entities/feature.entity';
import { CreateArticleDto } from 'src/dtos/article/create.article.dto';
import { UpdateArticleDto } from 'src/dtos/article/update.article.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import {  Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly article:Repository<Article>,

    @InjectRepository(ArticlePrice)
    private readonly articlePrice:Repository<ArticlePrice>,

    @InjectRepository(ArticleFeature)
    private readonly articleFeature:Repository<ArticleFeature>
  ){}
  async create(createArticleDto: CreateArticleDto):Promise<Article | ApiResponse> {
    let newArticle:Article = new Article()
    
    newArticle.name = createArticleDto.name;
    newArticle.categoryId = createArticleDto.categoryId;
    newArticle.excerpt = createArticleDto.excerpt;
    newArticle.description = createArticleDto.description;
    newArticle.status = createArticleDto.status;

    let savedArticle:Article = await this.article.save(newArticle);

    let newArticlePrice:ArticlePrice = new ArticlePrice();
    newArticlePrice.price = createArticleDto.price;
    newArticlePrice.articleId = savedArticle.articleId;

    await this.articlePrice.save(newArticlePrice);

    for(let feature of createArticleDto.features){
        let newFeature:ArticleFeature = new ArticleFeature();
        newFeature.articleId = savedArticle.articleId;
        newFeature.value = feature.value;
        newFeature.featureId = feature.featureId;

        await this.articleFeature.save(newFeature);
    }

    return await this.article.findOne({
        where:{
            articleId:savedArticle.articleId
        },
        relations:[
            'category',
            'articleFeatures',
            'articleFeatures.feature'
        ]
        })
    // Object.assign(article, createArticleDto);
     
    // return new Promise(resolve =>{
    //   this.article.save(article)
    //   .then(data => {
    //     resolve(data);
    //   })
    //   .catch(err =>{
    //     resolve(new ApiResponse('error', -1001));
    //   })
    // });
  }

  findAll() {
    return this.article.find({relations:['articleFeatures', 'articleFeatures.feature','category', 'photos']});
  }

  async findOne(id: number):Promise<Article | ApiResponse> {
    let article  = await this.article.findOne({where:{articleId:id}, relations:['articleFeatures.name', 'category', 'photos']});
    
    if(article === null || article === undefined){
      return new Promise(resolve =>{
        resolve(new ApiResponse('error', -1002));
      })
    }
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto):Promise<Article | ApiResponse> {
    let article  = await this.article.findOne({where:{articleId:id}});
    console.log(article);
  
    if(article === null || article === undefined){
      return new Promise(resolve =>{
        resolve(new ApiResponse('error', -1002));
      })
    }
    Object.assign(article, updateArticleDto);

    return this.article.save(article);
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
