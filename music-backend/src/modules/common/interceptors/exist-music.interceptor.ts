import { BadRequestException, Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { MusicService } from "../../musics/musics.service";
import { CustomErrorMessage } from "../constants/error-message";
import { CategoryAdminService } from "../../categories/categories.admin.service";


@ValidatorConstraint({ async: true })
@Injectable()


export class IsMusicNameNotExistConstraint implements ValidatorConstraintInterface {
  constructor(private musicService: MusicService) {}

  async validate(name: any, args: ValidationArguments) {
    const music = await this.musicService.findOneByName(name);
    if (music) throw new BadRequestException(CustomErrorMessage['MUSIC.NAME_EXISTS']);
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'MUSIC.NAME_EXISTS';
  }
}

export function IsNotExistMusicName(validationOptions?: ValidationOptions) {
  return function (object: Record<any, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMusicNameNotExistConstraint,
    });
  };
}

