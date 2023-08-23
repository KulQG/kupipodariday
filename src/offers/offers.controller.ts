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
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { WishesService } from 'src/wishes/wishes.service';

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

    const wishId = createOfferDto.itemId;
    // await this.wishesService.update(wishId)
    const wish = await this.wishesService.findOne(wishId);

    const createOffer = {
      user,
      item: wish,
      amount: createOfferDto.amount,
      hidden: createOfferDto.hidden,
    };

    return this.offersService.create(createOffer);
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
