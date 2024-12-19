/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HotelOffersController } from './hotel-offers.controller';
import { HotelOffersService } from './hotel-offers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelOffers, HotelOffersSchema } from './hotel-offers.schema';
import { OffersModule } from 'src/offers/offers.module';
import { HotelsModule } from 'src/hotels/hotels.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HotelOffers.name, schema: HotelOffersSchema }]),
    HotelsModule, // Asigură-te că HotelModule este inclus
    OffersModule, // Asigură-te că OffersModule este inclus
  ],
  controllers: [HotelOffersController],
  providers: [HotelOffersService],
  exports:[HotelOffersModule , MongooseModule]
})
export class HotelOffersModule {}
