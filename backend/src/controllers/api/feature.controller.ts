import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CreateFeatureDto } from '../../dtos/feature/create.feature.dto';
import { UpdateFeatureDto } from '../../dtos/feature/update.feature.dto';
import { FeatureService } from 'src/services/feature/feature.service';
import { Feature } from 'src/entities/feature.entity';
import { ApiResponse } from 'src/misc/api.response.class';

@Controller('api/feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto):Promise<Feature | ApiResponse> {
    return this.featureService.create(createFeatureDto);
  }

  @Get()
  findAll() {
    return this.featureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<Feature | ApiResponse> {
    return this.featureService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateFeatureDto: UpdateFeatureDto):Promise<Feature | ApiResponse> {
    return this.featureService.update(+id, updateFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureService.remove(+id);
  }
}
