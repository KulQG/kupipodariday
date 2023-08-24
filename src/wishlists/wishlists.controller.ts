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
import { UsersService } from 'src/users/users.service';

@Controller('wishlists')
export class WishlistsController {
  constructor(
    private readonly wishlistsService: WishlistsService,
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    console.log(createWishlistDto);
    const owner = await this.usersService.findOne(req.user.id);
    const { name, image, itemsId } = createWishlistDto;
    const items = await this.wishesService.findMany(itemsId);

    const newWishlist = { name, image, items, owner };

    return this.wishlistsService.create(newWishlist);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @UseGuards(JwtGuard)
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

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number) {
    const curWishlist = await this.wishlistsService.findOne(id);
    if (req.user.id === curWishlist.owner) {
      return this.wishlistsService.remove(+id);
    } else {
      throw new ForbiddenException();
    }
  }
}
