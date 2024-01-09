import { BadRequestException, Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "../../users/users.service";
import { CustomErrorMessage } from "../constants/error-message";


@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailNotExistConstraint implements ValidatorConstraintInterface {
  constructor(private usersService: UserService) {}

  async validate(email: any, args: ValidationArguments) {
    const user = await this.usersService.findByEmail(email);
    if (user) throw new BadRequestException(CustomErrorMessage['USER.EMAIL_EXISTS']);
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'USER.EMAIL_EXISTS';
  }
}

export function IsNotExistEmail(validationOptions?: ValidationOptions) {
  return function (object: Record<any, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailNotExistConstraint,
    });
  };
}
export class IsEmailExistConstraint implements ValidatorConstraintInterface {
    constructor(private usersService: UserService) {}
  
    async validate(email: any, args: ValidationArguments) {
      const user = await this.usersService.findByEmail(email);
      console.log("user123", user)
      if (!user) throw new BadRequestException(CustomErrorMessage['USER.EMAIL_NOT_FOUND']);
      return true;
    } 
  
    defaultMessage(args: ValidationArguments) {
      return 'USER.EMAIL_NOT_FOUND';
    }
  }
  
  export function IsExistEmail(validationOptions?: ValidationOptions) {
    return function (object: Record<any, any>, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailExistConstraint,
      });
    };
  }

 