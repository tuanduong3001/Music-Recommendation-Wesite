import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "../../../entities/user.entity";
import * as crypto from 'crypto'
import { UserService } from "../../users/users.service";
import * as ejs from 'ejs';
import * as path from "path";

@Injectable()
export class MailRegisterService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly userService:UserService
      ) {}

    async sendForgotPassword(user:UserEntity){
        const buf =  crypto.randomBytes(20);
        const token = buf.toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = new Date(Date.now() + 3600000)
        console.log("user:", user)
         await this.userService.updateResetToken(user);
         const data = await ejs.renderFile(
            path.join(__dirname + '/../template/forgot-password.ejs'),
          { name: user.name , authencation_url: `http://localhost:5000/reset/${user.resetPasswordToken}`},
        );
        var mainOptions = {
            from: '"Reset Password" bacdo0122@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            html: data,
          };
         await this.mailerService.sendMail(mainOptions).catch(e => {
            console.log('error send mail to verify forgot password', e);
          });;
    }

}