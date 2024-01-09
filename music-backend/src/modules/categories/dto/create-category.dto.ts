import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CategoryEntity } from "../../../entities/category.entity";
import { IsNotExistName } from "../../common/interceptors/exist-category.interceptor";


export class CreateCategoryDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsNotExistName()
    name:string

    async toEntity(): Promise<CategoryEntity>{
        const category = new CategoryEntity()
        category.name = this.name;
        return category;
    } 
}