import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  image;

  @IsNotEmpty()
  @IsString()
  category:string

  @IsNotEmpty()
  @IsString()
  description: string;
}
