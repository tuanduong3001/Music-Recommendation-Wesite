import { MailerModule } from "@nestjs-modules/mailer";
import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../entities/user.entity";
import { MailRegisterService } from "../common/service/mail-register.service";
import { UserModule } from "../users/users.module";
import { UserService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtStrategy } from "./strategies/jwt-auth.strategy";
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { JwtRefreshStrategy } from "./strategies/jwt-refresh-token";
import { AdminAuthController } from "./auth.admin.controller";




@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: process.env.JWT_EXPIRED_TIME },
          }),
          forwardRef(() => UserModule), 
          MailerModule.forRoot({
            transport:{
              host: 'smtp.gmail.com',
            secure: false,
            auth: {
              user:  process.env.GMAIL_USER,
              pass: process.env.GMAIL_PASSWORD,
            }
            },
            defaults: {
              from: '"nest-modules" <noreply@gmail.com>',
            },
            template: {
              dir: __dirname + '/test.ejs',
              adapter: new EjsAdapter(),
              options: {
                strict: true,
              },
            },
          }),
          TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [AuthController, AdminAuthController],
    providers: [AuthService, UserService, jwtStrategy, JwtRefreshStrategy, MailRegisterService],
    exports: [AuthService,MailRegisterService],
})

export class AuthModule{}