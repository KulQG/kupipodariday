import { Injectable } from '@nestjs/common';
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

  async findOne(id: number) {
    const wish = await this.WishRepository.findOne({
      where: { id },
      relations: {
        offers: true,
      },
    });

    const amounts = wish.offers.map((offer) => offer.amount);

    const generalAmount = amounts.reduce((acc, cur) => acc + cur, 0);

    await this.WishRepository.update({ id }, { raised: generalAmount });

    return this.WishRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  findMany(wishesId: number[]) {
    return wishesId.map((id) => {
      return this.findOne(id);
    });
  }

  findLast() {
    return this.WishRepository.find({
      order: { id: 'DESC' },
      take: 40,
    });
  }

  findTop() {
    return this.WishRepository.find({
      order: { copied: 'DESC' },
      take: 10,
    });
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return this.WishRepository.update({ id }, updateWishDto);
  }

  remove(id: number) {
    return this.WishRepository.delete({ id });
  }
}
