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
  Query,
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
    // console.log(query);
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

  @Get(':id/wishes')
  findAnotherUserWishes(@Param('id') id: number) {
    return this.usersService.findWishes(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  // @Get(':username')
  // findAnotherUser(@Param('username') username: string) {
  //   return this.usersService.findOne(username);
  // }

  @UseGuards(JwtGuard)
  @Patch('me')
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    console.log(req.user);
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
