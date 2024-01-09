import { BadRequestException, Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { CategoryAdminService } from "../../categories/categories.admin.service";
import { CategoryService } from "../../categories/categories.service";
import { CustomErrorMessage } from "../constants/error-message";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsNameNotExistConstraint implements ValidatorConstraintInterface {
  constructor(private categoryService: CategoryAdminService) {}

  async validate(name: any, args: ValidationArguments) {
    const category = await this.categoryService.findOneByName(name);
    if (category) throw new BadRequestException(CustomErrorMessage['CATEGORY.NAME_EXISTS']);
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'CATEGORY.NAME_EXISTS';
  }
}

export function IsNotExistName(validationOptions?: ValidationOptions) {
  return function (object: Record<any, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNameNotExistConstraint,
    });
  };
}