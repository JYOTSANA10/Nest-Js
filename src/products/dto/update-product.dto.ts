import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  price: number;

  image;

  @IsNotEmpty()
 
  category: [];

  @IsNotEmpty()
  @IsString()
  description: string;
}
