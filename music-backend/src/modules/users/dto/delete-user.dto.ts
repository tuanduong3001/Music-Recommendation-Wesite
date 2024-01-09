import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";


export class DeleteUserDto{
    @ApiProperty()
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}