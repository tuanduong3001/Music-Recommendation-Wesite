import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsMatchConfirmPasswordConstraint implements ValidatorConstraintInterface {
  validate(confirmedPassword: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return confirmedPassword === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    return 'USER.CONFIRM_PASSWORD_NOT_MATCH';
  }
}

export function MatchConfirmPassword(property: string, validationOptions?: ValidationOptions) {
  return function (object: Record<any, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsMatchConfirmPasswordConstraint,
    });
  };
}