import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "../../entities/user.entity";
import { UserScope } from "../common/decorators/user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./users.service";
import { UpdateHistoryDto } from "./dto/update-history.dto";


@ApiTags("/api/users")
@Controller('/users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController{
    constructor(private readonly userService: UserService) {}

    @Get('/')
    async getAll(){
        return await this.userService.getAll();
    }

    @Get('/profile')
    async profile(@UserScope() user: UserEntity): Promise<UserEntity>{
        return await this.userService.getUserProfile(user)
    }

    @Post("/")
    async createUser(@Body() dto:CreateUserDto){
        return await this.userService.register(dto);
    }
    @Post("/update-history")
    async updateHistory(@UserScope() user: UserEntity, @Body() dto:UpdateHistoryDto){
        return await this.userService.updateHistory(user.id, dto.musicId)
    }
    @Post("/update-liked")
    async updateLiked(@UserScope() user: UserEntity, @Body() dto:UpdateHistoryDto){
        return await this.userService.updateLiked(user.id, dto.musicId)
    }

    @Put('change-password')
    async changePassword(@UserScope() user: UserEntity, @Body() dto: ChangePasswordDto): Promise<boolean> {
      return await this.userService.changePassword(user, dto);
    }

    @Put('/update-profile')
    async updateProfile(@UserScope() user: UserEntity, @Body() dto: UpdateProfileDto){
        return await this.userService.updateProfile(user, dto)
    }

    
    
}