import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Address } from '../types/address';
import { Gender } from '../types/gender';

export class UpdateUserDto {
  @IsOptional()
  @IsDateString()
  birthdate: string;

  @IsOptional()
  @IsBoolean()
  isSubscribe: boolean;

  @IsOptional()
  @IsObject()
  address: Address;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
}
