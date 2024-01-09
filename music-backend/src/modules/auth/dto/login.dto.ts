import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { IsExistEmail } from "../../common/interceptors/exist-email.interceptor";
import { UserRole } from "../../users/enum";


export class LoginDto {
    @ApiProperty({ example: 'user@gmail.com' })
    @IsString()
    @Transform(({ value }) => String(value).trim())
    @IsEmail()
    @IsExistEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(6, 30)
    password: string;
}