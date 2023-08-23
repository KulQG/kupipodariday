import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishesService } from 'src/wishes/wishes.service';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('wishlists')
export class WishlistsController {
  constructor(
    private readonly wishlistsService: WishlistsService,
    private readonly wishesService: WishesService,
  ) {}

  @Post()
  async create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    const owner = req.user.id;
    const { name, image, itemsId } = createWishlistDto;
    const items = await this.wishesService.findMany(itemsId);

    const newWishlist = { name, image, items, owner };

    return this.wishlistsService.create(newWishlist);
  }

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishlistsService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    const curWishlist = await this.wishlistsService.findOne(id);
    if (req.user.id === curWishlist.owner.id) {
      return this.wishlistsService.update(+id, updateWishlistDto);
    } else {
      throw new ForbiddenException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.wishlistsService.remove(+id);
  }
}
