import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartArticle } from "src/entities/cart-article.entity";
import { Cart } from "src/entities/cart.entity";
import { Repository } from "typeorm";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cart:Repository<Cart>,
    @InjectRepository(CartArticle)
    private readonly cartArticle:Repository<CartArticle>,
    
){}

async getLastActiveCartByUserId(userId:number):Promise<Cart | null>{
    const carts = await this.cart.find({
        where:{
            userId:userId
        },
        order:{
            createdAt:'DESC'
        },
        take:1,
        relations:['order']
    })

    if(!carts || carts.length ===0)
        return null;

    const cart = carts[0];
    if(cart.order !== null)
        return null;

    return cart;
}

async createNewCartForUser(userId:number):Promise<Cart>{
    const newCart:Cart = new Cart();
    newCart.userId = userId;
    return await this.cart.save(newCart);
}
async addArticleToCart(cartId:number, articleId:number, quantity:number):Promise<Cart>{
    let cartArticle = await this.cartArticle.findOne({
        where:{
            cartId:cartId,
            articleId:articleId
        }
    })
    if(!cartArticle){
        cartArticle = new CartArticle();
        cartArticle.articleId = articleId;
        cartArticle.cartId = cartId;
        cartArticle.quantity = quantity;
    }else{
        cartArticle.quantity += quantity;
    }

    await this.cartArticle.save(cartArticle);

    return await this.getById(cartId);
}

async getById(cartId:number):Promise<Cart>{
    return await this.cart.findOne({
        where:{
            cartId:cartId
        },
        relations:[
            'user',
            'cartArticles',
            'cartArticles.article',
            'cartArticles.article.category',
            'cartArticles.article.articlePrices'
        ]
    })
}
async changeQuantity(cartId:number, articleId:number, newQuantity:number){
    let cartArticle = await this.cartArticle.findOne({
        where:{
            cartId:cartId,
            articleId:articleId
        }
    })

    if(cartArticle){    
        cartArticle.quantity = newQuantity;
        if(cartArticle.quantity === 0){
            await this.cartArticle.delete(cartArticle.cartArticleId);
        }else{
            await this.cartArticle.save(cartArticle);
        }
    }
    
    return await this.getById(cartId);
}
}