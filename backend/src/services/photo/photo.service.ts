import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from 'entities/photo.entity';
import { resolve } from 'path';
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
}
