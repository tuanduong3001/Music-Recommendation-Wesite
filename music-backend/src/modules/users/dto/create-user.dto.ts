import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, Length, ValidateIf } from "class-validator";
import { UserEntity } from "../../../entities/user.entity";
import {  IsNotExistEmail, IsExistEmail } from "../../common/interceptors/exist-email.interceptor";
import { hashPassword } from "../../common/utility/hash.utility";
import { UserGender } from "../enum";



export class CreateUserDto{
    @ApiProperty({ example: 'user1@gmail.com' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => String(value).trim())
    @IsEmail()
    @IsNotExistEmail()
    email: string;

    @ApiProperty({ example: 'user1' })
    @IsString()
    @IsNotEmpty()
    name:string; 

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    dateOfBirth:Date;

    @ApiProperty({ example: 1 })
    @IsEnum(UserGender)
    @IsNotEmpty()
    gender:UserGender;

    @ApiProperty({ example: '123456' })
    @IsString()
    @IsNotEmpty()
    @Length(6, 30)
    password:string;

    async toEntity(): Promise<UserEntity> {
        const user = new UserEntity();
    
        user.email = this.email;
        user.name = this.name;
        user.gender = this.gender;
        user.dateOfBirth = this.dateOfBirth;
        user.avatar = 'https://static.netpop.app/img/avatar-logout.png';
        user.password = await hashPassword(this.password);
        return user;
      }
}