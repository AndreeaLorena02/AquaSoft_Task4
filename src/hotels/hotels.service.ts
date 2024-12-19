/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from './hotel.schema';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  async createHotel(data: Partial<Hotel>): Promise<Hotel> {
    const newHotel = new this.hotelModel(data);
    return newHotel.save();
  }

  async getAllHotels(): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }

  async getHotelById(hotelId:string): Promise<any> {
    return this.hotelModel.findById(hotelId);
  }
}
