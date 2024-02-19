import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/chang-password.dto';
const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  async create(createUserDto: CreateUserDto) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(createUserDto.password, salt, async function (err, hash) {
        // Store hash in your password DB.
        const res: CreateUserDto = {
          ...createUserDto,
          password: hash,
        };
        return await this.userRepository.save(res);
      });
    });
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    const res = {
      email: user.email,
      name: user.name,
      age: this.getAge(user.birtDate),
      gender: user.gender,
      isSubscribe: user.subscribe,
    };
    return res;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = new User();
    user.birtDate = updateUserDto.birtDate;
    user.gender = updateUserDto.gender;
    user.address = updateUserDto.address;
    user.subscribe = updateUserDto.subscribe;
    user.id = id;
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    return await this.userRepository.delete({ id });
  }

  async login(body: LoginUserDto) {
    const user = await this.userRepository.findOneBy({
      email: body.email,
    });
    if (user) {
      const hash = user.password;
      bcrypt.compare(body.password, hash, function (err, result) {
        if (result) {
          return 'Login Success';
        } else {
          return 'Your email or password is wrong';
        }
      });
    }
    // return await this.userRepository.delete({ id });
  }

  async changePassword(body: ChangePasswordDto, id) {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (user) {
      const hash = user.password;
      bcrypt.compare(body.password, hash, function (err, result) {
        if (result && body.confirmPassword === body.newPassword) {
          bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(body.newPassword, salt, async function (err, hash) {
              // Store hash in your password DB.
              const res = {
                ...user,
                password: hash,
              };
              return await this.userRepository.save(res);
            });
          });
          return 'Login Success';
        } else {
          return 'Your email or password is wrong';
        }
      });
    }
    return 'Something Wrong with user';
  }

  private getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
