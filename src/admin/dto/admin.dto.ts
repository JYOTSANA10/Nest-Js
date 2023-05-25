import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IntegerDataType } from 'sequelize';

export class AdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;
}

export class UpdateProduct {
  @IsNotEmpty()
  id: number;

  name: string;

  price: number;

  category: string;
}
