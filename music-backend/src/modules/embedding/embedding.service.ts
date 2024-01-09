import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { CategoryEntity } from "../../entities/category.entity";
import { CustomErrorMessage } from "../common/constants/error-message";
import { EmbeddingEntity } from "../../entities/embedding.entity";
import { CreateEmbeddingDto } from "./dto/create-embedding.dto";
import { ListEmbeddingDto } from "./dto/list-embedding.dto";



@Injectable()
export class EmbeddingService{
    constructor(
        @InjectRepository(EmbeddingEntity)
        private embeddingRepository: Repository<EmbeddingEntity>
    ){}


        async getAll(dto:ListEmbeddingDto){
            const {page, limit, search} = dto;
            let searchOption = [];
            let orderFilter = null;
           
            const [data, total] = await this.embeddingRepository.findAndCount({
                order: {id: "ASC"},
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

        async addOne(dto:CreateEmbeddingDto){
            await this.embeddingRepository.save(await dto.toEntity())
        }
        async delete(id:number){
            await this.embeddingRepository.delete({id})
        }
   
}