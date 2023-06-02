import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IntegerDataType } from 'sequelize';


export class UserDto {

  isdeleted:boolean
 
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  role: string;
  
 


}

export class CategoryDto {

  isdeleted:boolean
 
  // @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

 
}
