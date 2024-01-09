import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { UserRole } from "../users/enum";
import { CategoryAdminService } from "./categories.admin.service";
import { CategoryService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { ListCategoryDto } from "./dto/list-category.dto";
import { CategoryEntity } from "../../entities/category.entity";
import { UpdateCategoryDto } from "./dto/update-category.dto";


@ApiTags('/api/admin/categories')
@Controller('/admin/categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
export class CategoryAdminController{
    constructor(  private readonly categoryService: CategoryService,
        private readonly categoryAdminService: CategoryAdminService){}

    @Get("/")
    async getAll(@Query() dto: ListCategoryDto){
        return await this.categoryService.getAll(dto);
    }
    @Get("/:categoryId")
    async getOne(@Param("categoryId", ParseIntPipe) categoryId:number): Promise<CategoryEntity>{
        return await this.categoryAdminService.findOne(categoryId);
    }

    @Post("/")
    async createCategory(@Body() dto:CreateCategoryDto){
        return await this.categoryAdminService.createCategory(dto)
    }

    @Put("/update/:id")
    async updateCategory(@Body() dto:UpdateCategoryDto, @Param('id', ParseIntPipe) id: number){
        return await this.categoryAdminService.updateCategory(dto, id)
    }
    @Delete("/delete-category/:id")
    async deleteCategory( @Param('id', ParseIntPipe) id: number){
        return await this.categoryAdminService.deleteOne(id)
    }


}