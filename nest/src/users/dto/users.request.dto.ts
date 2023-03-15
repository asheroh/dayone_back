import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UserRequestDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  profileImage: string;

  @IsNotEmpty()
  @IsNumber()
  socialId: number;

  @IsNotEmpty()
  @IsNumber()
  dayCount: number;

  @IsBoolean()
  @IsNotEmpty()
  accessUser: boolean;
}
