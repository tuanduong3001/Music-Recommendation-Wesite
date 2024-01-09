import { Body, Controller, Get, Post, Put, Req, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { ChangePasswordDto } from "../users/dto/change-password.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { EmailExistDto } from "../users/dto/email.dto";
import { UserRole } from "../users/enum";
import { UserService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { AuthTokenOutput } from "./dto/auth-token-output.dto";
import { ChangePasswordForgotDto } from "./dto/change-password-forgot";
import { LoginDto } from "./dto/login.dto";


@ApiTags('/api/admin/auth')
@Controller('admin/auth')
export class AdminAuthController{
    constructor(private readonly authService:AuthService,
      private readonly userService:UserService
      ){}

    @Post('login')
    async loginByAdmin(@Body() dto: LoginDto): Promise<AuthTokenOutput> {
      const token = await this.authService.login(dto, 2);
        await this.userService.addUserToRedis({email: dto.email, accessToken: token.accessToken})
        return token
      }

    //   @Post('sign-up')
    //   async signUp(@Body() dto: CreateUserDto): Promise<AuthTokenOutput>{
    //     const token = await this.authService.signUp(dto);
    //     await this.userService.addUserToRedis({email: dto.email, accessToken: token.accessToken})
    //     return token
    //   }
    
    //   @Post('forgot-password')
    //   async forgotPassword(@Body() dto: EmailExistDto):Promise<boolean>{
    //     return await this.authService.forgotPassword(dto)
    //   }

    //   @Put('change-password-forgot')
    //   async changePasswordForgot(@Body() dto:ChangePasswordForgotDto):Promise<boolean>{
    //     return await this.authService.changePasswordForgot(dto)
    //   }

    //   @Post('refresh-token')
    //   @ApiBearerAuth()
    //   @UseGuards(AuthGuard('jwt-refresh'))
    //   async refreshToken(@Request() req){
    //     return await this.authService.refreshToken(req.user)
    //   }

}