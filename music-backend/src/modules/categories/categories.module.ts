import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "../../entities/category.entity";
import { CategoryAdminController } from "./categories.admin.controller";
import { CategoryAdminService } from "./categories.admin.service";
import { CategoryController } from "./categories.controller";
import { CategoryService } from "./categories.service";
import { IsNameNotExistConstraint } from "../common/interceptors/exist-category.interceptor";




@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    controllers: [CategoryController, CategoryAdminController],
    providers: [CategoryService, CategoryAdminService, IsNameNotExistConstraint]
})
export class CategoryModule{}