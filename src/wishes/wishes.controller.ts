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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { UsersService } from 'src/users/users.service';

@Controller('wishes')
export class WishesController {
  constructor(
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req, @Body() createWishDto: CreateWishDto) {
    const owner = req.user;
    const newWish = { ...createWishDto, owner };
    return this.wishesService.create(newWish);
  }

  @UseGuards(JwtGuard)
  @Get('last')
  findLast() {
    return this.wishesService.findLast();
  }

  @UseGuards(JwtGuard)
  @Get('top')
  findTop() {
    return this.wishesService.findTop();
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@Req() req, @Param('id') id: number) {
    const curWish = await this.wishesService.findOne(id);
    await this.wishesService.update(curWish.id, {
      copied: (curWish.copied += 1),
    });
    const { owner, ...wish } = curWish;
    const user = await this.usersService.findOne(req.user.id);

    return this.wishesService.create({ ...wish, owner: user });
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    const curWish = await this.wishesService.findOne(id);
    if (req.user.id === curWish.owner.id) {
      return this.wishesService.update(+id, updateWishDto);
    } else {
      throw new ForbiddenException();
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number) {
    const curWish = await this.wishesService.findOne(id);
    if (req.user.id === curWish.owner.id) {
      return this.wishesService.remove(+id);
    } else {
      throw new ForbiddenException();
    }
  }
}
