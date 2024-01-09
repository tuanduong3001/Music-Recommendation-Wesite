import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { IsExistEmail } from "../../common/interceptors/exist-email.interceptor";


export class AddUserToRedisDto {
    @ApiProperty({ example: 'superadmin@sotatek.com' })
    @IsString()
    @Transform(({ value }) => String(value).trim())
    @IsEmail()
    @IsExistEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    accessToken: string; 
}