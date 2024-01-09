import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryEntity } from "../../entities/category.entity";
import { CustomErrorMessage } from "../common/constants/error-message";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";


@Injectable()
export class CategoryAdminService{
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>
    ){}


    async createCategory(dto:CreateCategoryDto){
        return await this.categoryRepository.save(await dto.toEntity())
    }

    async findOne(categoryId:number):Promise<CategoryEntity>{
     
        const category = await this.categoryRepository.findOne({
          where: {
            id:categoryId
          }
        })
        if(!category) throw new NotFoundException(CustomErrorMessage['CATEGORY.CATEGORY_NOT_FOUND'])
        return category;
      }
  
      async findOneByName(name:string):Promise<CategoryEntity>{

        const category = await this.categoryRepository.findOne({
          where: {
            name
          }
        })
        return category;
      }

      async updateCategory(dto: UpdateCategoryDto, id:number){
        const categoryUpdate = await this.findOne(id);
         await  this.categoryRepository.save(await dto.toEntity(categoryUpdate))
         return true;
      }

      async deleteOne(id:number){
        const category = await this.findOne(id);
        if(!category)  throw new NotFoundException(CustomErrorMessage['CATEGORY.CATEGORY_NOT_FOUND']);
        await this.categoryRepository.delete({id})
        return true;
      }
}