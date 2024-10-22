import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFeatureDto } from 'src/dtos/feature/create.feature.dto';
import { UpdateFeatureDto } from 'src/dtos/feature/update.feature.dto';
import { Feature } from 'src/entities/feature.entity';
import { ApiResponse } from 'src/misc/api.response.class';
import { Repository } from 'typeorm';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature)
    private readonly feature:Repository<Feature>
  ){}
  create(createFeatureDto: CreateFeatureDto):Promise<Feature | ApiResponse> {
    let feature:Feature = new Feature();

    Object.assign(feature, createFeatureDto);
     
    return new Promise(resolve =>{
      this.feature.save(feature)
      .then(data => {
        resolve(data);
      })
      .catch(err =>{
        resolve(new ApiResponse('error', -1001));
      })
    });
  }

  findAll() {
    return this.feature.find();
  }

  async findOne(id: number):Promise<Feature | ApiResponse> {
    let feature  = await this.feature.findOne({where:{featureId:id}});
    
    if(feature === null || feature === undefined){
      return new Promise(resolve =>{
        resolve(new ApiResponse('error', -1002));
      })
    }
    return feature;
  }

  async update(id: number, updateFeatureDto: UpdateFeatureDto):Promise<Feature | ApiResponse> {
    let feature  = await this.feature.findOne({where:{featureId:id}});
 
    if(feature === null || feature === undefined){
      return new Promise(resolve =>{
        resolve(new ApiResponse('error', -1002));
      })
    }
    Object.assign(feature, updateFeatureDto);

    return this.feature.save(feature);
  }

  remove(id: number) {
    return `This action removes a #${id} feature`;
  }
}
