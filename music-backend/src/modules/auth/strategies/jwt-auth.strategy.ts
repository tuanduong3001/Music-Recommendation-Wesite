import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "../../users/users.service";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from "../auth.service";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  
  constructor(
    private userService: UserService,
 
    ) {
    super({
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true
    });
  } 

  async validate(req,payload: JWTPayload) {  
      const token = req.headers.authorization.split(" ")[1];
      const getTokenFromRedis = await this.userService.getUserAccessTokenFromRedis(payload.email);  
      if (payload === null || token !== getTokenFromRedis) {
        throw new UnauthorizedException();
      }
    return await this.userService.findByEmail(payload.email)
    // return payload;
  }
  
}