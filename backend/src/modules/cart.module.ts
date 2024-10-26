import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCartController } from 'src/controllers/api/user.cart.controller';
import { Article } from 'src/entities/article.entity';
import { CartArticle } from 'src/entities/cart-article.entity';
import { Cart } from 'src/entities/cart.entity';
import { Order } from 'src/entities/order.entity';
import { CartService } from 'src/services/cart/cart.service';
import { OrderService } from 'src/services/order/order.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Cart,
      CartArticle,
      Order
    ])
  ],
  controllers: [UserCartController],
  providers: [CartService,OrderService],
  exports:[]
})
export class CartModule {}
