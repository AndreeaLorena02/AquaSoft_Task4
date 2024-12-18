/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { HotelService } from './hotels.service';
import { Hotel } from './hotel.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';

@Controller('admin/hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard) // Aplică JWT și PermissionsGuard
  @Post('/addHotel')
  async createHotel(@Body() data: Partial<Hotel>): Promise<Hotel> {
    console.log("am intrat pe ruta")
    return this.hotelService.createHotel(data);
  }




  @UseGuards(JwtAuthGuard, PermissionsGuard) // Aplică JWT și PermissionsGuard
  @Get('/all')
  async getHotels(): Promise<Hotel[]> {
    return this.hotelService.getAllHotels();
  }
}
