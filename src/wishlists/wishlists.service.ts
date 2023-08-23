import { Injectable } from '@nestjs/common';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private WishlistRepository: Repository<Wishlist>,
  ) {}

  create(createWishlist) {
    return this.WishlistRepository.save(createWishlist);
  }

  findAll() {
    return this.WishlistRepository.find({
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  findOne(id: number) {
    return this.WishlistRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.WishlistRepository.update({ id }, updateWishlistDto);
  }

  remove(id: number) {
    return this.WishlistRepository.delete({ id });
  }
}
