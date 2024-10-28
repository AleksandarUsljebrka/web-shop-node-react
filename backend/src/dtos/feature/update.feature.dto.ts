import * as Validator from 'class-validator';

export class UpdateFeatureDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(5, 32)
  name: string;
  categoryId: number;
}
