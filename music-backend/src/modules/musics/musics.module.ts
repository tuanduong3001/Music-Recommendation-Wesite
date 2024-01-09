import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MusicEntity } from "../../entities/music.entity";
import { MusicController } from "./musics.controller";
import { MusicService } from "./musics.service";
import {  IsMusicNameNotExistConstraint } from "../common/interceptors/exist-music.interceptor";
import { CategoryAdminService } from "../categories/categories.admin.service";
import { CategoryEntity } from "../../entities/category.entity";
import { ArtistService } from "../artists/artists.service";
import { ArtistEntity } from "../../entities/artist.entity";
import { EmbeddingService } from "../embedding/embedding.service";
import { EmbeddingEntity } from "../../entities/embedding.entity";




@Module({
    imports:[TypeOrmModule.forFeature([MusicEntity, CategoryEntity, ArtistEntity, EmbeddingEntity])],
    controllers: [MusicController],
    providers: [MusicService,EmbeddingService, IsMusicNameNotExistConstraint, CategoryAdminService, ArtistService]
})

export class MusicModule{}