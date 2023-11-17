import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async create(createAuthDto: CreateAuthDto) {
    const findemail = await this.userService.findOne(createAuthDto.email);
    const verify = await bcrypt.compare(
      createAuthDto.password,
      findemail.password,
    );
    const payload = {
      email: findemail.email,
      user: findemail.username,
    };
    const token = await jwt.sign(payload, 'secret');
    return token
  }
}
