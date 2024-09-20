import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsObject,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Address } from '../types/address';
import { Gender } from '../types/gender';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  name: string;

  @IsDateString()
  birthdate: string;

  @IsBoolean()
  isSubscribe: boolean;

  @IsObject()
  address: Address;

  @IsEnum(Gender)
  gender: Gender;
}
