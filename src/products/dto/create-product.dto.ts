import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  image;

  @IsNotEmpty()
  
  category:[]

  @IsNotEmpty()
  @IsString()
  description: string;
}
