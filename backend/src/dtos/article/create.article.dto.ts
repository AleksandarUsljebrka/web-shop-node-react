import { ArticleStatusEnum } from "src/misc/enums/article.status.enum";
export class CreateArticleDto {
    name:string;
    categoryId:number;
    excerpt:string;
    description:string;
    status:ArticleStatusEnum;
    price:number;
    features:{
        featureId:number;
        value:string;
    }[]
}
