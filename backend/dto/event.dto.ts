import {
  IS_STRONG_PASSWORD,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class EventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   date: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   location: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   creator: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   likes: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   image: string;
}
