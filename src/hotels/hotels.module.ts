/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HotelService } from './hotels.service';
import { HotelController } from './hotels.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './hotel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
  ],
  providers: [HotelService],
  controllers: [HotelController],
  exports: [HotelService , MongooseModule , HotelsModule],
})
export class HotelsModule { }
