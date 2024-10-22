import { ArticleStatusEnum } from "src/misc/enums/article.status.enum";

export class UpdateArticleDto  {
    name:string;
    categoryId:number;
    excerpt:string;
    description:string;
    status:ArticleStatusEnum;
    isPromoted:number;
    price:number;
    features:{
        featureId:number;
        value:string;
    }[]
}
