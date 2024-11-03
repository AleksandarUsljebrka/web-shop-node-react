export interface CategoryType{
    categoryId:number;
    name:string;
    imagePath:string;
    parentCategoryId:number|null;
    articles:Article[] | null;
    categories:CategoryType[] | null;
}

export interface Article{
    articleId:number;
    name:string;
    categoryId:number;
    excerpt:string;
    description:string;
    status:'available'|'visible'|'hidden';
    isPromoted:1|0;
    createdAt:Date|string;
    articleFeatures:ArticleFeatures[]|null;
    articlePrices:ArticlePrice[]|null;
    photos:Photo[];
}

//-------------------------------------
export interface ArticlePrice{
    articlePriceId: number,
    articleId: number;
    price: string;
    createdAt: Date | string;
}

//-------------------------------------
export interface ArticleFeatures{
        articleFeatureId: number;
        articleId: number;
        featureId: number,
        value: string;
} 

export interface Feature{    
        featureId: number;
        name:string;
        categoryId: number;
    
}
export interface Photo{
    photoId:number;
    articleId:number;
    imagePath:string;
}