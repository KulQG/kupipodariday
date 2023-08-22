import { Injectable, Req } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private WishRepository: Repository<Wish>,
  ) {}

  create(wish) {
    return this.WishRepository.save(wish);
  }

  findAll() {
    return this.WishRepository.find();
  }

  findOne(id: number) {
    return this.WishRepository.findOneBy({ id });
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return this.WishRepository.update({ id }, updateWishDto);
  }

  remove(id: number) {
    return this.WishRepository.delete({ id });
  }
}
