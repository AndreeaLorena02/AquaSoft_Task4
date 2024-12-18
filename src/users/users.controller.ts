import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from './user.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Hotel } from 'src/hotels/hotel.schema';
import { HotelService } from 'src/hotels/hotels.service';

@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService,
    private readonly hotelService: HotelService
  ) { }

  @Post('/register')
  async createUser(@Body() userData: any) {
    return this.userService.createUser(userData);
  }

  @Post('/login')
  async loginUser(@Body() userData: any) {
    return this.userService.login(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('hotels/all')
  async getHotels(): Promise<Hotel[]> {
    return this.hotelService.getAllHotels();
  }

}





