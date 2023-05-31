import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCartDto {
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsNumber()
    id: number;
}
