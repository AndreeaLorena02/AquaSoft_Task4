/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
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

  @Get('/hotels/magic-link')
  async magic(): Promise<Hotel[]> {
    return this.hotelService.getAllHotels();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id') // Endpoint to get user by ID
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }


  @UseGuards(JwtAuthGuard)
  @Put('/book-hotel')
  async updateUserHotel(@Body() body: { hotelId: any, user: any }) {
    console.log("am intrat")
    const { hotelId, user } = body;
    console.log("hotelId: ", hotelId, "user: ", user)
    return this.userService.bookHotelById(hotelId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getUsersByHotel/:hotelId')
  async getUsersByHotel(@Param('hotelId') hotelId: string): Promise<User[]> {
    return this.userService.getUsersByHotelId(hotelId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/removeHotelId/:userId')
  async removeHotelIdForUser(
    @Param('userId') userId: string,
    @Body() body: { hotelId: any }
  ) {
    console.log("Received userId:", userId, "hotelId:", body.hotelId);
    const updatedUser = await this.userService.updateUserHotelId(userId, body.hotelId);

    return {
      message: `Hotel ID removed successfully for user with ID: ${userId}`,
      user: updatedUser,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/managers-by-group/:groupId')
  async getHotelManagersByGroup(@Param('groupId') groupId: string) {
    return this.userService.getHotelManagersByGroup(groupId);
  }


}





