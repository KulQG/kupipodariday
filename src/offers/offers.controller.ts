import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { WishesService } from 'src/wishes/wishes.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    private readonly wishesService: WishesService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req, @Body() createOfferDto: CreateOfferDto) {
    const user = req.user.id;
    const wish = await this.wishesService.findOne(createOfferDto.itemId);

    if (wish.owner.id !== user && wish.raised < wish.price) {
      if (createOfferDto.amount <= wish.price - wish.raised) {
        let createOffer;

        if (createOfferDto.hidden) {
          createOffer = {
            item: wish,
            amount: createOfferDto.amount,
            hidden: createOfferDto.hidden,
          };
        } else {
          createOffer = {
            user,
            item: wish,
            amount: createOfferDto.amount,
            hidden: createOfferDto.hidden,
          };
        }

        return this.offersService.create(createOffer);
      } else {
        throw new BadRequestException();
      }
    } else {
      throw new ForbiddenException();
    }
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.offersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.update(+id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offersService.remove(+id);
  }
}
