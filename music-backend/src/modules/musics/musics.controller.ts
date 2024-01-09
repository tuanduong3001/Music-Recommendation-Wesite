import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MusicService } from "./musics.service";
import { ListCategoryDto } from "../categories/dto/list-category.dto";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";



@ApiTags('/api/musics')
@Controller('/musics')

export class MusicController{
    constructor(private readonly musicService: MusicService){}

    @Get('/')
    async getMusics(@Query() dto: ListCategoryDto){
        return await this.musicService.getAll(dto);
    }

    @Post("/")
    async createMusic(@Body() dto: CreateMusicDto){
        return await this.musicService.create(dto);
    }

    @Get("/:id")
    async getDetailMusic(@Param('id', ParseIntPipe) id:number){
        return await this.musicService.getDetail(id);
    }
    @Put("/:id")
    async updateMusic(@Body() dto:UpdateMusicDto,@Param('id', ParseIntPipe) id:number){
        return await this.musicService.updateMusic(dto,id);
    }
    @Delete("/delete/:id")
    async deleteMusic(@Param('id',ParseIntPipe) id:number){
        return await this.musicService.delete(id);
    }
    @Get("/home/new-songs")
    async getNewSongs(){
        return await this.musicService.getNewSongs();
    }
    @Get("/home/popular-songs")
    async getPopularSongs(){
        return await this.musicService.getPopularSongs();
    }
    @Get("/home/trending-songs")
    async getTrendingSongs(){
        return await this.musicService.getTrendingSongs();
    }

    @Get("/getSongs/recommend/:id")
    async getRecommendSong(@Param('id', ParseIntPipe) id:number){
        return await this.musicService.getRecommendSongs(id);
    }
   
    

}