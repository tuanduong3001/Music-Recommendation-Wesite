import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { PagingDto } from "../../common/dto/paging.dto";
import { UserFilter, UserGender, UserOrder } from "../enum";



export class ListUserDto extends PagingDto{
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => String(value).trim())
    search: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => String(value).trim())
    email: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => String(value).trim())
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEnum(UserGender)
    @Transform(({ value }) => Number(value))
    gender: UserGender;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEnum(UserFilter)
    filter: UserFilter;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEnum(UserOrder)
    order: UserOrder;
}