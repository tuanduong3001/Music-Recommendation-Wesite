import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { PagingDto } from "../../common/dto/paging.dto";
import { CategoryFilter, CategoryOrder } from "../enum";


export class ListCategoryDto  extends PagingDto{
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => String(value).trim())
    search: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => String(value).trim())
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    categoryId: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEnum(CategoryFilter)
    filter: CategoryFilter;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEnum(CategoryOrder)
    order: CategoryOrder;
}