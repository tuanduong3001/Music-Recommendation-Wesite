import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IsNotExistName } from "../../common/interceptors/exist-category.interceptor";
import { CategoryEntity } from "../../../entities/category.entity";


export class UpdateCategoryDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name:string

    async toEntity(category: CategoryEntity): Promise<CategoryEntity>{
        return {...category, name: this.name};
    } 
}