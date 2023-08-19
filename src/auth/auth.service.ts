import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  auth(user: User) {
    const payload = { sub: user.id };

    // тут будем генерировать токен
    return { access_token: this.jwtService.sign(payload) };
  }
}
