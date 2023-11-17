import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hash;
    const saveUser = new this.userModel(createUserDto);
    const save = await saveUser.save();
    return save;
  }

  async findAll() {
    const find = await this.userModel.find();
    return find;
  }

  async findOne(email: string) {
    const find = await this.userModel.findOne({ email: email });
    if(!find){
      throw new NotFoundException('este correo no existe')
    }
    return find;
  }
}
