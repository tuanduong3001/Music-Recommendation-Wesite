import { InjectRedis } from "@nestjs-modules/ioredis";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Redis } from "ioredis";
import { In, Repository } from "typeorm";
import { UserEntity } from "../../entities/user.entity";
import { AddUserToRedisDto } from "../auth/dto/add-user-redis.dto";
import { CustomErrorMessage } from "../common/constants/error-message";
import { hashMatching } from "../common/utility/hash.utility";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRole } from "./enum";
import { MusicService } from "../musics/musics.service";


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private userRepository:Repository<UserEntity>,
        private musicService: MusicService,
        @InjectRedis() private readonly redis: Redis,
    ){}

    async getAll(){

    const data = await this.userRepository.find({
      relations: ['history','history.category', 'liked']
    })
    return {
      data
    }; 
    }

    async save(user:UserEntity){
      return await this.userRepository.save(user)
    }
    async findOne(id:number):Promise<UserEntity>{
      const user = await this.userRepository.findOne({where: {id}})
      if(!user)  throw new NotFoundException(CustomErrorMessage['USER.USER_NOT_FOUND']);
      return user;
    }

    async findOneByEmailAndRole(email:string, role:UserRole){
      const user = await this.userRepository.findOne({where: {email, role: In([role])}})
      if(!user)  throw new NotFoundException(CustomErrorMessage['USER.USER_NOT_FOUND']);
      return user;
    }

    async register(dto:CreateUserDto): Promise<UserEntity>{
      return this.userRepository.save(await dto.toEntity())
    }

    async findByEmail(email:string): Promise<UserEntity>{
      return await this.userRepository.findOne({where: {email}})
    }

    async findByResetPasswordToken(token:string): Promise<UserEntity>{
      return await this.userRepository.findOne({where: {resetPasswordToken: token}})
    }

    async addUserToRedis(payload: AddUserToRedisDto) {
      await this.redis.set(`${payload.email}`, payload.accessToken);
      const redisData = await this.redis.get(`${payload.email}`);
      return { redisData };
    } 
    async getUserAccessTokenFromRedis(email: string) {
      const accessToken = await this.redis.get(`${email}`);
      if (!accessToken) {
        throw new UnauthorizedException();
      }
      return accessToken;
    }

    async changePassword(user: UserEntity, dto: ChangePasswordDto): Promise<boolean> {
      const { currentPassword, newPassword } = dto;
      if (currentPassword === newPassword) {
        throw new BadRequestException(
          CustomErrorMessage['USER.NEW_PASSWORD_CAN_NOT_BE_THE_SAME_AS_OLD_PASSWORD'],
        );
      }
      const checkOldPassword = await hashMatching(currentPassword, user.password);
      if (!checkOldPassword) {
        throw new BadRequestException(CustomErrorMessage['USER.OLD_PASSWORD_INCORRECT']);
      }
  
      await this.userRepository.save(await dto.toEntity(user));
      return true;
    }

    async getUserProfile(user:UserEntity): Promise<UserEntity>{
      const result = await this.userRepository.findOne(
        {where: {id: user.id},
        relations: ['history', 'history.artist', 'liked', 'liked.category', 'liked.artist']
      }
        
        )
      if(!result)  throw new NotFoundException(CustomErrorMessage['USER.USER_NOT_FOUND']);
      return result;
    }


    async updateProfile(user:UserEntity, dto: UpdateProfileDto): Promise<boolean>{
      await this.userRepository.save(dto.toEntity(user))
      return true;
    }

    async updateResetToken(user:UserEntity): Promise<boolean>{
      await this.userRepository.save(user)
      return true;
    }

    async updateHistory(userId:number, musicId:number){
      const user = await this.findOne(userId);
      const music = await this.musicService.getDetail(musicId)
      await this.musicService.updateView(musicId)
      const relation4 = await this.userRepository.createQueryBuilder().relation(UserEntity, "history").of(user).loadMany()
      
      await this.userRepository.createQueryBuilder().relation(UserEntity, "history").of(user).addAndRemove(music, relation4.filter(item => item.id === musicId))
    }
    async updateLiked(userId:number, musicId:number){
      const user = await this.findOne(userId);
      const music = await this.musicService.getDetail(musicId)
      await this.musicService.updateLiked(musicId)
      const relation4 = await this.userRepository.createQueryBuilder().relation(UserEntity, "liked").of(user).loadMany()
      
      await this.userRepository.createQueryBuilder().relation(UserEntity, "liked").of(user).addAndRemove(music, relation4.filter(item => item.id === musicId))
      
    }
}