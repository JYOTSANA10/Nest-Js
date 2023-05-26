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

 
  isdeleted:boolean

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;
}

export class UserDto {

  isdeleted:boolean
 
  // @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  role: string;
  
  @IsNotEmpty()

  permissions: string;


}

export class CategoryDto {

  isdeleted:boolean
 
  // @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

 
}
