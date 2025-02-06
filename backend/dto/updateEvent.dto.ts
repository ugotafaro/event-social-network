import { IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  image: string;
}
