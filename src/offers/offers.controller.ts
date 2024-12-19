/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post } from '@nestjs/common';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
    constructor(private readonly offersService: OffersService) {}
  
    @Post('/:hotelId/addOffer')
    async addOffer(
      @Param('hotelId') hotelId: string, @Body() offerData: { offerName: string; price: number }) {
        return this.offersService.addOfferToHotel(hotelId, offerData);
      }
  
}
