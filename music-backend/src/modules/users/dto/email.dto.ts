import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString } from "class-validator";
import { IsExistEmail } from "../../common/interceptors/exist-email.interceptor";

export class EmailExistDto {
    @ApiProperty({ example: 'user1@gmail.com' })
    @IsString()
    @Transform(({ value }) => String(value).trim())
    @IsEmail()
    @IsExistEmail()
    email: string;
  
  }
  