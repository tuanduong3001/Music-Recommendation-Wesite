import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { PagingDto } from "../../common/dto/paging.dto";
import { ArtistFilter, ArtistOrder } from "../enum";


export class ListArtistDto  extends PagingDto{
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
    @IsEnum(ArtistFilter)
    filter: ArtistFilter;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEnum(ArtistOrder)
    order: ArtistOrder;
}