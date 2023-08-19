import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.UserRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.UserRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.UserRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.UserRepository.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.UserRepository.delete({ id });
  }

  async findByUsername(username: string) {
    const user = await this.UserRepository.findOneBy({ username });

    return user;
  }
}
