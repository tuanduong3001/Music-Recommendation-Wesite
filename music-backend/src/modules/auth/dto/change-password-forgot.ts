import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { UserEntity } from "../../../entities/user.entity";
import { MatchConfirmPassword } from "../../common/interceptors/is-match-password.interceptor";
import { hashPassword } from "../../common/utility/hash.utility";

export class ChangePasswordForgotDto  {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    token: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(6, 30)
    newPassword: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MatchConfirmPassword('newPassword')
    confirmedNewPassword: string;
  
    async toEntity(user: UserEntity): Promise<UserEntity> {
      user.password = await hashPassword(this.newPassword);
      user.resetPasswordExpires = null;
      user.resetPasswordToken = null;
      console.log("user:", user)
      return user;
    }
  }
  