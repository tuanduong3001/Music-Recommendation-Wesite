import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { MusicEntity } from "../../entities/music.entity";
import { ListCategoryDto } from "../categories/dto/list-category.dto";
import { CreateMusicDto } from "./dto/create-music.dto";
import { CustomErrorMessage } from "../common/constants/error-message";
import { CategoryAdminService } from "../categories/categories.admin.service";
import { ArtistService } from "../artists/artists.service";
import { EmbeddingService } from "../embedding/embedding.service";
import { UpdateMusicDto } from "./dto/update-music.dto";



@Injectable()

export class MusicService{
    constructor(
        @InjectRepository(MusicEntity)
        private musicRepository: Repository<MusicEntity>,
        private categoryService:CategoryAdminService,
        private artistService:ArtistService,
        private emBeddingSerice: EmbeddingService
    ){}

    async getAll(dto : ListCategoryDto){

      const {page, limit, search, name,categoryId, filter, order} = dto;
        let searchOption = [];
        let orderFilter = null;
        if (search) {
          searchOption = [
            { name: Like(`%${search.trim()}%`)},  
          ];
        }
        if(name){
            searchOption = [{...searchOption,name}]   
        }
        if(categoryId){
          searchOption = [{...searchOption, categoryId: categoryId }]   
      }
        if(filter){
            orderFilter = order ? { [filter]: order } : {[filter] : "ASC"}
          }
        const [data, total] = await this.musicRepository.findAndCount({
            where: searchOption,
            relations:['category', 'artist'],
            order:  orderFilter ? orderFilter : {id: "ASC"},
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

        async create(dto: CreateMusicDto){
          const checkCategory = await this.categoryService.findOne(dto.categoryId);
          const artists = await this.artistService.getManyByIds([...dto.artists]);
          let newDtoMusic = await dto.toEntity();
          newDtoMusic = {...newDtoMusic, artist: artists};
          return await this.musicRepository.save(newDtoMusic)
        }
 
        async findOneByName(name:string){
          const music = await this.musicRepository.findOne({
            where: {
              name
            }
          })
          return music;
        }


        async delete(id:number){
        
          const music = await this.getDetail(id);
          const relation1 = await this.musicRepository
          .createQueryBuilder()
          .relation(MusicEntity, 'users')
          .of(music)
          .loadMany();
        const relation2 = await this.musicRepository
          .createQueryBuilder()
          .relation(MusicEntity, 'liked')
          .of(music)
          .loadMany();
          const relation3 = await this.musicRepository
          .createQueryBuilder() 
          .relation(MusicEntity, 'artist')
          .of(music)
          .loadMany();
          const relation4 = await this.musicRepository
          .createQueryBuilder()
          .relation(MusicEntity, 'embedding')
          .of(music)
          .loadMany();
          if(relation4.length > 0){
            await this.emBeddingSerice.delete(relation4[0].id)

          }
          
          await this.musicRepository
          .createQueryBuilder()
          .relation(MusicEntity, 'users')
          .of(music) 
          .remove( relation1);

          await this.musicRepository
          .createQueryBuilder()
          .relation(MusicEntity, 'liked')
          .of(music)
          .remove( relation2);

          await this.musicRepository
          .createQueryBuilder()
          .relation(MusicEntity, 'artist')
          .of(music)
          .remove( relation3);
          await this.musicRepository.delete({id})
          return true;

          
        }

        async updateMusic(dto:UpdateMusicDto, id:number){
          const music = await this.getDetail(id);
         const artistNumberArr = dto.artists.map((artist:any) => Number(artist))
          const artists = await this.artistService.getManyByIds([...artistNumberArr]);
          const relation3 = await this.musicRepository
          .createQueryBuilder() 
          .relation(MusicEntity, 'artist')
          .of(music)
          .loadMany();
          const relation4 = await this.musicRepository
          .createQueryBuilder()
          .relation(MusicEntity, 'embedding')
          .of(music)
          .loadMany();

   
          if(relation4.length > 0){
            await this.emBeddingSerice.delete(relation4[0].id)

          }
          await this.musicRepository
          .createQueryBuilder()
          .relation(MusicEntity, 'artist')
          .of(music)
          .addAndRemove(artists, relation3);
          let newDtoMusic = await dto.toEntity(music);
          newDtoMusic = {...newDtoMusic, artist: artists};
          delete newDtoMusic['category'];
          return await this.musicRepository.save(newDtoMusic)
        }

        async updateView(id:number){
          const music = await this.getDetail(id);
          const newMusic = {...music,view: Number(music.view + 1)}
          return await this.musicRepository.save(newMusic)
        }
        async updateLiked(id:number){
          const music = await this.getDetail(id);
          const newMusic = {...music,like: Number(music.like + 1)}
          return await this.musicRepository.save(newMusic)
        }

        async getDetail(id:number){
          const music = await this.musicRepository.findOne({
            where: {
              id
            },
            relations:['category', 'artist'],
          })
          if(!music) throw new NotFoundException(CustomErrorMessage['MUSIC.MUSIC_NOT_FOUND'])
          return music;
        }

        async getNewSongs(){
          const data = await this.musicRepository.find({
            relations:['category', 'artist'],
            order: {createdAt: "DESC"},
            take: 10,
        })
        return data;
        }
        async getPopularSongs(){
          const data = await this.musicRepository.find({
            relations:['category', 'artist'],
            order: {view: "DESC"},
            take: 10,
        })
        return data;
        }
        async getTrendingSongs(){
          const data = await this.musicRepository.find({
            relations:['category', 'artist'],
            order: {like: "DESC"},
            take: 10,
        })
        return data;
        }
        
        async getRecommendSongs(id:number){
                 const listSongs = await fetch(`${process.env.REACT_APP_RECOMMEND_URL}/recommend`, {
                    method: "POST",
                  body:JSON.stringify({
                    id_music: id,
                    num_music: 5
                  }),
                  headers: { 'Content-Type': 'application/json' }
                  }).then(res => res.json());
                  const newSongs = await Promise.all(
                    listSongs.map(async (songId:number) => {
                      const song = await this.getDetail(songId);
                      return song;
                    })
                  )
                  return newSongs;
        }
}