import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Article } from 'src/entities/article.entity';
import { CreateArticleDto } from 'src/dtos/article/create.article.dto';
import { UpdateArticleDto } from 'src/dtos/article/update.article.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import { ArticleService } from 'src/services/article/article.service';
import {diskStorage} from 'multer';
import { StorageConfig } from 'config/storage.config';
import { Photo } from 'src/entities/photo.entity';
import { PhotoService } from 'src/services/photo/photo.service';
import filetype from 'magic-bytes.js';
// import * as fileType from 'file-type';
import {unlinkSync, readFileSync } from 'fs';
import { fileTypeFromFile } from 'file-type';

@Controller('api/article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly photoService:PhotoService
) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto):Promise<Article | ApiResponse> {
    return this.articleService.create(createArticleDto);
  }

  @Post(':id/uploadPhoto/')
  @UseInterceptors(
    FileInterceptor('photo',{
        storage:diskStorage({
            destination:StorageConfig.photo.destination,
            filename:(req,file,callback)=>{
                let original:string = file.originalname;
                
                let normalized = original.replace(/\s+/g,'-');
                normalized = normalized.replace(/[^A-z0-9\.\-]/g, '');
                let now = new Date();
                let datePart = now.getFullYear().toString();
                datePart += now.getMonth().toString();
                datePart += now.getDate().toString();

                let random:string = new Array(10).fill(0).map(e=> (Math.random() *9).toFixed(0).toString()).join('');
                let fileName = datePart + '-' + random + '-' + normalized;
                fileName.toLowerCase();
                callback(null,fileName);
            }
        }),
        fileFilter:(req,file,callback) => {
            if(!file.originalname.toLowerCase().match(/\.(jpg|png)$/)){
                callback(null, false);
                req.fileFilterError = "Bad file extension";
                return;
            }
            if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png')))
            {
                callback(null,false);
                req.fileFilterError = "Bad file extension";
                return;
            }

            callback(null, true);
        },
        limits:{
            files:1,
            fileSize:StorageConfig.photo.maxSize
        }
    })
  )
  async uploadPhoto(@Param('id')articleId:number, @UploadedFile() photo, @Req() req):Promise<Photo | ApiResponse>{
    if(req.fileFilterError){
        return new ApiResponse('error', -4002, req.fileFilterError);
    }
    
    if(!photo){
        return new ApiResponse('error', -4002, 'File not uploaded!');
    }
    const fileTypeResult = filetype(readFileSync(photo.path))[0]?.typename;
    if(!fileTypeResult){
        unlinkSync(photo.path);
        return new ApiResponse('error', -4002, "Can not detect file type!");
    }
    if (!StorageConfig.photo.allowedTypes.includes(fileTypeResult)) {
        unlinkSync(photo.path);
        
        return new ApiResponse('error', -4002, "Does not support file type!");

    }

    this.photoService.resizeImage(photo, StorageConfig.photo.resize.small);
    this.photoService.resizeImage(photo,StorageConfig.photo.resize.thumb);

    const newPhoto:Photo = new Photo();
    newPhoto.articleId = articleId;
    newPhoto.imagePath = photo.filename;

    const savedPhoto = await this.photoService.add(newPhoto);
    if(savedPhoto === null || savedPhoto === undefined){
        return new ApiResponse('error', -4001);
    }

    return savedPhoto;
  }
  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<Article | ApiResponse> {
    return this.articleService.findOne(+id);
  }

  @Get(':articalId/photos')
  findAllPhotos(@Param('articalId')articalId:number):Promise<Photo[]>{
    return  this.photoService.findAll(articalId);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto):Promise<Article | ApiResponse> {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }

  @Delete(':articleId/deletePhoto/:photoId')
  async deletePhoto(
    @Param('articleId') articleId:number,
    @Param('photoId') photoId:number){
      const photo = await this.photoService.findOne(photoId, articleId);

      if(!photo){
        return new ApiResponse('error', -5001);
      }
      try{

        unlinkSync(StorageConfig.photo.destination + photo.imagePath);
        unlinkSync(StorageConfig.photo.destination + 
          StorageConfig.photo.resize.small.directory + 
          photo.imagePath);
          unlinkSync(StorageConfig.photo.destination + 
            StorageConfig.photo.resize.thumb.directory + 
            photo.imagePath);
            
      }
      catch(err){
        return new ApiResponse('error',-5001);
      }
      const deleteResult = await this.photoService.delete(photoId);
        
      if(!deleteResult){
        return new ApiResponse('error', -4004, 'Photo not found');
      }
      return new ApiResponse('ok', 0, 'One photo deleted ');

    }
}
