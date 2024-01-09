import { HttpStatus } from "@nestjs/common";


export const CustomErrorMessage={
    'USER.EMAIL_NOT_FOUND': {
        messageCode: 'USER.EMAIL_NOT_FOUND',
        description: 'Email not found',
        statusCode: HttpStatus.NOT_FOUND,
      },
      'USER.USER_NOT_FOUND': {
        messageCode: 'USER.USER_NOT_FOUND',
        description: 'User not found',
        statusCode: HttpStatus.NOT_FOUND,
      },
      'USER.EMAIL_EXISTS': {
        messageCode: 'USER.EMAIL_EXISTS',
        description: 'Email exists',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      'USER.EMAIL_NOT_FOUND_PLEASE_TRY_AGAIN': {
        messageCode: 'USER.EMAIL_NOT_FOUND_PLEASE_TRY_AGAIN',
        description: 'Email not found',
        statusCode: HttpStatus.NOT_FOUND,
      },
      //Auth
      'AUTH.WRONG_PASSWORD': {
        messageCode: 'AUTH.WRONG_PASSWORD',
        description: 'Wrong password',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      'AUTH.TOKEN_EXPIRED_FORGOT_PASSWORD': {
        messageCode: 'AUTH.TOKEN_EXPIRED_FORGOT_PASSWORD',
        description: 'Reset Password link is expired',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      'AUTH.TOKEN_EXPIRED': {
        messageCode: 'AUTH.TOKEN_EXPIRED',
        description: 'Token exprired',
        statusCode: HttpStatus.UNAUTHORIZED,
      },

      //Category
      'CATEGORY.CATEGORY_NOT_FOUND': {
        messageCode: 'CATEGORY.CATEGORY_NOT_FOUND',
        description: 'Category not found',
        statusCode: HttpStatus.NOT_FOUND,
      },
      'CATEGORY.NAME_EXISTS': {
        messageCode: 'CATEGORY.NAME_EXISTS',
        description: 'Name exists',
        statusCode: HttpStatus.BAD_REQUEST,
      },

      //Music
      'MUSIC.MUSIC_NOT_FOUND': {
        messageCode: 'MUSIC.MUSIC_NOT_FOUND',
        description: 'Music not found',
        statusCode: HttpStatus.NOT_FOUND,
      },
      'MUSIC.NAME_EXISTS': {
        messageCode: 'MUSIC.NAME_EXISTS',
        description: 'Name exists',
        statusCode: HttpStatus.BAD_REQUEST,
      },

      //Artist
      'ARTIST.ARTIST_NOT_FOUND': {
        messageCode: 'ARTIST.ARTIST_NOT_FOUND',
        description: 'Artist not found',
        statusCode: HttpStatus.NOT_FOUND,
      },
}