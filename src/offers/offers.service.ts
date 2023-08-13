import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private OfferRepository: Repository<Offer>,
  ) {}

  create(createOfferDto: CreateOfferDto) {
    return this.OfferRepository.save(createOfferDto);
  }

  findOne(id: number) {
    return this.OfferRepository.findOneBy({ id });
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return this.OfferRepository.update({ id }, updateOfferDto);
  }

  remove(id: number) {
    return this.OfferRepository.delete({ id });
  }
}
