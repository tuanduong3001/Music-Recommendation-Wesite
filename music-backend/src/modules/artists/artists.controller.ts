import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ArtistService } from "./artists.service";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { ListArtistDto } from "./dto/list-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";

@ApiTags('/api/artists')
@Controller('/artists')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
export class ArtistController{
    constructor(private readonly artistService: ArtistService){}

    @Get("/")
    async getAll(@Query() dto: ListArtistDto){
        return await this.artistService.detail(dto)
    }

    @Post("/")
    async createOne(@Body() dto: CreateArtistDto){
        return await this.artistService.createOne(dto)
    }
    @Put("/:id")
    async UpdateOne(@Body() dto: UpdateArtistDto, @Param('id', ParseIntPipe) id:number){
        return await this.artistService.updateOne(dto, id)
    }
    @Delete("/:id")
    async deleteOne(@Param('id', ParseIntPipe) id:number){
        return await this.artistService.deleteOne(id)
    }
}