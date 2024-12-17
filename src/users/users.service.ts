/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {


    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async createUser(data: Partial<User>): Promise<User> {
      const newUser = new this.userModel(data);
      return newUser.save();
    }
  
    async getUsers(): Promise<User[]> {
      return this.userModel.find().exec();
    }

    
}
