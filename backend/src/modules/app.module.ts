import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'src/entities/administrator.entity';
import { AdministratorService } from '../services/administrator/administrator.service';
import { ArticleFeature } from 'src/entities/article-feature.entity';
import { ArticlePrice } from 'src/entities/article-price.entity';
import { Article } from 'src/entities/article.entity';
import { CartArticle } from 'src/entities/cart-article.entity';
import { Cart } from 'src/entities/cart.entity';
import { Category } from 'src/entities/category.entity';
import { Feature } from 'src/entities/feature.entity';
import { Order } from 'src/entities/order.entity';
import { Photo } from 'src/entities/photo.entity';
import { User } from 'src/entities/user.entity';
import { AdministratorController } from '../controllers/api/administrator.controller';
import { CategoryModule } from './category.module';
import { ArticleModule } from './article.module';
import { AdministratorModule } from './administrator.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { FeatureModule } from './feature.module';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.host,
      database: DatabaseConfiguration.database,
      port:3306,
      username:DatabaseConfiguration.username,
      password:DatabaseConfiguration.password,
      entities:[
        Administrator,
        ArticleFeature,
        ArticlePrice,
        Article,
        CartArticle,
        Cart,
        Category,
        Feature,
        Order,
        Photo,
        User
      ]
    }),
    AdministratorModule,
    CategoryModule,
    ArticleModule,
    FeatureModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .exclude('auth/*')
    .forRoutes('api/*');
  }
}
