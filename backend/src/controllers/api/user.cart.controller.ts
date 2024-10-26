import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, SetMetadata, Req } from '@nestjs/common';
import { Request } from 'express';
import { AddArticleToCartDto } from 'src/dtos/cart/add.article.to.cart.dto';
import { EditArticleInCartDto } from 'src/dtos/cart/edit.cart.in.article.dto';
import { Cart } from 'src/entities/cart.entity';
import { Category } from 'src/entities/category.entity';
import { ApiResponse } from 'src/misc/api.response.class';
import { RoleCheckerGuard } from 'src/misc/role.checker.guard';
import { CartService } from 'src/services/cart/cart.service';

@Controller('api/user/cart')
export class UserCartController {
  constructor(private readonly cartService: CartService) {}

  private async getActiveCartByUserId(userId:number):Promise<Cart>{
    let cart = await this.cartService.getLastActiveCartByUserId(userId);
    
    if(!cart){
      cart = await this.cartService.createNewCartForUser(userId);
    }

    return await this.cartService.getById(cart.cartId);
  }
  @Get()
  @UseGuards(RoleCheckerGuard)
  @SetMetadata('allow_to_roles',['user'])
  async findAll(@Req() req:Request):Promise<Cart> {
    return await this.getActiveCartByUserId(req.token.id);
  }
  
  @Post('addToCart')
  @UseGuards(RoleCheckerGuard)
  @SetMetadata('allow_to_roles',['user'])
  async create(@Body() data: AddArticleToCartDto, @Req() req:Request):Promise<Cart> {
    const cart = await this.getActiveCartByUserId(req.token.id);
    return await this.cartService.addArticleToCart(cart.cartId, data.articleId, data.quantity);
  }

  @Put()
  @UseGuards(RoleCheckerGuard)
  @SetMetadata('allow_to_roles',['user'])
  async update(@Body() data: EditArticleInCartDto, @Req()req:Request):Promise<Cart> {
    const cart = await this.getActiveCartByUserId(req.token.id);
    return await this.cartService.changeQuantity(cart.cartId, data.articleId, data.quantity);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string):Promise<Category | ApiResponse> {
  //   return this.categoryService.findOne(+id);
  // }


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoryService.remove(+id);
  // }
}