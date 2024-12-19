/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { HotelOffersService } from './hotel-offers.service';
import { HotelService } from '../hotels/hotels.service'; // Assuming hotels logic is in a separate service
import { OffersService } from 'src/offers/offers.service';

@Controller('offers')
export class HotelOffersController {
  constructor(
    private readonly hotelOffersService: HotelOffersService,
    private readonly hotelsService: HotelService,
    private readonly offersService: OffersService,
  ) {}

  @Get('/:hotelId')
  async getOffersByHotelId(@Param('hotelId') hotelId: string) {
    // Get the hotel details
    const hotel = await this.hotelsService.getHotelById(hotelId);
    if (!hotel) {
      throw new Error('Hotel not found');
    }

    // Get the offers linked to this hotel
    const hotelOffers = await this.hotelOffersService.getOffersByHotelId(hotelId);
    console.log("hotelOffers: " , hotelOffers)

    // Fetch detailed offer information
    const detailedOffers = await Promise.all(
      hotelOffers.map(async (hotelOffer) => {
        const offer = await this.offersService.getOffersById(hotelOffer.offerId);
        return offer;
      }),
    );

    return {
      hotel: hotel,
      offers: detailedOffers,
    };
  }
}
