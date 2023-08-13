import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistsService {
constructor (
  @InjectRepository(Wishlist)
  private WishlistRepository: Repository<Wishlist>
) {}

  create(createWishlistDto: CreateWishlistDto) {
    return this.WishlistRepository.save(createWishlistDto);;
  }

  findAll() {
    return this.WishlistRepository.find();
  }

  findOne(id: number) {
    return this.WishlistRepository.findOneBy({ id });
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.WishlistRepository.update({ id }, updateWishlistDto);
  }

  remove(id: number) {
    return this.WishlistRepository.delete({ id });
  }
}
