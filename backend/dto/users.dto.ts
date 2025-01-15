// users dto

import {
  IS_STRONG_PASSWORD,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
