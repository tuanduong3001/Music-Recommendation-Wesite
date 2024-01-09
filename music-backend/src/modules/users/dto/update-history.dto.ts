

import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserEntity } from "../../../entities/user.entity";
import { IsNotExistEmail } from "../../common/interceptors/exist-email.interceptor";
import { UserGender } from "../enum";
import * as _ from 'lodash';
export class UpdateHistoryDto {  
    @ApiProperty()
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    musicId: number;

  }