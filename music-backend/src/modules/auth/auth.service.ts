import { BadRequestException, HttpStatus, Injectable, NotFoundException,Req } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../../entities/user.entity";
import { CustomErrorMessage } from "../common/constants/error-message";
import { MailRegisterService } from "../common/service/mail-register.service";
import { hashMatching } from "../common/utility/hash.utility";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { EmailExistDto } from "../users/dto/email.dto";
import { UserRole } from "../users/enum";
import { UserService } from "../users/users.service";
import { AuthTokenOutput } from "./dto/auth-token-output.dto";
import { ChangePasswordForgotDto } from "./dto/change-password-forgot";
import { LoginDto } from "./dto/login.dto";

export interface JWTPayload {
    id: number;
    roles: number;
    email: string;
  }

@Injectable()
export class AuthService{
    constructor(
        private readonly userService: UserService,
         private readonly jwtService: JwtService,
         private readonly mailerService:MailRegisterService
    ){}
      
    handleJwt(user: UserEntity): AuthTokenOutput {
        const payload: JWTPayload = {
          id: user.id,
          roles: user.role,
          email: user.email
        };
    
        return {
          accessToken: this.jwtService.sign(payload, {
            expiresIn: '1d',
          }),
          refreshToken: this.jwtService.sign(payload, {
            expiresIn: '7d',
          }),
        };
      }

    async login(dto: LoginDto, role:UserRole): Promise<AuthTokenOutput>{
        const { password, email } = dto;
        const user = email ? await this.userService.findOneByEmailAndRole(email, role) : null
        if(!user) throw new NotFoundException(CustomErrorMessage['USER.USER_NOT_FOUND']);
        if (!user.password) throw new NotFoundException(CustomErrorMessage['AUTH.WRONG_PASSWORD']);
        const isMatch = await hashMatching(password, user.password);
        if (!isMatch) throw new BadRequestException(CustomErrorMessage['AUTH.WRONG_PASSWORD']);
        const authToken = this.handleJwt(user);
        return authToken;
    }

    async forgotPassword(dto:EmailExistDto):Promise<boolean>{
      const { email } = dto;
      try {
        const user = await this.userService.findByEmail(email);
        if(!user) throw new NotFoundException(CustomErrorMessage['USER.USER_NOT_FOUND'])
        if(email){
          
          await this.mailerService.sendForgotPassword(user)
        }
        return true;
      } catch (error) {
        if (error.status === HttpStatus.NOT_FOUND && email)
        throw new NotFoundException(CustomErrorMessage['USER.EMAIL_NOT_FOUND_PLEASE_TRY_AGAIN']);
      throw error;
      }
    }
    async changePasswordForgot(dto:ChangePasswordForgotDto):Promise<boolean>{
      const {token} = dto;
      if(token){
        const user = await this.userService.findByResetPasswordToken(token)
        if(!user) throw new NotFoundException(CustomErrorMessage['USER.USER_NOT_FOUND'])
        if(Date.now() - user.resetPasswordExpires.getTime() > 0){
          throw new BadRequestException(CustomErrorMessage['TOKEN_EXPIRED_FORGOT_PASSWORD'])
        }
        await this.userService.save(await dto.toEntity(user))
      }
      return true;
    }

    async refreshToken(payload):Promise<AuthTokenOutput>{
      const user = await this.jwtService.verify(payload.refreshToken)
      const data = user.email ? await this.userService.findByEmail(user.email) : null
      if(!data) throw new NotFoundException(CustomErrorMessage['USER.USER_NOT_FOUND']);
      const authToken = this.handleJwt(user);
      await this.userService.addUserToRedis({email: user.email, accessToken: authToken.accessToken})

        return authToken;
    }

    async signUp(dto:CreateUserDto):Promise<AuthTokenOutput>{
     const user =  await this.userService.register(dto)
     const authToken = this.handleJwt(user);
     return authToken;
    }
}