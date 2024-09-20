import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserModel } from './serializers/user.model';
import { users } from '../seed';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const exist = users.find((user) => user.email === createUserDto.email);
    if (exist) {
      throw new BadRequestException('user already existed');
    }
    users.push({ id: users.length + 1, ...createUserDto });
    return new UserModel(createUserDto);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userIdx = users.findIndex((user: UserEntity) => user.id === id);
    users[userIdx] = { ...users[userIdx], ...updateUserDto };
    return updateUserDto;
  }

  findAll() {
    return users.map((u) => new UserModel(u));
  }

  findOne(id: number) {
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return new UserModel(user);
  }

  findOneByEmail(email: string) {
    const user = users.find((u) => u.email === email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  remove(id: number) {
    const prev = users.length;
    const userIdx = users.findIndex((user: UserEntity) => user.id === id);
    if (userIdx > -1) {
      users.splice(userIdx, 1);
    }
    const curr = users.length;
    return { delete: prev - curr };
  }
}
