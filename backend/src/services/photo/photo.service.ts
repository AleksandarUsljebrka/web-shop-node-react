import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageConfig } from 'config/storage.config';
import { Photo } from 'entities/photo.entity';
import * as sharp from 'sharp';
import { ApiResponse } from 'src/misc/api.response.class';
import { Repository } from 'typeorm';

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
  async createSmallImage(photo){
    const filePath = photo.path;
    const fileName = photo.filename;

    const destination = StorageConfig.photoDestination + '/small/'+fileName;

    await sharp(filePath)
    .resize({
      fit:'cover',
      width:StorageConfig.photoSmallSize.width,
      height:StorageConfig.photoSmallSize.height,
      background:{
        r:255, g:255, b:255, alpha:0.0
      }
    }).toFile(destination);
  }
  async createThumbImage(photo){
    const filePath = photo.path;
    const fileName = photo.filename;

    const destination = StorageConfig.photoDestination + '/thumb/'+fileName;

    await sharp(filePath)
    .resize({
      fit:'cover',
      width:StorageConfig.photoThumbSize.width,
      height:StorageConfig.photoThumbSize.height,
      background:{
        r:255, g:255, b:255, alpha:0.0
      }
    }).toFile(destination);
  
  }
}
