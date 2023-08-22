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

  findMany(search: string): Promise<User[]> {
    const queryBuilder = this.UserRepository.createQueryBuilder('user');

    if (search) {
      queryBuilder
        .where('user.username LIKE :search', { search: `%${search}%` })
        .orWhere('user.email LIKE :search', { search: `%${search}%` });
    }

    return queryBuilder.getMany();
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
    console.log(user);

    return user.wishes;
  }

  findOne(id: number): Promise<User> {
    return this.UserRepository.findOneBy({ id });
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
