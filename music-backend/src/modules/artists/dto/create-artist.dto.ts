import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ArtistEntity } from "../../../entities/artist.entity";

export class CreateArtistDto{
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

    async toEntity(): Promise<ArtistEntity>{
        const artist = new ArtistEntity()
        artist.name = this.name;
        artist.title = this.title;
        artist.image = this.image;
        return artist;
    } 
}