import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNotExistMusicName } from "../../common/interceptors/exist-music.interceptor";
import { MusicEntity } from "../../../entities/music.entity";
import { ArtistEntity } from "../../../entities/artist.entity";


export class UpdateMusicDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    categoryId:number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    source:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image:string

    @ApiProperty()
    @IsString({
      each: true,
    })
    artists: number[];

    async toEntity(music:any){        
        return {...music, name: this.name, categoryId: Number(this.categoryId),source: this.source,image: this.image,artist: this.artists};
    } 
}