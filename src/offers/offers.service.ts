import { Injectable } from '@nestjs/common';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private OfferRepository: Repository<Offer>,
  ) {}

  create(offer) {
    return this.OfferRepository.save(offer);
  }

  findOne(id: number) {
    return this.OfferRepository.findOne({
      where: { id },
      relations: {
        user: true,
        item: true,
      },
    });
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return this.OfferRepository.update({ id }, updateOfferDto);
  }

  remove(id: number) {
    return this.OfferRepository.delete({ id });
  }
}
