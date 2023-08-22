import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsString()
  @IsUrl()
  link: string;

  @IsString()
  @IsUrl()
  image: string;

  @IsString()
  @IsOptional()
  @Length(1, 1024)
  description?: string;

  @IsString()
  price: number;
}
