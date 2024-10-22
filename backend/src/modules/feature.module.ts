import { Module } from '@nestjs/common';
import { FeatureService } from 'src/services/feature/feature.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from 'src/entities/feature.entity';
import { FeatureController } from 'src/controllers/api/feature.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Feature
    ])
  ],
  controllers: [FeatureController],
  providers: [FeatureService],
})
export class FeatureModule {}
