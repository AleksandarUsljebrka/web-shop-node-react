export interface CategoryType{
    categoryId:number;
    name:string;
    imagePath:string;
    parentCategoryId:number|null;
}

export interface Articles{
    articleId:number;
    name:string;
    categoryId:number;
    excerpt:string;
    description:string;
    status:'available'|'visible'|'hidden';
    isPromoted:1|0;
    createdAt:Date|string;
    articleFeatures:ArticleFeatures;

}

export interface ArticleFeatures{
        articleFeatureId: number;
        articleId: number;
        featureId: number,
        value: string;
        feature:Feature;
} 

export interface Feature{    
        featureId: number;
        name:string;
        categoryId: number;
    
}