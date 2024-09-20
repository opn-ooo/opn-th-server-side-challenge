import {
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsStrongPassword()
  newPassword: string;

  @IsString()
  @IsStrongPassword()
  confirmPassword: string;
}
