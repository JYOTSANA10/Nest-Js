import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    image:string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
