import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Like, Repository } from "typeorm";
import { ArtistEntity } from "../../entities/artist.entity";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { ListArtistDto } from "./dto/list-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { CustomErrorMessage } from "../common/constants/error-message";


@Injectable()
export class ArtistService{
    constructor(
        @InjectRepository(ArtistEntity)
        private artistRepository: Repository<ArtistEntity>
    ){}

    async detail(dto:ListArtistDto){
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
        const [data, total] = await this.artistRepository.findAndCount({
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

    async createOne(dto:CreateArtistDto){
        return await this.artistRepository.save(await dto.toEntity())
    }

    async updateOne(dto:UpdateArtistDto, id:number){
      const artistUpdate = await this.artistRepository.findOne({
        where: {
          id
        }
      })
      await  this.artistRepository.save(await dto.toEntity(artistUpdate))
      return true;
    }
    async deleteOne(id:number){
      const artist = await this.artistRepository.findOne({
        where: {
          id
        }
      })
      if(!artist)  throw new NotFoundException(CustomErrorMessage['ARTIST.ARTIST_NOT_FOUND']);
      await this.artistRepository.delete({id})
      return true;
    }

    async getManyByIds(ids: number[]) {
      return this.artistRepository.find({
        where: {
          id: In(ids),
        },
      });
    }
}