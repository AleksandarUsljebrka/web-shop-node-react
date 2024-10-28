import { ArticleStatusEnum } from 'src/misc/enums/article.status.enum';
import * as Validator from 'class-validator';

export class CreateArticleDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(5, 128)
  name: string;

  categoryId: number;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10, 255)
  excerpt: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(64, 5000)
  description: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.IsEnum(ArticleStatusEnum)
  status: ArticleStatusEnum;

  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
  price: number;
  features: {
    featureId: number;
    value: string;
  }[];
}
