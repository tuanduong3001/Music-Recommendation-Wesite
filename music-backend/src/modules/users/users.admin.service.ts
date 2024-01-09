import { InjectRedis } from "@nestjs-modules/ioredis";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Redis } from "ioredis";
import { Pagination } from "nestjs-typeorm-paginate";
import { In, Like, Repository } from "typeorm";
import { UserEntity } from "../../entities/user.entity";
import { AddUserToRedisDto } from "../auth/dto/add-user-redis.dto";
import { CustomErrorMessage } from "../common/constants/error-message";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { ListUserDto } from "./dto/list-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRole } from "./enum";
import { UserService } from "./users.service";


@Injectable()
export class UsersAdminService{
    constructor(
        @InjectRepository(UserEntity)
        private userRepository:Repository<UserEntity>,
        private userService: UserService,
        @InjectRedis() private readonly redis: Redis,
    ){}

    async getAllUserNotRoleAdmin(dto:ListUserDto){
      const {page, limit, search, email, name, gender, filter, order} = dto;
     
      let searchOption = [];
      let orderFilter = null;
      if (search) {
        searchOption = [
          { name: Like(`%${search.trim()}%`)},
          { email: Like(`%${search.trim()}%`)},

        ];
      }
      if(email){
        if(searchOption.length === 0) searchOption.push({email})
        else searchOption =  searchOption.map((option)=> ({...option,  email: email}))      
      }
      if(name){
        if(searchOption.length === 0) searchOption.push({name})
        else searchOption =  searchOption.map((option)=> ({...option,  name: name})) 
      }
      if(gender){
        if(searchOption.length === 0) searchOption.push({gender})
        else searchOption =  searchOption.map((option)=> ({...option,  gender: gender})) 
      }
      if(searchOption.length > 0){
        searchOption = searchOption.map((option)=> ({...option,  role: In([UserRole.USER])} ))
      }else{
        searchOption.push({role: In([UserRole.USER])})
      }
      if(filter){
        orderFilter = order ? { [filter]: order } : {[filter] : "ASC"}
      }
      const [data, total] = await this.userRepository.findAndCount({
        where: searchOption,
        relations: ['history', 'history.category'],
        order: orderFilter ? orderFilter : {name: "ASC"},
        take: limit,
        skip: (page - 1) * limit,
      });
  
      return {
        data,
        total,
        currentPage: page,
        totalPage: Math.ceil(total / limit),
      };
    }

    async detail(id:number):Promise<UserEntity>{
      const user = await this.userRepository.findOne({
        where: {
          id,
          role: In([UserRole.USER])
        }
      })
      if(!user) throw new NotFoundException(CustomErrorMessage['USER.USER_NOT_FOUND'])
      return user;
    }

    async updateUser(dto:UpdateUserDto): Promise<boolean>{
      const { userId } = dto;
      const userUpdate = await this.userService.findOne(userId);
       await  this.userRepository.save( dto.toEntity(userUpdate))
       return true;
    }


    async deleteUser(id:number): Promise<boolean>{
      const user = await this.userRepository.findOne({where: {id}})
      if(!user)  throw new NotFoundException(CustomErrorMessage['USER.USER_NOT_FOUND']);
      await this.userRepository.delete({id})
      return true;
    }
}