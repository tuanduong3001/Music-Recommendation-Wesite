import { Body, Controller, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CategoryService } from "./categories.service";
import { ListCategoryDto } from "./dto/list-category.dto";
import { CategoryEntity } from "../../entities/category.entity";


@ApiTags('/api/categories')
@Controller('/categories')
export class CategoryController{
    constructor(private readonly categoryService: CategoryService){}

    @Get("/")
    async getAll(@Query() dto: ListCategoryDto){
        return await this.categoryService.getAll(dto);
    }
    @Get("/:categoryId")
    async getOne(@Param("categoryId", ParseIntPipe) categoryId:number): Promise<CategoryEntity>{
        return await this.categoryService.findOne(categoryId);
    }
}