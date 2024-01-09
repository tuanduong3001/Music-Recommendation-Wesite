import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { UserRole } from "../users/enum";
import { EmbeddingService } from "./embedding.service";
import { CreateEmbeddingDto } from "./dto/create-embedding.dto";
import { ListEmbeddingDto } from "./dto/list-embedding.dto";



@ApiTags('/api/admin/embedding')
@Controller('/admin/embedding')

export class EmbeddingController{
    constructor(  private readonly embeddingService: EmbeddingService){}

    @Get("/")
    async getAll(@Query() dto:ListEmbeddingDto){
        return await this.embeddingService.getAll(dto);
    }

    @Post("/")
    async addOne(@Body() dto: CreateEmbeddingDto){
        return this.embeddingService.addOne(dto);
    }


}