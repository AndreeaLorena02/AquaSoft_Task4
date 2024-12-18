/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from './user.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {

constructor(private readonly userService: UsersService) {}

  @Post('/register')
  async createUser(@Body() userData: any) {
    return this.userService.createUser(userData);
  }

  @Post('/login')
  async loginUser(@Body() userData: any) {
    return this.userService.login(userData);
  }

  @UseGuards(JwtAuthGuard) // Restricționează accesul
  @Get('/all')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

    
}





