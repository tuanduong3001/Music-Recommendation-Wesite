import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistEntity } from "../../entities/artist.entity";
import { ArtistController } from "./artists.controller";
import { ArtistService } from "./artists.service";

@Module({
    imports: [TypeOrmModule.forFeature([ArtistEntity])],
    controllers: [ArtistController],
    providers: [ArtistService]
})
export class ArtistModule{}