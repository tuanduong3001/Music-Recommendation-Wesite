import { BadRequestException, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CustomErrorMessage } from "../constants/error-message";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-auth') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.

    return super.canActivate(context);
  }

  // @ts-ignore: Unreachable code error 
  async handleRequest(err, user, info, context: ExecutionContext) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user ) {
     if(info.name === "TokenExpiredError") throw new UnauthorizedException(CustomErrorMessage['AUTH.TOKEN_EXPIRED'])
      throw err || new UnauthorizedException();
    }


    return user;
  }
}