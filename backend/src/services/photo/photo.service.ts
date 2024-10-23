import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageConfig } from 'config/storage.config';
import { Photo } from 'src/entities/photo.entity';
import * as sharp from 'sharp';
import { ApiResponse } from 'src/misc/api.response.class';
import { createQueryBuilder, Repository } from 'typeorm';

@Injectable()
export class PhotoService {
  constructor(@InjectRepository(Photo)
  private readonly photo:Repository<Photo>){}

  add(photo:Photo):Promise<Photo | ApiResponse>{
    return new Promise(resolve=>{
      this.photo.save(photo)
      .then(data => resolve(data))
      .catch(err => resolve(new ApiResponse('error', -4001)));
    })
  }

  async findAll(articalId:number):Promise<Photo[]>{
    try {
      return await this.photo.find({where:{articleId:articalId}});
    } catch (error) {
      throw new Error('Could not retrieve photos');
    }
  }

  findOne(photoId:number, articleId?:number):Promise<Photo>{
    
    return this.photo.findOne({where:{photoId:photoId, ...(articleId ? {articleId:articleId}:{})}});
  }
  async delete(photoId:number){
    return await this.photo.delete({photoId:photoId});
  }
  async resizeImage(photo, resizePhotoSettings){
    const filePath = photo.path;
    const fileName = photo.filename;
    
    const destination = StorageConfig.photo.destination + resizePhotoSettings.directory + fileName;
    
    await sharp(filePath)
    .resize({
      fit:'cover',
      width:resizePhotoSettings.width,
      height:resizePhotoSettings.height,
      background:{
        r:255, g:255, b:255, alpha:0.0
      }
    }).toFile(destination);
    
  }
}
