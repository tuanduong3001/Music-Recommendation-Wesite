import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserEntity } from "../../../entities/user.entity";
import { IsNotExistEmail } from "../../common/interceptors/exist-email.interceptor";
import { UserGender } from "../enum";
import * as _ from 'lodash';
export class UpdateProfileDto {  
    @ApiProperty({ example: 'user@gmail.com' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => String(value).trim())
    @IsEmail()
    @IsNotExistEmail()
    email: string;

    @ApiProperty({ example: 'user' })
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
  
    toEntity(user: UserEntity): UserEntity {
      const { email, name, dateOfBirth, gender } = this;
      const dataMerge = _.pickBy(
        {
          email, name, dateOfBirth, gender
        },
        _.identity,
      );
  
      return { ...user, ...dataMerge };
    }
  }