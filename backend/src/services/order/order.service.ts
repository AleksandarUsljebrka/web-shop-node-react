import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartArticle } from 'src/entities/cart-article.entity';
import { Cart } from 'src/entities/cart.entity';
import { Order } from 'src/entities/order.entity';
import { ApiResponse } from 'src/misc/api.response.class';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly order: Repository<Order>,
    @InjectRepository(Cart)
    private readonly cart: Repository<Cart>,
  ) {}

  async add(cartId: number): Promise<Order | ApiResponse> {
    const order = await this.order.findOne({ where: { cartId: cartId } });

    if (order) {
        return new ApiResponse(
            'error',
            -7001,
            'An order has already been created.',
        );
    }
    console.log("order:", order);
    const cart = await this.cart.findOne({
      where: { cartId: cartId },
      relations: ['cartArticles'],
    });

    if (!cart) {
      return new ApiResponse('error', -7002, 'No such cart found');
    }
    if (cart.cartArticles.length === 0) {
      return new ApiResponse('error', -7003, 'Cart is empty');
    }

    const newOrder: Order = new Order();
    newOrder.cartId = cartId;
    const savedOrder = await this.order.save(newOrder);

    return await this.order.findOne({
      where: { orderId: savedOrder.orderId },
      relations: [
        'cart',
        'cart.user',
        'cart.cartArticles',
        'cart.cartArticles.article',
        'cart.cartArticles.article.category',
        'cart.cartArticles.article.articlePrices'
    ],
    });
  }
}
