import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.UserRepository.save(createUserDto);
  }

  async findMany(search: { query: string }) {
    let users: User[];

    users = await this.UserRepository.find({
      where: { email: search.query },
    });

    if (users.length < 1) {
      users = await this.UserRepository.find({
        where: { username: search.query },
      });
    }

    return users;
  }

  async findWishes(id: number) {
    const user = await this.UserRepository.findOne({
      where: {
        id,
      },
      relations: {
        wishes: true,
      },
    });

    return user.wishes;
  }

  findOne(id): Promise<User> {
    return this.UserRepository.findOne({
      where: { id },
      relations: {
        wishes: true,
        offers: true,
        // wishlists: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, ...rest } = updateUserDto;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.UserRepository.update(id, {
        password: hashedPassword,
        ...rest,
      });
    } else {
      await this.UserRepository.update(id, rest);
    }
  }

  remove(id: number) {
    return this.UserRepository.delete({ id });
  }

  async findByUsername(username: string) {
    const user = await this.UserRepository.findOneBy({ username });

    return user;
  }
}
