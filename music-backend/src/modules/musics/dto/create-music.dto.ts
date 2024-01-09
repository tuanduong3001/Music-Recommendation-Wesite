import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { MusicEntity } from "../../../entities/music.entity";
import {  IsNotExistMusicName } from "../../common/interceptors/exist-music.interceptor";


export class CreateMusicDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsNotExistMusicName()
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

    async toEntity(): Promise<MusicEntity>{
        const music = new MusicEntity()
        music.name = this.name;
        music.categoryId = this.categoryId;
        music.source = this.source;
        music.image = this.image;
        
        return music;
    } 
}