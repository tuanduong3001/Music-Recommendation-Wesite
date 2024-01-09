import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "../../entities/user.entity";
import { AuthService } from "../auth/auth.service";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { EmailExistDto } from "./dto/email.dto";
import { ListUserDto } from "./dto/list-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRole } from "./enum";
import { UsersAdminService } from "./users.admin.service";
import { UserService } from "./users.service";


@ApiTags("/api/admin/users")
@Controller('/admin/users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class UsersAdminController{
    constructor(private readonly userService: UserService,
        private readonly userAdminService:UsersAdminService,
        private readonly authService: AuthService
        ) {}

    @Get('/')
    async getAllUser(@Query() dto:ListUserDto){
        return await this.userAdminService.getAllUserNotRoleAdmin(dto);
    }
    @Get('/:userId')
    async detail(@Param('userId', ParseIntPipe) userId:number):Promise<UserEntity>{
        return await this.userAdminService.detail(userId)
    }

    @Put('/update-user')
    async updateUser(@Body() dto:UpdateUserDto){
        return await this.userAdminService.updateUser(dto)
    }

    @Delete('/delete-user/:id')
    async deleteUser(@Param('id', ParseIntPipe) id: number){
        return await this.userAdminService.deleteUser(id)
    }

    @Put('/reset-password')
    async resetPassword(@Body() dto: EmailExistDto): Promise<boolean>{
        return await this.authService.forgotPassword(dto)
    }
    
}