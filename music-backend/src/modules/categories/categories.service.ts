import { Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { CategoryEntity } from "../../entities/category.entity";
import { CustomErrorMessage } from "../common/constants/error-message";
import { ListCategoryDto } from "./dto/list-category.dto";



@Injectable()
export class CategoryService{
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>
    ){}

    async getAll(dto:ListCategoryDto){
        const {page, limit, search, name, filter, order} = dto;
        let searchOption = [];
        let orderFilter = null;
        if (search) {
          searchOption = [
            { name: Like(`%${search.trim()}%`)},  
          ];
        }
        if(name){
            searchOption = [{name}]   
        }
        if(filter){
            orderFilter = order ? { [filter]: order } : {[filter] : "ASC"}
          }
        const [data, total] = await this.categoryRepository.findAndCount({
            where: searchOption,
            order:  orderFilter ? orderFilter : {name: "ASC"},
            take: limit,
            skip: (page - 1) * limit,
        })
        return {
            data,
            total,
            currentPage: page,
            totalPage: Math.ceil(total / limit),
          };
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


   
}