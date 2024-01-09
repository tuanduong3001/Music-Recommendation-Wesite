import { ApiProperty } from "@nestjs/swagger";
import { PagingDto } from "../../common/dto/paging.dto";
import { IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";



export class ListEmbeddingDto  extends PagingDto{
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => String(value).trim())
    search: string;

}