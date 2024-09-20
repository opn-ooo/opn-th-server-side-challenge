import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/reset-password.dto';

import { UserModel } from '../users/serializers/user.model';
import { users } from '../seed';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      return new UserModel(user);
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async resetPassword(userId: number, dto: ResetPasswordDto) {
    if (dto.confirmPassword !== dto.newPassword) {
      throw new BadRequestException(
        'new password mismatch with confirm password',
      );
    }
    const userIdx = users.findIndex((u) => u.id == userId);
    if (userIdx < 0) {
      throw new BadRequestException('user not found');
    }
    if (users[userIdx].password !== dto.password) {
      throw new BadRequestException('password is mismatch');
    }
    users[userIdx].password = dto.newPassword;
    return {
      message: 'reset password success',
    };
  }
}
