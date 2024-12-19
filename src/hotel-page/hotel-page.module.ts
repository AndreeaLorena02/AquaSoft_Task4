/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HotelPageService } from './hotel-page.service';
import { HotelAccessController } from './hotelPage.controller';

@Module({
  providers: [HotelPageService],
  controllers: [HotelAccessController],

})
export class HotelPageModule {}
