import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from './schema/user.schema';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto'
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UsersDocument>,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    const user = await this.usersModel.collection.findOne({
      username: loginUserDto.username,
    });

    if (!user) {
      return null;
    }
    return user as User
  }

  async registration(createUserDto: CreateUserDto): Promise<User | null> {
    const existingUser = await this.usersModel.collection.findOne({
      username: createUserDto.username,
    });

    if (existingUser) {
      return null;
    }

    const createdUser = new this.usersModel(createUserDto);
    return createdUser.save();
  }

  async findOne(username: string): Promise<User> {
    return this.usersModel.findOne({ username });
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersModel.updateOne(
      { username: updateUserDto.username },
      {
        $set: {
          ...updateUserDto,
        },
      },
    );

    return await this.findOne(updateUserDto.username);
  }
}