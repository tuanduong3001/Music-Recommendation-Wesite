import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CategoryEntity } from "../../../entities/category.entity";
import { IsNotExistName } from "../../common/interceptors/exist-category.interceptor";
import { EmbeddingEntity } from "../../../entities/embedding.entity";
import { Blob } from "buffer";


export class CreateEmbeddingDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    musicId:number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    embedding:string;

    async toEntity(): Promise<EmbeddingEntity>{
        const embedding = new EmbeddingEntity()
        embedding.musicId = this.musicId;
        embedding.embedding = this.embedding;
        return embedding;
    } 
}