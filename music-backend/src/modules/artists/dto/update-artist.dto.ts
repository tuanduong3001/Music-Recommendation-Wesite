import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ArtistEntity } from "../../../entities/artist.entity";


export class UpdateArtistDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image:string

    async toEntity(artist: ArtistEntity): Promise<ArtistEntity>{
        return {...artist, name: this.name, title: this.title, image: this.image};
    } 
}