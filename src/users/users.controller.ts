/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

constructor(private readonly userService: UsersService) {}

  @Post('/register')
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Get('/all')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

    
}





