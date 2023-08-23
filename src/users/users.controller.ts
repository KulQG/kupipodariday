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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('find')
  findMany(@Body() query: { query: string }) {
    return this.usersService.findMany(query);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  findMe(@Req() req) {
    return this.usersService.findOne(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get('me/wishes')
  findWishes(@Req() req) {
    return this.usersService.findWishes(req.user.id);
  }

  @Get(':username/wishes')
  findAnotherUserWishes(@Param('username') username: string) {
    return this.usersService.findWishes(username);
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
