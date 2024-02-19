import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  birtDate: Date;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsBoolean()
  subscribe;
}
